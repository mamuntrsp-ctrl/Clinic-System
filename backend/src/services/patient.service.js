import prisma from "../prisma.js";

export const getAllPatients = () => {
  return prisma.patient.findMany({
    orderBy: { serial: "asc" },
  });
};

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
      status: type === "REPORT" ? "REPORT" : "WAITING",
    },
  });
};

export const callNextPatient = async () => {
  await prisma.patient.updateMany({
    where: { status: "RUNNING" },
    data: { status: "COMPLETED" },
  });

  const next = await prisma.patient.findFirst({
    where: { status: "NEXT" },
    orderBy: { serial: "asc" },
  });

  if (next) {
    return prisma.patient.update({
      where: { id: next.id },
      data: { status: "RUNNING" },
    });
  }

  const waiting = await prisma.patient.findFirst({
    where: { status: "WAITING" },
    orderBy: { serial: "asc" },
  });

  if (!waiting) return null;

  return prisma.patient.update({
    where: { id: waiting.id },
    data: { status: "RUNNING" },
  });
};

export const deletePatient = (id) => {
  return prisma.patient.delete({ where: { id } });
};
