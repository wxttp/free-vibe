import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// // helper แปลง Node Readable -> Web Stream
// function nodeToWeb(readable) {
//   // SDK v3 บน Node18 ขึ้นไป: readable เป็น Node.js Readable
//   // ใช้ Readable.toWeb ถ้ามี (Node 18+)
//   if (typeof ReadableStream === "function" && readable?.pipe) {
//     // Node >= 18 มี stream/web แล้ว
//     const { Readable } = require("stream");
//     return Readable.toWeb(readable);
//   }
//   return readable; // fallback (น้อยเคส)
// }

export async function GET(req, ctx) {
  const { id } = await ctx.params;
  const songId = Number(id || 0);
  if (!songId)
    return new Response("Bad Request", { status: 400 });

  const song = await prisma.song.findUnique({
    where: { id: songId },
    // select: { file: true, mimeType: true },
    select: { s3Bucket: true, s3Key: true, mimeType: true },
  });

  if (!song)
    return new Response("Not found", { status: 404 });

  const range = req.headers.get("range");

  // ---- สตรีมจาก S3 (ใหม่) ----
  if (song.s3Bucket && song.s3Key) {
    try {
      const resp = await s3.send(new GetObjectCommand({
        Bucket: song.s3Bucket,
        Key: song.s3Key,
        ...(range ? { Range: range } : {}),
      }));

      const body = Readable.toWeb(resp.Body);

      const headers = new Headers();
      headers.set("Accept-Ranges", "bytes");
      headers.set("Content-Type", song.mimeType || resp.ContentType || "audio/mpeg");
      if (resp.ContentLength != null) headers.set("Content-Length", String(resp.ContentLength));
      if (resp.ContentRange) headers.set("Content-Range", resp.ContentRange);
      headers.set("Cache-Control", "no-store");

      return new Response(body, { status: range ? 206 : 200, headers });
    } catch (err) {
      console.error("S3 stream error:", err);
      return new Response("Failed to stream from S3", { status: 500 });
    }
  }

  if (!song?.file)
    return new Response("Not found", { status: 404 });

  const file = Buffer.from(song.file);
  const fileSize = file.length;
  const mime = song.mimeType || "audio/mpeg";

  // ถ้าไม่มี Range ส่งทั้งไฟล์
  if (!range) {
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Length": String(fileSize),
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store",
      },
    });
  }

  // ถ้ามี Range ส่ง partial content
  const m = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!m) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${fileSize}` },
    });
  }

  let start = m[1] ? parseInt(m[1], 10) : 0;
  let end = m[2] ? parseInt(m[2], 10) : fileSize - 1;

  if (Number.isNaN(start))
    start = 0;

  if (Number.isNaN(end) || end >= fileSize)
    end = fileSize - 1;

  if (start > end || start < 0) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${fileSize}` },
    });
  }

  const chunk = file.slice(start, end + 1);
  const chunkSize = chunk.length;

  return new Response(chunk, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": String(chunkSize),
      "Content-Type": mime,
      "Cache-Control": "no-store",
    },
  });
}

export async function PUT(req, ctx) {
  const { id } = await ctx.params;
  const songId = Number(id);
  if (!songId)
    return NextResponse.json({ status: 400, error: "Bad Request" });

  const { title, artist } = await req.json();
  if (!title || !artist)
    return NextResponse.json({ status: 400, error: "Bad Request" });

  try {
    const song = await prisma.song.update({
      where: { id: songId },
      data: { title, artist },
    });
    return NextResponse.json({
      status: 200,
      message: "Song Updated",
      song
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Song Not Updated" });
  }
}

export async function DELETE(req, ctx) {
  const { id } = await ctx.params;
  const songId = Number(id);
  if (!songId)
    return NextResponse.json({ status: 400, error: "Bad Request" });

  try {
    const song = await prisma.song.findUnique({
      where: { id: songId },
      select: { s3Bucket: true, s3Key: true },
    });

    if (song?.s3Bucket && song?.s3Key) {
      try {
        await s3.send(new DeleteObjectCommand({ Bucket: song.s3Bucket, Key: song.s3Key }));
      } catch (e) {
        console.warn("Failed to delete S3 object:", e?.message || e);
      }
    }

    await prisma.song.delete({ where: { id: songId } });

    return NextResponse.json({
      status: 200,
      message: "Song Deleted",
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Song Not Deleted" });
  }
}