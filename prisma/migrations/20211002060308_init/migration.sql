-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SliceState" AS ENUM ('PENDING', 'SLICING', 'SUCCESS');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('CHINESE', 'ENGLISH', 'JAPANESE', 'KOREAN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicRegion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" VARCHAR(32) NOT NULL,
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLng" DOUBLE PRECISION NOT NULL,
    "handDrawingNELat" DOUBLE PRECISION NOT NULL,
    "handDrawingNELng" DOUBLE PRECISION NOT NULL,
    "handDrawingSWLat" DOUBLE PRECISION NOT NULL,
    "handDrawingSWLng" DOUBLE PRECISION NOT NULL,
    "zoom" INTEGER NOT NULL,
    "minZoom" INTEGER NOT NULL,
    "maxZoom" INTEGER NOT NULL,
    "enableNavigation" BOOLEAN NOT NULL,
    "enablePoiLanguageSwitch" BOOLEAN NOT NULL,
    "sliceState" "SliceState" NOT NULL DEFAULT E'PENDING',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicRegionInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scenicRegionId" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "title" VARCHAR(32) NOT NULL,
    "layer" TEXT NOT NULL,
    "layersDisplayName" VARCHAR(32) NOT NULL,
    "vrUrl" TEXT NOT NULL,
    "ticketUrl" TEXT NOT NULL,
    "handDrawingUri" TEXT NOT NULL,
    "lang" "Language" NOT NULL DEFAULT E'CHINESE',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicSpotType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" VARCHAR(32) NOT NULL,
    "icon" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicSpotTypeInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scenicSpotTypeId" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "lang" "Language" NOT NULL DEFAULT E'CHINESE',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicSpot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scenicRegionId" TEXT NOT NULL,
    "scenicSpotTypeId" TEXT NOT NULL,
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLng" DOUBLE PRECISION NOT NULL,
    "displayName" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenicSpotInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scenicSpotId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "iconUri" TEXT NOT NULL,
    "audioUri" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "lang" "Language" NOT NULL DEFAULT E'CHINESE',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouringRoute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT NOT NULL,
    "scenicRegionId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouringRouteInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "touringRouteId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "lang" "Language" NOT NULL DEFAULT E'CHINESE',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ScenicRegionInfo" ADD FOREIGN KEY ("scenicRegionId") REFERENCES "ScenicRegion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenicSpotTypeInfo" ADD FOREIGN KEY ("scenicSpotTypeId") REFERENCES "ScenicSpotType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenicSpot" ADD FOREIGN KEY ("scenicRegionId") REFERENCES "ScenicRegion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenicSpotInfo" ADD FOREIGN KEY ("scenicSpotId") REFERENCES "ScenicSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouringRoute" ADD FOREIGN KEY ("scenicRegionId") REFERENCES "ScenicRegion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouringRouteInfo" ADD FOREIGN KEY ("touringRouteId") REFERENCES "TouringRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
