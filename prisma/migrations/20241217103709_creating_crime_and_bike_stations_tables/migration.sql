-- CreateEnum
CREATE TYPE "NEW_YORK_BOROUGH" AS ENUM ('BROOKLYN', 'BRONX', 'STATEN_ISLAND', 'NEW_YORK', 'QUEENS', 'MANHATTAN');

-- CreateEnum
CREATE TYPE "AGE_GROUP" AS ENUM ('LESS_THAN_18', 'AGE_18_TO_24', 'AGE_25_TO_44', 'AGE_45_TO_64', 'AGE_65_PLUS', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Crime" (
    "id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "age_group" "AGE_GROUP" NOT NULL,
    "sex" TEXT,
    "race" TEXT,
    "summons_date" TIMESTAMP(3) NOT NULL,
    "offense_description" TEXT NOT NULL,
    "borough" "NEW_YORK_BOROUGH" NOT NULL,

    CONSTRAINT "Crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeStation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "free_bikes" INTEGER NOT NULL,
    "total_capacity" INTEGER NOT NULL,
    "empty_slots" INTEGER NOT NULL,

    CONSTRAINT "BikeStation_pkey" PRIMARY KEY ("id")
);
