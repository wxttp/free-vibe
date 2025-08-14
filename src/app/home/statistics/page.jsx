import React from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'

const PlaylistsPage = () => {
  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Statistics</span>
        
      </div>

      <div className='flex flex-row gap-5 w-full mb-5'>
        <Card>
            <CardTitle className={'px-6'}>Total Listeners</CardTitle>
            <CardContent>
                <div className='text-3xl font-bold px-6'>1,000</div>
            </CardContent>
        </Card>

        <Card>
            <CardTitle className={'px-6'}>Total Listeners This Month</CardTitle>
            <CardContent>
                <div className='text-3xl font-bold px-6'>200</div>
            </CardContent>
        </Card>

        <Card>
            <CardTitle className={'px-6'}>Total Listeners This Day</CardTitle>
            <CardContent>
                <div className='text-3xl font-bold px-6'>50</div>
            </CardContent>
        </Card>
      </div>

      <div className='flex flex-row gap-5 w-full mb-5'>
        <Card>
            <CardTitle className={'px-6'}>Top 10 Tracks</CardTitle>
            <CardContent>
                <div className='text-xl font-bold px-6 border-b-1'>
                  <div className='flex flex-row justify-between'>
                    <div>Name</div>
                    <div>Artist</div>
                    <div>Listeners</div>
                  </div>
                </div>
                <div className='text-lg px-6 h-dvh py-2'>
                    <div className='flex flex-row justify-between py-1'>
                    <div className='w-1/3'>ก็แค่พูดมา</div>
                    <div className='w-1/3'>Three Man Down</div>
                    <div className='w-1/3 text-end'>300</div>
                    </div>
                    <div className='flex flex-row justify-between py-1'>
                    <div className='w-1/3'>แปลไม่ออก</div>
                    <div className='w-1/3'>Billkin</div>
                    <div className='w-1/3 text-end'>258</div>
                    </div>
                    <div className='flex flex-row justify-between py-1'>
                    <div className='w-1/3'>Why tho?</div>
                    <div className='w-1/3'>TIMETHAI</div>
                    <div className='w-1/3 text-end'>243</div>
                    </div>
                    <div className='flex flex-row justify-between py-1'>
                    <div className='w-1/3'>B.Y.S</div>
                    <div className='w-1/3'>keshi</div>
                    <div className='w-1/3 text-end'>201</div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default PlaylistsPage
