-- CreateTable
CREATE TABLE "BikeStationHistory" (
    "id" TEXT NOT NULL,
    "bikeStationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "free_bikes" INTEGER NOT NULL,
    "empty_slots" INTEGER NOT NULL,
    "total_capacity" INTEGER NOT NULL,

    CONSTRAINT "BikeStationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bikeStation_timestamp_idx" ON "BikeStationHistory"("bikeStationId", "timestamp");

-- AddForeignKey
ALTER TABLE "BikeStationHistory" ADD CONSTRAINT "BikeStationHistory_bikeStationId_fkey" FOREIGN KEY ("bikeStationId") REFERENCES "BikeStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
