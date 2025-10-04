'use client'
import React, { useState } from 'react'
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
import { EllipsisVertical, CirclePlus, MonitorUp, Pencil, Trash } from "lucide-react";
import { deletePlaylist } from "@/lib/playlist/playlist";
import { toast } from "sonner";
import { EditPlaylistCard } from "@/components/Playlist/EditPlaylistCard";
import { AddMusicToPlaylistCard } from "@/components/Playlist/AddMusicToPlaylistCard";
import { publishPlaylist } from "@/lib/playlist/playlist";


const OptionCard = ({ playlist, onDelete, onOpen, onClose, onEdit, song, onAdd }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddMusic, setOpenAddMusic] = useState(false);

  const handleEditOpen = () => setOpenEdit(true);
  const handleAddMusicOpen = () => setOpenAddMusic(true);
  const handleClose = () => {
    setOpenEdit(false);
    setOpenAddMusic(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deletePlaylist(playlist.id);
      if (res.status === 200) {
        toast.success("Playlist deleted successfully");
        onDelete(playlist.id);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePublish = async () => {
    try {
      const res = await publishPlaylist(playlist.id);
      console.log(res);

      if (res.status === 200)
        toast.success("Playlist published successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DropdownMenu className="" modal={false}>
      <EditPlaylistCard playlistData={playlist} onOpen={openEdit} onClose={handleClose} onEdit={onEdit} />
      <AddMusicToPlaylistCard playlistData={playlist} onOpen={openAddMusic} onClose={handleClose} song={song} onAdd={onAdd} />
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-52 mt-3 mr-10 overflow-hidden " align="center">
        <DropdownMenuGroup>
          {/* <DropdownMenuItem className="cursor-pointer">
            <ListEnd />
            Add to queue
          </DropdownMenuItem> */}
          <DropdownMenuItem className="cursor-pointer" onSelect={handleEditOpen}>
            <Pencil />
            Edit details
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={handleDelete}>
            <Trash />
            {/* <Delete /> */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={handlePublish}>
            <MonitorUp />
            Publish this playlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={handleAddMusicOpen}>
            <CirclePlus />
            Add music to playlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionCard