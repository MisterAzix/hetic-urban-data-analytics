import express from "express";
import crimeRoutes from "./routes/crime.routes";
import bikeStationRoutes from "./routes/bikestation.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", crimeRoutes);
app.use("/api", bikeStationRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
