import React from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'


const CountCard = (props) => {
  const { title, count } = props;

  return (
    <>
        <Card>
            <CardTitle className={'px-6'}>{title}</CardTitle>
            <CardContent>
                <div className='text-3xl font-bold px-6'>{count} <span className='text-sm text-gray-500'>times</span></div>
            </CardContent>
        </Card>
    </>
  )
}

export default CountCard