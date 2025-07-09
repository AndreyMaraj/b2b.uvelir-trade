-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('CATALOG');

-- AlterTable
ALTER TABLE "InvisibleModelModification" ADD COLUMN     "nomenclatureGroupId" SMALLINT;

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SMALLSERIAL NOT NULL,
    "menuType" "MenuType" NOT NULL,
    "name" TEXT NOT NULL,
    "urlParams" TEXT,
    "order" SMALLSERIAL NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NomenclatureGroup" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NomenclatureGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuType_name_key" ON "MenuItem"("menuType", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuType_urlParams_key" ON "MenuItem"("menuType", "urlParams");

-- CreateIndex
CREATE UNIQUE INDEX "NomenclatureGroup_name_key" ON "NomenclatureGroup"("name");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvisibleModelModification" ADD CONSTRAINT "InvisibleModelModification_nomenclatureGroupId_fkey" FOREIGN KEY ("nomenclatureGroupId") REFERENCES "NomenclatureGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
