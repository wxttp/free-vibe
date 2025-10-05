"use client";

import React, { useState, useEffect } from "react";

import {
  SidebarTrigger,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

import { Search, CircleUserRound } from 'lucide-react';
import DropDownProfile from "./DropDownProfile";

export function AppTopbar() {
  const { state, open } = useSidebar();
  const isMobile = useIsMobile();
  const [display, setDisplay] = useState("right-0");
  const [openDropdown, setOpenDropdown] = useState(false);
  useEffect(() => {
    if (isMobile) setDisplay("left-0 w-full!");
    else setDisplay("right-0");
  }, [isMobile]);

  return (
    <nav
      className={`fixed top-0 ${display} w-[calc(100% - var(--sidebar-width))]! flex items-center h-14 px-2 bg-background z-10 transition-all duration-200 ease-linear border-b-1`}
      style={{
        left: state === "expanded" && !isMobile ? "var(--sidebar-width)" : "0",
      }}
      id="app-topbar"
    >
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Search className="pointer-events-none absolute top-1/2 left-14 size-4 -translate-y-1/2 opacity-50 select-none" />
          <SidebarInput
            id="search"
            placeholder="Search the songs..."
            className="pl-8"
          />
        </div>

        <div className="flex gap-2 cursor-pointer mr-5 relative" onClick={() => setOpenDropdown(!openDropdown)}>
           <CircleUserRound />
           <span>Profile</span>
           <div className="absolute inset-0"> 
             <DropDownProfile open={openDropdown} setOpen={setOpenDropdown} />
           </div>
         </div>
       </div>
    </nav>
  );
}
