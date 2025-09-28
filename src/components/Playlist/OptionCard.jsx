import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, CirclePlus, ListEnd, Pencil, Delete, Trash } from "lucide-react";

const OptionCard = () => {
    function handleSelect() {
            console.log("Add music to playlist");
    }
  return (
    <DropdownMenu className="" modal={false}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-52 mt-3 mr-10 overflow-hidden " align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <ListEnd />
            Add to queue
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Pencil />
            Edit details
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Trash />
            {/* <Delete /> */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={handleSelect}>
            <CirclePlus />
            Add music to playlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionCard