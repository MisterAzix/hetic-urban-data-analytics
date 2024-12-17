import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Récupérer toutes les stations de vélos
router.get("/bikestations", async (req, res) => {
  try {
    const stations = await prisma.bikeStation.findMany();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des stations" });
  }
});

// Créer une nouvelle station de vélos
router.post("/bikestations", async (req, res) => {
  const { id, name, latitude, longitude, timestamp, free_bikes, total_capacity, empty_slots } = req.body;

  try {
    const newStation = await prisma.bikeStation.create({
      data: {
        id,
        name,
        latitude,
        longitude,
        timestamp: new Date(timestamp),
        free_bikes,
        total_capacity,
        empty_slots,
      },
    });
    res.json(newStation);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la station" });
  }
});

export default router;
