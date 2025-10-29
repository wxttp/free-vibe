-- DropForeignKey
ALTER TABLE "public"."PlaylistSong" DROP CONSTRAINT "PlaylistSong_songs_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."PlaylistSong" ADD CONSTRAINT "PlaylistSong_songs_id_fkey" FOREIGN KEY ("songs_id") REFERENCES "public"."Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
