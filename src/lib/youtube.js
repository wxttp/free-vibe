export function extractYouTubeId(url) {
    try {
        const u = new URL(url)
        if (u.hostname.includes('youtu.be'))
            return u.pathname.slice(1) || null

        if (u.hostname.includes('youtube.com') || u.hostname.includes('music.youtube.com'))
            return u.searchParams.get('v') || null

        return null
    } catch {
        return null
    }
}

// ไปดูคนอื่นมาอีกที
export async function fetchYouTubeMeta(url) {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const res = await fetch(oembed, { cache: 'no-store' })
    if (!res.ok)
        return null

    const data = await res.json()
    console.log('fetchYouTubeMeta', data);
    return {
        title: data?.title ?? null,
        artist: data?.author_name ?? null,
    }
}
