-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'MANAGER', 'CLIENT');

-- CreateEnum
CREATE TYPE "public"."MenuType" AS ENUM ('CATALOG');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CLIENT',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Manager" (
    "id" SMALLSERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Client" (
    "id" SMALLSERIAL NOT NULL,
    "organization" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
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
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "public"."MenuItem" (
    "id" SMALLSERIAL NOT NULL,
    "menuType" "public"."MenuType" NOT NULL,
    "name" TEXT NOT NULL,
    "urlParams" TEXT,
    "order" SMALLSERIAL NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" SERIAL NOT NULL,
    "count" SMALLINT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL,
    "invisibleModelModificationSizeId" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShoppingBagsProduct" (
    "id" SERIAL NOT NULL,
    "count" SMALLINT NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL,
    "invisibleModelModificationSizeId" INTEGER,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ShoppingBagsProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NomenclatureGroup" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NomenclatureGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sex" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AgeCategory" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AgeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WireType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WireType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeavingType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WeavingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RingDimensions" (
    "id" SMALLSERIAL NOT NULL,
    "tireWidth" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "RingDimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EarringDimensions" (
    "id" SMALLSERIAL NOT NULL,
    "depth" DECIMAL(4,2),
    "pinLowering" DECIMAL(4,2),
    "pinWorkingArea" DECIMAL(3,2),

    CONSTRAINT "EarringDimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductStyle" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductTheme" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductLockType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductLockType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Size" (
    "id" SMALLSERIAL NOT NULL,
    "value" DECIMAL(3,1) NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MetalType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MetalCoating" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MetalCoating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Metal" (
    "id" SMALLSERIAL NOT NULL,
    "standard" INTEGER NOT NULL,
    "metalTypeId" INTEGER NOT NULL,
    "metalCoatingId" INTEGER,
    "colorId" INTEGER,

    CONSTRAINT "Metal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StoneType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StoneType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CutType" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CutType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stone" (
    "id" SMALLSERIAL NOT NULL,
    "chroma" TEXT,
    "purity" TEXT,
    "colorId" SMALLINT,
    "stoneTypeId" SMALLINT NOT NULL,
    "cutTypeId" SMALLINT NOT NULL,

    CONSTRAINT "Stone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ModelComponent" (
    "id" SERIAL NOT NULL,
    "count" SMALLINT NOT NULL DEFAULT 1,
    "averageWeight" DECIMAL(5,3) NOT NULL DEFAULT 0,
    "stoneId" SMALLINT NOT NULL,
    "visibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "ModelComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InvisibleModelModificationSize" (
    "id" SERIAL NOT NULL,
    "averageWeight" DECIMAL(4,2) NOT NULL DEFAULT 0,
    "sizeId" SMALLINT NOT NULL,
    "invisibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "InvisibleModelModificationSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InvisibleModelModification" (
    "id" SERIAL NOT NULL,
    "article" TEXT NOT NULL,
    "height" DECIMAL(4,2) NOT NULL DEFAULT 0,
    "width" DECIMAL(4,2) NOT NULL DEFAULT 0,
    "averageWeight" DECIMAL(4,2) NOT NULL DEFAULT 0,
    "description" TEXT,
    "wireTypeId" SMALLINT,
    "nomenclatureGroupId" SMALLINT,
    "visibleModelModificationId" INTEGER NOT NULL,

    CONSTRAINT "InvisibleModelModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VisibleModelModification" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "wireDiameter" DECIMAL(3,2),
    "productModelId" INTEGER NOT NULL,

    CONSTRAINT "VisibleModelModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductModel" (
    "id" SERIAL NOT NULL,
    "productPrototypId" INTEGER NOT NULL,
    "metalId" SMALLINT NOT NULL,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductPrototype" (
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
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "public"."Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_tin_key" ON "public"."Client"("tin");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "public"."Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuType_name_key" ON "public"."MenuItem"("menuType", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuType_urlParams_key" ON "public"."MenuItem"("menuType", "urlParams");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_invisibleModelModificationId_invisibleMod_key" ON "public"."OrderItem"("orderId", "invisibleModelModificationId", "invisibleModelModificationSizeId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingBagsProduct_clientId_invisibleModelModificationId_i_key" ON "public"."ShoppingBagsProduct"("clientId", "invisibleModelModificationId", "invisibleModelModificationSizeId");

-- CreateIndex
CREATE UNIQUE INDEX "NomenclatureGroup_name_key" ON "public"."NomenclatureGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sex_name_key" ON "public"."Sex"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AgeCategory_name_key" ON "public"."AgeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WireType_name_key" ON "public"."WireType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeavingType_name_key" ON "public"."WeavingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RingDimensions_tireWidth_key" ON "public"."RingDimensions"("tireWidth");

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "public"."ProductType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStyle_name_key" ON "public"."ProductStyle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTheme_name_key" ON "public"."ProductTheme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLockType_name_key" ON "public"."ProductLockType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_value_key" ON "public"."Size"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MetalType_name_key" ON "public"."MetalType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MetalCoating_name_key" ON "public"."MetalCoating"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "public"."Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoneType_name_key" ON "public"."StoneType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CutType_name_key" ON "public"."CutType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvisibleModelModificationSize_sizeId_invisibleModelModific_key" ON "public"."InvisibleModelModificationSize"("sizeId", "invisibleModelModificationId");

-- CreateIndex
CREATE UNIQUE INDEX "InvisibleModelModification_article_key" ON "public"."InvisibleModelModification"("article");

-- CreateIndex
CREATE UNIQUE INDEX "VisibleModelModification_code_productModelId_key" ON "public"."VisibleModelModification"("code", "productModelId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_productPrototypId_metalId_key" ON "public"."ProductModel"("productPrototypId", "metalId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrototype_code_typeId_key" ON "public"."ProductPrototype"("code", "typeId");

-- AddForeignKey
ALTER TABLE "public"."Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "public"."Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "public"."InvisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "public"."InvisibleModelModification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_invisibleModelModificationSizeId_fkey" FOREIGN KEY ("invisibleModelModificationSizeId") REFERENCES "public"."InvisibleModelModificationSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingBagsProduct" ADD CONSTRAINT "ShoppingBagsProduct_invisibleModelModificationId_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "public"."InvisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingBagsProduct" ADD CONSTRAINT "ShoppingBagsProduct_invisibleModelModificationSizeId_fkey" FOREIGN KEY ("invisibleModelModificationSizeId") REFERENCES "public"."InvisibleModelModificationSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingBagsProduct" ADD CONSTRAINT "ShoppingBagsProduct_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metal" ADD CONSTRAINT "Metal_metalTypeId_fkey" FOREIGN KEY ("metalTypeId") REFERENCES "public"."MetalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metal" ADD CONSTRAINT "Metal_metalCoatingId_fkey" FOREIGN KEY ("metalCoatingId") REFERENCES "public"."MetalCoating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Metal" ADD CONSTRAINT "Metal_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stone" ADD CONSTRAINT "Stone_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stone" ADD CONSTRAINT "Stone_stoneTypeId_fkey" FOREIGN KEY ("stoneTypeId") REFERENCES "public"."StoneType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stone" ADD CONSTRAINT "Stone_cutTypeId_fkey" FOREIGN KEY ("cutTypeId") REFERENCES "public"."CutType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ModelComponent" ADD CONSTRAINT "ModelComponent_stoneId_fkey" FOREIGN KEY ("stoneId") REFERENCES "public"."Stone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ModelComponent" ADD CONSTRAINT "ModelComponent_visibleModelModificationId_fkey" FOREIGN KEY ("visibleModelModificationId") REFERENCES "public"."VisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvisibleModelModificationSize" ADD CONSTRAINT "InvisibleModelModificationSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvisibleModelModificationSize" ADD CONSTRAINT "InvisibleModelModificationSize_invisibleModelModificationI_fkey" FOREIGN KEY ("invisibleModelModificationId") REFERENCES "public"."InvisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_wireTypeId_fkey" FOREIGN KEY ("wireTypeId") REFERENCES "public"."WireType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_nomenclatureGroupId_fkey" FOREIGN KEY ("nomenclatureGroupId") REFERENCES "public"."NomenclatureGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_visibleModelModificationId_fkey" FOREIGN KEY ("visibleModelModificationId") REFERENCES "public"."VisibleModelModification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VisibleModelModification" ADD CONSTRAINT "VisibleModelModification_productModelId_fkey" FOREIGN KEY ("productModelId") REFERENCES "public"."ProductModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductModel" ADD CONSTRAINT "ProductModel_productPrototypId_fkey" FOREIGN KEY ("productPrototypId") REFERENCES "public"."ProductPrototype"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductModel" ADD CONSTRAINT "ProductModel_metalId_fkey" FOREIGN KEY ("metalId") REFERENCES "public"."Metal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "public"."Sex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_ageCategoryId_fkey" FOREIGN KEY ("ageCategoryId") REFERENCES "public"."AgeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "public"."ProductStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "public"."ProductTheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_lockTypeId_fkey" FOREIGN KEY ("lockTypeId") REFERENCES "public"."ProductLockType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_ringDimensionsId_fkey" FOREIGN KEY ("ringDimensionsId") REFERENCES "public"."RingDimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_earringDimensionsId_fkey" FOREIGN KEY ("earringDimensionsId") REFERENCES "public"."EarringDimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrototype" ADD CONSTRAINT "ProductPrototype_weavingTypeId_fkey" FOREIGN KEY ("weavingTypeId") REFERENCES "public"."WeavingType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
