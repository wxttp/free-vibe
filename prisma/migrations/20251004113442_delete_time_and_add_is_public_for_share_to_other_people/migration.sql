/*
  Warnings:

  - You are about to drop the column `time` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "time";
