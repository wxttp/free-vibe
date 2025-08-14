import React from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Link } from 'lucide-react';

function UrlUploaderCard() {
  return (
    <>
      <Card className={'hover:shadow-sm! max-h-[500] h-[calc(500px-112px)] sm:h-[calc(250px)]'}>
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
              <Input type="url" id="url" placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            
            <div>
              <Button>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UrlUploaderCard