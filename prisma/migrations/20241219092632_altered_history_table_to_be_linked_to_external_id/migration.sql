/*
  Warnings:

  - You are about to drop the column `bikeStationId` on the `BikeStationHistory` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `BikeStationHistory` table. All the data in the column will be lost.
  - Added the required column `bikeStationExternalId` to the `BikeStationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BikeStationHistory" DROP CONSTRAINT "BikeStationHistory_bikeStationId_fkey";

-- DropIndex
DROP INDEX "bikeStation_timestamp_idx";

-- AlterTable
ALTER TABLE "BikeStationHistory" DROP COLUMN "bikeStationId",
DROP COLUMN "external_id",
ADD COLUMN     "bikeStationExternalId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "bikeStation_timestamp_idx" ON "BikeStationHistory"("bikeStationExternalId", "timestamp");

-- AddForeignKey
ALTER TABLE "BikeStationHistory" ADD CONSTRAINT "BikeStationHistory_bikeStationExternalId_fkey" FOREIGN KEY ("bikeStationExternalId") REFERENCES "BikeStation"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;
