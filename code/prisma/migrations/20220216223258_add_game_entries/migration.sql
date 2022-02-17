-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "score" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GameEntries" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameEntries" ADD CONSTRAINT "GameEntries_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
