import React from 'react'
import { getStats } from '@/lib/statistics/stats'
import CountCard from '@/components/statistics/CountCard';
import TableCard from '@/components/statistics/TableCard';

const StatisticsPage = async () => {
  const stats = await getStats(); 
  const { total, today, month, topSongs } = stats;

  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Statistics</span>
        <span className='text-sm opacity-70'>Listening insights: Total plays, daily and monthly breakdowns, and your top 5 most played songs.</span>
      </div>

      <div className='flex flex-col sm:flex-row gap-5 w-full mb-5'>
        <CountCard title={'Total Listeners'} count={total} />
        <CountCard title={'Total Listeners This Month'} count={month} />
        <CountCard title={'Total Listeners This Day'} count={today} />
      </div>

      <div className='flex flex-row gap-5 w-full mb-30 sm:mb-5'>
        <TableCard data={topSongs} />
      </div>
    </main>
  )
}

export default StatisticsPage
