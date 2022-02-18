/*
  Warnings:

  - You are about to drop the `gameEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gameEntry" DROP CONSTRAINT "gameEntry_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameScore" DROP CONSTRAINT "GameScore_gameEntryId_fkey";

-- DropTable
DROP TABLE "gameEntry";

-- CreateTable
CREATE TABLE "GameEntry" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scoreId" TEXT,
    "gameScoresId" TEXT NOT NULL,
    "gameScoreId" TEXT NOT NULL,

    CONSTRAINT "GameEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameEntry_gameScoreId_key" ON "GameEntry"("gameScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "gameId_row_unique_constraint" ON "GameEntry"("gameId", "row");

-- AddForeignKey
ALTER TABLE "GameEntry" ADD CONSTRAINT "GameEntry_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_gameEntryId_fkey" FOREIGN KEY ("gameEntryId") REFERENCES "GameEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
