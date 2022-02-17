/*
  Warnings:

  - A unique constraint covering the columns `[gameId,row]` on the table `GameEntries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gameId_row_unique_constraint" ON "GameEntries"("gameId", "row");
