import React from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input';

import { Upload } from 'lucide-react';

function FileUploaderCard() {
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
          <Input type="file" id="file" className={'border-dashed max-h-[500] h-[calc(500px-112px)] sm:h-[calc(400px-112px)]'} />
        </CardContent>
      </Card>
    </>
  )
}

export default FileUploaderCard