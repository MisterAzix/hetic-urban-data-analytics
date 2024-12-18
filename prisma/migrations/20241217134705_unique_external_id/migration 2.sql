/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `BikeStation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `Crime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BikeStation_external_id_key" ON "BikeStation"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "Crime_external_id_key" ON "Crime"("external_id");
