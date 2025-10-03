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
import { EllipsisVertical, CirclePlus, ListEnd, Pencil, Trash } from "lucide-react";
import { deletePlaylist } from "@/lib/playlist/playlist";
import { toast } from "sonner";
import { EditPlaylistCard } from "@/components/Playlist/EditPlaylistCard";
import { AddMusicToPlaylistCard } from "@/components/Playlist/AddMusicToPlaylistCard";
import { deleteSong } from "@/lib/library/song";


const OptionCard = ({ isPlaylist, playlist, onDelete, onOpen, onClose, onEdit, song, onAdd }) => {
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
      if (isPlaylist) {
        const res = await deletePlaylist(playlist.id);

        if (res.status === 200) {
          toast.success(`${isPlaylist ? "Playlist" : "Song"} deleted successfully`);
          onDelete(isPlaylist ? playlist.id : song.id);
        }
      } else {
        const res = await deleteSong(song.id);

        if (res.status === 200) {
          toast.success(`${isPlaylist ? "Playlist" : "Song"} deleted successfully`);
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <DropdownMenu className="" modal={false}>
      { isPlaylist && (
        <>
          <EditPlaylistCard isPlaylist={isPlaylist} playlistData={playlist} onOpen={openEdit} onClose={handleClose} onEdit={onEdit} />
          <AddMusicToPlaylistCard isPlaylist={isPlaylist} playlistData={playlist} onOpen={openAddMusic} onClose={handleClose} song={song} onAdd={onAdd} />
        </>
      )}
      { !isPlaylist && (
        <>
          <EditPlaylistCard isPlaylist={isPlaylist} song={song} onOpen={openEdit} onClose={handleClose} />
        </>
      )}
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-52 mt-3 mr-10 overflow-hidden " align="center">
        <DropdownMenuGroup>
          { isPlaylist && (
            <DropdownMenuItem className="cursor-pointer">
              <ListEnd />
              Add to queue
            </DropdownMenuItem>
          )}
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
        {isPlaylist && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" onSelect={handleAddMusicOpen}>
                <CirclePlus />
                Add music to playlist
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionCard