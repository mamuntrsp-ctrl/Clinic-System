import prisma from "../prisma.js";

/**
 * Admin view: show everything
 */
export const getAllPatients = () => {
  return prisma.patient.findMany({
    orderBy: { serial: "asc" },
  });
};

/**
 * Create patient
 * If no NEXT and no RUNNING → NEXT
 * Else → WAITING
 */
export const createPatient = async (name, type) => {
  const last = await prisma.patient.findFirst({
    orderBy: { serial: "desc" },
  });

  const serial = last ? last.serial + 1 : 101;

  const active = await prisma.patient.findFirst({
    where: {
      status: { in: ["NEXT", "RUNNING"] },
    },
  });

  return prisma.patient.create({
    data: {
      name,
      serial,
      type, // REGULAR | REPORT
      status: active ? "WAITING" : "NEXT",
    },
  });
};

/**
 * FIFO — bulletproof version
 */
export const callNextPatient = async () => {
  // RUNNING → COMPLETED
  await prisma.patient.updateMany({
    where: { status: "RUNNING" },
    data: { status: "COMPLETED" },
  });

  // NEXT → RUNNING
  const next = await prisma.patient.findFirst({
    where: { status: "NEXT" },
    orderBy: { serial: "asc" },
  });

  if (next) {
    await prisma.patient.update({
      where: { id: next.id },
      data: { status: "RUNNING" },
    });
  }

  // WAITING → NEXT (only ONE)
  const waiting = await prisma.patient.findFirst({
    where: { status: "WAITING" },
    orderBy: { serial: "asc" },
  });

  if (waiting) {
    await prisma.patient.update({
      where: { id: waiting.id },
      data: { status: "NEXT" },
    });
  }

  return true;
};

/**
 * Manual delete
 */
export const deletePatient = (id) => {
  return prisma.patient.delete({
    where: { id },
  });
};
