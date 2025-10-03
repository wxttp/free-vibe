import React from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'

const TableCard = (props) => {
  const { data } = props;

  return (
    <>
        <Card>
            <CardTitle className={'px-6'}>Top 5 Tracks</CardTitle>
            <CardContent>
                <div className='sm:text-xl text-sm font-bold px-6 border-b-1'>
                  <div className='flex flex-row justify-between'>
                    <div>Name</div>
                    <div>Artist</div>
                    <div>Listeners</div>
                  </div>
                </div>
                {
                    data.map((item, index) => (
                    <div className={`sm:text-lg text-xs px-6 py-2 ${index % 2 === 0 ? 'bg-gray-100/75' : ''}`} key={index}>
                        <div className='flex flex-row justify-between py-1'>
                        <div className='w-1/3'>{item.title ? (item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title) : '-'}</div>
                        <div className='w-1/3'>{item.artist ? item.artist : '-'}</div>
                        <div className='w-1/3 text-end'>{item._count.songPlay ? item._count.songPlay : '-'}</div>
                        </div>
                    </div>
                    ))
                }
            </CardContent>
        </Card>
    </>
  )
}

export default TableCard