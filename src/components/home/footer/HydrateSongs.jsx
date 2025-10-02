'use client'
import { useEffect } from "react";
import { useSongsStore } from "@/stores/songs";

export default function HydrateSongs({ songs }) {
  const setSongs = useSongsStore((s) => s.setSongs);

  useEffect(() => {
    setSongs(songs);
  }, [songs, setSongs]);

  return null;
}
