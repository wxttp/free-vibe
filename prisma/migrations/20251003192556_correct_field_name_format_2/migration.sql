/*
  Warnings:

  - You are about to drop the column `playedAt` on the `SongPlay` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SongPlay_song_id_playedAt_idx";

-- DropIndex
DROP INDEX "SongPlay_user_id_playedAt_idx";

-- AlterTable
ALTER TABLE "SongPlay" DROP COLUMN "playedAt",
ADD COLUMN     "played_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "SongPlay_user_id_played_at_idx" ON "SongPlay"("user_id", "played_at");

-- CreateIndex
CREATE INDEX "SongPlay_song_id_played_at_idx" ON "SongPlay"("song_id", "played_at");
