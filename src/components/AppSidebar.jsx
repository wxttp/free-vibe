'use client'

import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Library, ListMusic, HeartPlus, Upload, ChartPie, Settings, Music } from 'lucide-react';

const items = [
  {
    title: "Music Library",
    url: "/home/library",
    icon: Library,
  },
  {
    title: "Playlists",
    url: "/home/playlists",
    icon: ListMusic,
  },
  {
    title: "Favorites",
    url: "/home/favorites",
    icon: HeartPlus,
  },
  {
    title: "Upload Music",
    url: "/home/upload-music",
    icon: Upload,
  },
  {
    title: "Statistics",
    url: "/home/statistics",
    icon: ChartPie,
  },
  {
    title: "Settings",
    url: "/home/settings",
    icon: Settings,
  },
]
 
export function AppSidebar() {
  const path = usePathname();
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className={'mt-2 flex flex-row justify-center items-center'}><Music />FreeVibe</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={path === item.url ? true : false}>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}