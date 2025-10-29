"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

import { Link } from 'lucide-react';

function UrlUploaderCard(props) {
  const { userId } = props;

  const router = useRouter();

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onAdd = async () => {
    if (!url)
      return;
    setLoading(true);

    try {
      const res = await fetch('/api/upload-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, userId }),
      })

      const data = await res.json();
      if (!res.ok)
        toast.error(data.error || 'Failed to add');
      else {
        toast.success('Add successfull!');
        setUrl('');
        router.push("/home/library");
        router.refresh();
      }
    } catch {
        toast.error('Network error');
    } finally {
        setLoading(false);
    }
  }

  return (
    <>
      <Card className={'hover:shadow-sm! max-h-[500] h-[calc(400px-112px)] sm:h-[calc(250px)]'}>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Link />
            <CardTitle className={'text-2xl'}>Add from YouTube</CardTitle>
          </div>
          <CardDescription>Paste a YouTube URL to add the song to your library</CardDescription>
        </CardHeader>
        <CardContent className={'h-full'}>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <label className='' htmlFor="url">YouTube URL</label>
              <Input
                type="url"
                id="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            
            <div>
              <Button onClick={onAdd} disabled={loading}>{loading ? 'Adding...' : 'Add'}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UrlUploaderCard