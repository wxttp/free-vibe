'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from "sonner";

function FileUploaderCard(props) {
  const { userId } = props;

  const router = useRouter();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onAdd = async () => {
    if (!file)
      return;
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("userId", userId);

      const res = await fetch('/api/upload-music', {
        method: 'POST',
        body: fd,
      })

      const data = await res.json();
      if (!res.ok)
        toast.error(data.error || 'Failed to add');
      else
        toast.success('Add successfull!');
        setFile(null);
        router.push("/home/library");
    } catch {
        toast.error('Network error');
    } finally {
        setLoading(false);
    }
  }

  return (
    <>
      <Card className={'hover:shadow-sm!'}>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Upload />
            <CardTitle className={'text-2xl'}>Upload MP3 Files</CardTitle>
          </div>
          <CardDescription>Select MP3 files from your device to add to your music library</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            id="file"
            className={'border-dashed max-h-[200px] h-[calc(200px-112px)] sm:h-[calc(200px-112px)]'}
            accept=".mp3"
            onChange={function (e) { 
              setFile(e.target.files[0])
            }}
          />

          <div className='mt-5'>
            <Button onClick={onAdd} disabled={loading}>{loading ? 'Adding...' : 'Add'}</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default FileUploaderCard