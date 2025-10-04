import React from 'react'
import { getFavoriteSongs } from '@/lib/library/song'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import FavortiesPage from '@/components/home/favorites/FavortiesPage'

const page = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  const songs = await getFavoriteSongs(userId)

  return (
    <FavortiesPage songs={songs}/>
  )
}

export default page
