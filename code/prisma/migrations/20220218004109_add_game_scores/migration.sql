/*
  Warnings:

  - A unique constraint covering the columns `[gameScoreId]` on the table `gameEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameScoreId` to the `gameEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameScoresId` to the `gameEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `gameEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "gameEntry" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gameScoreId" TEXT NOT NULL,
ADD COLUMN     "gameScoresId" TEXT NOT NULL,
ADD COLUMN     "scoreId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "GameScore" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameEntryId" TEXT,
    "amount" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameScore_gameEntryId_key" ON "GameScore"("gameEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "gameEntry_gameScoreId_key" ON "gameEntry"("gameScoreId");

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_gameEntryId_fkey" FOREIGN KEY ("gameEntryId") REFERENCES "gameEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
