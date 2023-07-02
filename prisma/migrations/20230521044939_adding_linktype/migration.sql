/*
  Warnings:

  - You are about to drop the column `isArticle` on the `Link` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('PAGE', 'ARTICLE', 'VIDEO');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "isArticle",
ADD COLUMN     "type" "LinkType" NOT NULL DEFAULT 'PAGE';
