/*
  Warnings:

  - The primary key for the `ShoppingBagsProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ShoppingBagsProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShoppingBagsProduct" DROP CONSTRAINT "ShoppingBagsProduct_invisibleModelModificationId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingBagsProduct" DROP CONSTRAINT "ShoppingBagsProduct_userId_fkey";

-- DropIndex
DROP INDEX "ShoppingBagsProduct_userId_invisibleModelModificationId_key";

-- AlterTable
ALTER TABLE "ShoppingBagsProduct" DROP CONSTRAINT "ShoppingBagsProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ShoppingBagsProduct_pkey" PRIMARY KEY ("userId", "invisibleModelModificationId");

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" INTEGER NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL,
    "count" SMALLINT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId","invisibleModelModificationId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "InvisibleModelModification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingBagsProduct" ADD CONSTRAINT "ShoppingBagsProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingBagsProduct" ADD CONSTRAINT "ShoppingBagsProduct_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "InvisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
