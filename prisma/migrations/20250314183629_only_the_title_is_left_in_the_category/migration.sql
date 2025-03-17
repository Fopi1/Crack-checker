/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `icon` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToGame" DROP CONSTRAINT "_CategoryToGame_A_fkey";

-- DropIndex
DROP INDEX "Category_title_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "icon",
DROP COLUMN "id",
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("title");

-- AlterTable
ALTER TABLE "_CategoryToGame" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CategoryToGame" ADD CONSTRAINT "_CategoryToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("title") ON DELETE CASCADE ON UPDATE CASCADE;
