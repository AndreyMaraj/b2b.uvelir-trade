/*
  Warnings:

  - You are about to drop the column `visibleModelModificationId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_visibleModelModificationId_fkey";

-- AlterTable
ALTER TABLE "public"."Media" DROP COLUMN "visibleModelModificationId",
ADD COLUMN     "invisibleModelModificationId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "public"."InvisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
