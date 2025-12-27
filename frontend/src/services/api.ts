import { Patient } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

export const getPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${API_BASE_URL}/patients`);
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

export const addPatient = async (
  name: string,
  type: string
): Promise<Patient> => {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, type }),
  });
  if (!response.ok) {
    throw new Error("Failed to add patient");
  }
  return response.json();
};

export const callNextPatient = async (): Promise<Patient | null> => {
  const response = await fetch(`${API_BASE_URL}/patients/call-next`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to call next patient");
  }
  return response.json();
};

export const removePatient = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove patient");
  }
};
