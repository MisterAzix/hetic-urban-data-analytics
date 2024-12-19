/*
  Warnings:

  - Added the required column `external_id` to the `BikeStationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BikeStationHistory" ADD COLUMN     "external_id" TEXT NOT NULL;
