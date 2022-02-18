/*
  Warnings:

  - You are about to drop the column `correct` on the `GameScore` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `GameScore` table. All the data in the column will be lost.
  - Added the required column `messageType` to the `GameScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameScore" DROP COLUMN "correct",
DROP COLUMN "message",
ADD COLUMN     "messageType" INTEGER NOT NULL;
