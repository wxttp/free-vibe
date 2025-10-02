'use client'
import React from 'react'

import { useSongsStore } from "@/stores/songs";
import LibraryPage from '@/components/home/library/LibraryPage';

const page = () => {
  const songs = useSongsStore((s) => s.songs);

  return (
    <LibraryPage songs={songs} />
  )
}

export default page