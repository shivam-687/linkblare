/*
  Warnings:

  - You are about to drop the column `linkId` on the `Save` table. All the data in the column will be lost.
  - You are about to drop the `_CollectionToLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[collectionId,url]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_linkId_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToLink" DROP CONSTRAINT "_CollectionToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToLink" DROP CONSTRAINT "_CollectionToLink_B_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Save" DROP COLUMN "linkId";

-- DropTable
DROP TABLE "_CollectionToLink";

-- CreateIndex
CREATE UNIQUE INDEX "Link_collectionId_url_key" ON "Link"("collectionId", "url");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
