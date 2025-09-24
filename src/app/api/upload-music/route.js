import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { extractYouTubeId, fetchYouTubeMeta } from '@/lib/youtube'

export async function POST(req) {
    try {
        const body = await req.json();
        const { url, userId } = body || {};

        if (!userId)
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

        if (url) {
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
                    file: null,
                    url,
                    isUrl: true,
                    users_id: userId,
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
