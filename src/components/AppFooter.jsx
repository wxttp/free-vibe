'use client'

import React, { useState, useEffect } from 'react';

import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

import { Shuffle, Repeat, SkipBack, SkipForward, Play } from 'lucide-react';

export function AppFooter() {
  const { state, open } = useSidebar();
  const isMobile = useIsMobile();
  const [display, setDisplay] = useState('right-0');

  useEffect(() => {
    if (isMobile)
      setDisplay('left-0 w-full!');
    else
      setDisplay('right-0');
  }, [isMobile]);

  return (
    <footer
        className={`fixed bottom-0 ${display} w-[calc(100% - var(--sidebar-width))]! flex items-center justify-center h-28 px-2 bg-background z-10 transition-all duration-200 ease-linear border-t-1`}
        style={{
            left: state === 'expanded' && !isMobile ? 'var(--sidebar-width)' : '0'
        }}
        id='app-footer'
    >
        <div className='flex justify-center items-center gap-5'>
            <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-300 cursor-pointer">
              <Shuffle className='w-4 h-4 cursor-pointer' />
            </div>
            <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-300 cursor-pointer">
                <SkipBack className='w-4 h-4 cursor-pointer' />
            </div>
            <div className="w-fit bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] transition-all duration-300 rounded-full p-3 cursor-pointer">
                <Play className='w-6 h-6 text-white' />
            </div>
            <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-300 cursor-pointer">
                <SkipForward className='w-4 h-4 cursor-pointer' />
            </div>
            <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-300 cursor-pointer">
                <Repeat className='w-4 h-4 cursor-pointer' />
            </div>
        </div>
    </footer>
  )
}