-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "score" DROP NOT NULL;

-- CreateTable
CREATE TABLE "gameEntry" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "gameEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gameEntry" ADD CONSTRAINT "gameEntry_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
