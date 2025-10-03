/*
  Warnings:

  - You are about to drop the column `songId` on the `SongPlay` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SongPlay` table. All the data in the column will be lost.
  - Added the required column `song_id` to the `SongPlay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `SongPlay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SongPlay" DROP CONSTRAINT "SongPlay_songId_fkey";

-- DropForeignKey
ALTER TABLE "SongPlay" DROP CONSTRAINT "SongPlay_userId_fkey";

-- DropIndex
DROP INDEX "SongPlay_songId_playedAt_idx";

-- DropIndex
DROP INDEX "SongPlay_userId_playedAt_idx";

-- AlterTable
ALTER TABLE "SongPlay" DROP COLUMN "songId",
DROP COLUMN "userId",
ADD COLUMN     "song_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "SongPlay_user_id_playedAt_idx" ON "SongPlay"("user_id", "playedAt");

-- CreateIndex
CREATE INDEX "SongPlay_song_id_playedAt_idx" ON "SongPlay"("song_id", "playedAt");

-- AddForeignKey
ALTER TABLE "SongPlay" ADD CONSTRAINT "SongPlay_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongPlay" ADD CONSTRAINT "SongPlay_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
