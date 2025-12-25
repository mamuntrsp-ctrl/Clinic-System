import * as service from "../services/patient.service.js";

export const getPatients = async (req, res) => {
  const data = await service.getAllPatients();
  res.json(data);
};

export const addPatient = async (req, res) => {
  const { name, type } = req.body;
  const patient = await service.createPatient(name, type);
  res.json(patient);
};

export const callNext = async (req, res) => {
  const patient = await service.callNextPatient();
  res.json(patient);
};

export const removePatient = async (req, res) => {
  await service.deletePatient(Number(req.params.id));
  res.json({ success: true });
};
