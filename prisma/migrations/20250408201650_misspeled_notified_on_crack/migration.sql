/*
  Warnings:

  - You are about to drop the column `notifiendOnCrack` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "notifiendOnCrack",
ADD COLUMN     "notifiedOnCrack" BOOLEAN NOT NULL DEFAULT false;
