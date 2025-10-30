import React from 'react'
import SettingCard  from '@/components/Setting/SettingCard'
import { getUserData } from '@/lib/user/user'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SettingsPage = async () => {
  const session =  await getServerSession(authOptions)
  const userData = await getUserData(session)
  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Setting</span>
        <span className='text-sm opacity-70'>Change your detail information or password</span>
      </div>
      <div className='flex flex-row gap-5 w-full mb-30 sm:mb-5'>
        <SettingCard userData={userData} />
      </div>
    </main>
  )
}

export default SettingsPage