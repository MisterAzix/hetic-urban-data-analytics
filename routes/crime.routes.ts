import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Récupérer tous les crimes
router.get("/crimes", async (req, res) => {
  try {
    const crimes = await prisma.crime.findMany();
    res.json(crimes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des crimes" });
  }
});

// Récupérer un crime par ID
router.get("/crimes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const crime = await prisma.crime.findUnique({
      where: { id },
    });
    if (crime) res.json(crime);
    else res.status(404).json({ error: "Crime non trouvé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Créer un nouveau crime
router.post("/crimes", async (req, res) => {
  const { latitude, longitude, age_group, sex, race, summons_date, offense_description, borough } = req.body;
  try {
    const newCrime = await prisma.crime.create({
      data: {
        latitude,
        longitude,
        age_group,
        sex,
        race,
        summons_date: new Date(summons_date),
        offense_description,
        borough,
      },
    });
    res.json(newCrime);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du crime" });
  }
});

// Mettre à jour un crime
router.put("/crimes/:id", async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude, age_group, sex, race, summons_date, offense_description, borough } = req.body;

  try {
    const updatedCrime = await prisma.crime.update({
      where: { id },
      data: {
        latitude,
        longitude,
        age_group,
        sex,
        race,
        summons_date: new Date(summons_date),
        offense_description,
        borough,
      },
    });
    res.json(updatedCrime);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du crime" });
  }
});

// Supprimer un crime
router.delete("/crimes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.crime.delete({
      where: { id },
    });
    res.json({ message: "Crime supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du crime" });
  }
});

export default router;
