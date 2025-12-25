import prisma from "../prisma.js";

/**
 * Get all patients in FIFO order
 */
export const getAllPatients = () => {
  return prisma.patient.findMany({
    orderBy: { serial: "asc" }, // FIFO by serial
  });
};

/**
 * Add new patient at the end of queue
 */
export const createPatient = async (name, type) => {
  const last = await prisma.patient.findFirst({
    orderBy: { serial: "desc" },
  });

  const serial = last ? last.serial + 1 : 101;

  return prisma.patient.create({
    data: {
      name,
      serial,
      type,
      status: "WAITING", // status kept simple
    },
  });
};

/**
 * FIFO: remove the FIRST patient
 */
export const callNextPatient = async () => {
  const firstPatient = await prisma.patient.findFirst({
    orderBy: { serial: "asc" },
  });

  if (!firstPatient) {
    return null; // queue empty
  }

  await prisma.patient.delete({
    where: { id: firstPatient.id },
  });

  return firstPatient;
};

/**
 * Remove a patient manually
 */
export const deletePatient = (id) => {
  return prisma.patient.delete({ where: { id } });
};
