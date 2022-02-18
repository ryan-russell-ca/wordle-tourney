/*
  Warnings:

  - A unique constraint covering the columns `[gameId,row]` on the table `gameEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gameId_row_unique_constraint" ON "gameEntry"("gameId", "row");
