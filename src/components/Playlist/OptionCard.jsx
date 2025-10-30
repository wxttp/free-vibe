'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  const [openEdit, setOpenEdit] = useState(false);
  const [openAddMusic, setOpenAddMusic] = useState(false);
  const [isPublic, setIsPublic] = useState(playlist?.is_public ?? false)
  useEffect(() => {
    setIsPublic(playlist?.is_public ?? false)
  }, [playlist?.is_public])

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
    toast.promise(
      (async () => {
        const res = await publishPlaylist(playlist.id);

        if (res.status !== 200)
          throw new Error("failed")

        return res
      })(),
      {
        loading: isPublic ? 'Unpublishing...' : 'Publishing...',
        success: (res) => {
          const next = res.playlist?.is_public ?? !isPublic
          setIsPublic(next)
          setTimeout(() => router.refresh(), 150)
          return next ? 'Playlist published successfully' : 'Playlist unpublished successfully'
        },
        error: 'Failed to update playlist visibility',
      }
    )
  };

  const handleCopyLink = async () => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
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
      toast.info("Copied manually — please paste it yourself!");
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
            {!isPublic ? "Publish this playlist" : "Unpublish this playlist"}
          </DropdownMenuItem>
          {
            isPublic ? (
              <DropdownMenuItem className="cursor-pointer" onSelect={handleCopyLink}>
                <ClipboardCopy />
                Copy Link
              </DropdownMenuItem>
            ) : ""
          }
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