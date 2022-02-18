-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
