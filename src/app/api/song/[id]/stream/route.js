import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, ctx) {
  const { id } = await ctx.params;
  const songId = Number(id || 0);
  if (!songId)
    return new Response("Bad Request", { status: 400 });

  const song = await prisma.song.findUnique({
    where: { id: songId },
    select: { file: true, mimeType: true },
  });
  if (!song?.file)
    return new Response("Not found", { status: 404 });

  const file = Buffer.from(song.file);
  const fileSize = file.length;
  const mime = song.mimeType || "audio/mpeg";

  const range = req.headers.get("range");

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
