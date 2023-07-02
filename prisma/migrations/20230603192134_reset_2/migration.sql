-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_collectionId_fkey";

-- DropIndex
DROP INDEX "Link_collectionId_url_key";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
