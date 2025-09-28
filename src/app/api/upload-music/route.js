import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { extractYouTubeId, fetchYouTubeMeta } from '@/lib/youtube'

export async function POST(req) {
    try {
        const contentType = req.headers.get("content-type");

        // อัพโหลด file
        if (contentType?.includes("multipart/form-data")) {
            const form = await req.formData();
            console.log(form);
            const file = form.get('file');
            const userId = form.get('userId');

            if (!userId)
                return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

            if (!file)
                return NextResponse.json({ error: 'Missing file' }, { status: 400 });

            if (file.type && !file.type.startsWith("audio/"))
                return NextResponse.json({ error: "Invalid mime type" }, { status: 400 });

            // เก็บ binary raw ของ file
            const arrayBuf = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuf);

            const song = await prisma.song.create({
                data: {
                    title: file.name,
                    artist: "Unknown Artist",
                    file: buffer,
                    mimeType: file.type,
                    sizeBytes: buffer.byteLength,
                    isUrl: false,
                    users_id: Number(userId),
                },
            });

            return NextResponse.json({ ok: true, song }, { status: 201 });
        }

        // อัพโหลด url
        else if (contentType?.includes("application/json")) {
            const body = await req.json();
            const { url, userId } = body || {};

            if (!userId)
                return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

            if (!url)
                return NextResponse.json({ error: 'Missing url' }, { status: 400 });

            const videoId = extractYouTubeId(url);
            if (!videoId)
                return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });

            const meta = await fetchYouTubeMeta(url);
            const title = meta?.title ?? 'Unknown Title';
            const artist = meta?.artist ?? 'Unknown Artist';

            const song = await prisma.song.create({
                data: {
                    title,
                    artist,
                    url,
                    isUrl: true,
                    users_id: Number(userId),
                },
            })

            return NextResponse.json({ ok: true, song }, { status: 201 });
        }

        return NextResponse.json({ error: 'Missing url (or use the upload endpoint)' }, { status: 400 });
    } catch (e) {
        if (e?.code === 'P2002')
            return NextResponse.json({ error: 'Duplicate (unique) field' }, { status: 409 });

        return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
    }
}
