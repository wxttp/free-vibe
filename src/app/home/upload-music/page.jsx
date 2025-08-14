import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploaderCard from '@/components/home/upload-music/FileUploaderCard';
import UrlUploaderCard from '@/components/home/upload-music/UrlUploaderCard';

const UploadMusicPage = () => {
  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Upload Music</span>
        <span className='text-sm opacity-70'>Add songs to your library by uploading files or YouTube URLs</span>
      </div>

      <div className='flex flex-col gap-5 w-full mb-5'>
        <Tabs defaultValue="file">

          <TabsList className='w-full'>
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="url">Upload YouTube</TabsTrigger>
          </TabsList>

          <TabsContent value="file">
            <FileUploaderCard />
          </TabsContent>
          <TabsContent value="url">
            <UrlUploaderCard />
          </TabsContent>

        </Tabs>
      </div>
    </main>
  )
}

export default UploadMusicPage