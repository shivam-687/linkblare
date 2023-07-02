/*
  Warnings:

  - Made the column `collectionId` on table `Save` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_collectionId_fkey";

-- AlterTable
ALTER TABLE "Save" ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
