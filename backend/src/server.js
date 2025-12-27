import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patient.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Clinic Backend is running");
});

app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
