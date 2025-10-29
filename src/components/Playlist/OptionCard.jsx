'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, CirclePlus, MonitorUp, Pencil, Trash, ClipboardCopy } from "lucide-react";
import { deletePlaylist } from "@/lib/playlist/playlist";
import { toast } from "sonner";
import { EditPlaylistCard } from "@/components/Playlist/EditPlaylistCard";
import { AddMusicToPlaylistCard } from "@/components/Playlist/AddMusicToPlaylistCard";
import { publishPlaylist } from "@/lib/playlist/playlist";
import { encodeId } from "@/lib/ids";

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
    toast.promise(
      (async () => {
        const res = await deletePlaylist(playlist.id)

        if (res.status !== 200)
          throw new Error("Delete failed")

        onDelete(playlist.id)
        return res
      })(),
      {
        loading: `Deleting playlist...`,
        success: `Playlist deleted successfully`,
        error: (err) => err.message || `Failed to delete playlist`,
      }
    )
  };

  const handlePublish = async () => {
    try {
      const res = await publishPlaylist(playlist.id);

      if (res.status === 200)
        toast.success("Playlist published successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCopyLink = async () => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      // ถ้ามี public_id อยู่แล้วก็ใช้แทน encodeId ได้เลย:
      // const userPart = playlist.user?.public_id ?? encodeId(playlist.users_id);
      // const playlistPart = playlist.public_id ?? encodeId(playlist.id);
      const userPart = encodeId(playlist.users_id);
      const playlistPart = encodeId(playlist.id);
      const url = `${origin}/home/playlists/${userPart}/${playlistPart}`;

      await navigator.clipboard.writeText(url);
      toast.success("Copied playlist link to clipboard!");
    } catch (err) {
      try {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const url = `${origin}/home/playlists/${encodeId(playlist.users_id)}/${encodeId(playlist.id)}`;
        window.prompt("Copy this link:", url);
      } catch (_) {}
      toast.error("Failed to copy link");
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
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={handlePublish}>
            <MonitorUp />
            Publish this playlist
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={handleCopyLink}>
            <ClipboardCopy />
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={handleAddMusicOpen}>
            <CirclePlus />
            Add / Remove music to playlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionCard