/*
  Warnings:

  - Added the required column `external_id` to the `BikeStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_id` to the `Crime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BikeStation" ADD COLUMN     "external_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Crime" ADD COLUMN     "external_id" TEXT NOT NULL;
