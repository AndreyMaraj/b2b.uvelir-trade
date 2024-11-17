-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "visibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ShoppingBagsProduct" (
    "userId" TEXT NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL,
    "count" SMALLINT NOT NULL,

    CONSTRAINT "ShoppingBagsProduct_pkey" PRIMARY KEY ("userId","invisibleModelModificationId")
);

-- CreateTable
CREATE TABLE "Sex" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeCategory" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AgeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WireType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WireType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeavingType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WeavingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RingDimensions" (
    "id" SMALLSERIAL NOT NULL,
    "tireWidth" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "RingDimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarringDimensions" (
    "id" SMALLSERIAL NOT NULL,
    "depth" DECIMAL(4,2),
    "pinLowering" DECIMAL(4,2),
    "pinWorkingArea" DECIMAL(3,2),

    CONSTRAINT "EarringDimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStyle" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTheme" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLockType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductLockType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetalType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetalCoating" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetalCoating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metal" (
    "id" SMALLSERIAL NOT NULL,
    "standard" INTEGER NOT NULL,
    "metalTypeId" INTEGER NOT NULL,
    "metalCoatingId" INTEGER,
    "colorId" INTEGER,

    CONSTRAINT "Metal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoneType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StoneType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CutType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CutType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stone" (
    "id" SMALLSERIAL NOT NULL,
    "chroma" TEXT,
    "purity" TEXT,
    "colorId" SMALLINT,
    "stoneTypeId" SMALLINT NOT NULL,
    "cutTypeId" SMALLINT NOT NULL,

    CONSTRAINT "Stone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelComponent" (
    "id" SERIAL NOT NULL,
    "count" SMALLINT NOT NULL DEFAULT 1,
    "weight" DECIMAL(5,3),
    "stoneId" SMALLINT NOT NULL,
    "visibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "ModelComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvisibleModelModification" (
    "id" SERIAL NOT NULL,
    "article" TEXT NOT NULL,
    "height" DECIMAL(4,2),
    "width" DECIMAL(4,2),
    "description" TEXT,
    "wireTypeId" SMALLINT,
    "visibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "InvisibleModelModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisibleModelModification" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "wireDiameter" DECIMAL(3,2),
    "productModelId" INTEGER NOT NULL,

    CONSTRAINT "VisibleModelModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductModel" (
    "id" SERIAL NOT NULL,
    "productPrototypId" INTEGER NOT NULL,
    "metalId" SMALLINT NOT NULL,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrototype" (
    "id" SERIAL NOT NULL,
    "code" SMALLINT NOT NULL,
    "typeId" SMALLINT NOT NULL,
    "sexId" SMALLINT,
    "ageCategoryId" SMALLINT,
    "styleId" SMALLINT,
    "themeId" SMALLINT,
    "lockTypeId" SMALLINT,
    "ringDimensionsId" SMALLINT,
    "earringDimensionsId" SMALLINT,
    "weavingTypeId" SMALLINT,

    CONSTRAINT "ProductPrototype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tin_key" ON "User"("tin");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Sex_name_key" ON "Sex"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AgeCategory_name_key" ON "AgeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WireType_name_key" ON "WireType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeavingType_name_key" ON "WeavingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RingDimensions_tireWidth_key" ON "RingDimensions"("tireWidth");

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStyle_name_key" ON "ProductStyle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTheme_name_key" ON "ProductTheme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLockType_name_key" ON "ProductLockType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MetalType_name_key" ON "MetalType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MetalCoating_name_key" ON "MetalCoating"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoneType_name_key" ON "StoneType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CutType_name_key" ON "CutType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvisibleModelModification_article_key" ON "InvisibleModelModification"("article");

-- CreateIndex
CREATE UNIQUE INDEX "VisibleModelModification_code_productModelId_key" ON "VisibleModelModification"("code", "productModelId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_productPrototypId_metalId_key" ON "ProductModel"("productPrototypId", "metalId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrototype_code_typeId_key" ON "ProductPrototype"("code", "typeId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_visibleModelModificationId_fkey" FOREIGN KEY ("visibleModelModificationId") REFERENCES "VisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Metal" ADD CONSTRAINT "Metal_metalTypeId_fkey" FOREIGN KEY ("metalTypeId") REFERENCES "MetalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metal" ADD CONSTRAINT "Metal_metalCoatingId_fkey" FOREIGN KEY ("metalCoatingId") REFERENCES "MetalCoating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metal" ADD CONSTRAINT "Metal_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stone" ADD CONSTRAINT "Stone_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stone" ADD CONSTRAINT "Stone_stoneTypeId_fkey" FOREIGN KEY ("stoneTypeId") REFERENCES "StoneType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stone" ADD CONSTRAINT "Stone_cutTypeId_fkey" FOREIGN KEY ("cutTypeId") REFERENCES "CutType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelComponent" ADD CONSTRAINT "ModelComponent_stoneId_fkey" FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelComponent" ADD CONSTRAINT "ModelComponent_visibleModelModificationId_fkey" FOREIGN KEY ("visibleModelModificationId") REFERENCES "VisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_wireTypeId_fkey" FOREIGN KEY ("wireTypeId") REFERENCES "WireType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_visibleModelModificationId_fkey" FOREIGN KEY ("visibleModelModificationId") REFERENCES "VisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisibleModelModification" ADD CONSTRAINT "VisibleModelModification_productModelId_fkey" FOREIGN KEY ("productModelId") REFERENCES "ProductModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_productPrototypId_fkey" FOREIGN KEY ("productPrototypId") REFERENCES "ProductPrototype"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_metalId_fkey" FOREIGN KEY ("metalId") REFERENCES "Metal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "Sex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_ageCategoryId_fkey" FOREIGN KEY ("ageCategoryId") REFERENCES "AgeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "ProductStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "ProductTheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_lockTypeId_fkey" FOREIGN KEY ("lockTypeId") REFERENCES "ProductLockType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_ringDimensionsId_fkey" FOREIGN KEY ("ringDimensionsId") REFERENCES "RingDimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_earringDimensionsId_fkey" FOREIGN KEY ("earringDimensionsId") REFERENCES "EarringDimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrototype" ADD CONSTRAINT "ProductPrototype_weavingTypeId_fkey" FOREIGN KEY ("weavingTypeId") REFERENCES "WeavingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
