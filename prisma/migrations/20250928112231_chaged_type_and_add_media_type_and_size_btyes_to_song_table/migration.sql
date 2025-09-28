/*
  Warnings:

  - The `file` column on the `Song` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "sizeBytes" INTEGER,
DROP COLUMN "file",
ADD COLUMN     "file" BYTEA;
