/*
  Warnings:

  - A unique constraint covering the columns `[users_id,songs_id]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Favorite_songs_id_idx" ON "Favorite"("songs_id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_users_id_songs_id_key" ON "Favorite"("users_id", "songs_id");
