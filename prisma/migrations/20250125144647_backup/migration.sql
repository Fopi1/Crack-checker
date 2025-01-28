-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "metaScore" INTEGER,
ADD COLUMN     "userScore" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refreshTokenId" DROP NOT NULL;
