/*
  Warnings:

  - A unique constraint covering the columns `[userId,invisibleModelModificationId]` on the table `ShoppingBagsProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShoppingBagsProduct_userId_invisibleModelModificationId_key" ON "ShoppingBagsProduct"("userId", "invisibleModelModificationId");
