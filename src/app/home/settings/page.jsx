import React from 'react'
import SettingCard  from '@/components/Setting/SettingCard'
import { getUserData } from '@/lib/user/user'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SettingsPage = async () => {
  const session =  await getServerSession(authOptions)
  const userData = await getUserData(session)
  return (
    <div className='w-full min-w-md flex justify-center items-center h-full'>
      <SettingCard userData={userData} />
    </div>
  )
}

export default SettingsPage