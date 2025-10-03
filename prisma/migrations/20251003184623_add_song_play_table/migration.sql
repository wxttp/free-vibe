-- CreateTable
CREATE TABLE "SongPlay" (
    "id" SERIAL NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "SongPlay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SongPlay_userId_playedAt_idx" ON "SongPlay"("userId", "playedAt");

-- CreateIndex
CREATE INDEX "SongPlay_songId_playedAt_idx" ON "SongPlay"("songId", "playedAt");

-- AddForeignKey
ALTER TABLE "SongPlay" ADD CONSTRAINT "SongPlay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongPlay" ADD CONSTRAINT "SongPlay_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
