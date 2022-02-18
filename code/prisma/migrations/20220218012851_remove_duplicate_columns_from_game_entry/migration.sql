/*
  Warnings:

  - You are about to drop the column `gameScoresId` on the `GameEntry` table. All the data in the column will be lost.
  - You are about to drop the column `scoreId` on the `GameEntry` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GameEntry_gameScoreId_key";

-- AlterTable
ALTER TABLE "GameEntry" DROP COLUMN "gameScoresId",
DROP COLUMN "scoreId",
ALTER COLUMN "gameScoreId" DROP NOT NULL;
