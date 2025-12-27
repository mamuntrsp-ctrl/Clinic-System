import express from "express";
import {
  getPatients,
  addPatient,
  callNext,
  removePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.post("/call-next", callNext);
router.delete("/:id", removePatient);

export default router;
