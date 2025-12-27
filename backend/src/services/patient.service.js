import prisma from "../prisma.js";

const BASE_TIME = "10:00";

// helper → add 15 min
const addMinutes = (time, minutes) => {
  const [h, m] = time.split(":").map(Number);
  const date = new Date(1970, 0, 1, h, m);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toTimeString().slice(0, 5);
};

/**
 * Admin view
 */
export const getAllPatients = () => {
  return prisma.patient.findMany({
    orderBy: { serial: "asc" },
  });
};

/**
 * Create patient (TIME IS FIXED HERE)
 */
export const createPatient = async (name, type) => {
  const last = await prisma.patient.findFirst({
    orderBy: { serial: "desc" },
  });

  const serial = last ? last.serial + 1 : 101;

  // find last REGULAR with time
  const lastTimed = await prisma.patient.findFirst({
    where: {
      scheduledTime: { not: null },
      type: "REGULAR",
    },
    orderBy: { serial: "desc" },
  });

  let scheduledTime = null;

  if (type === "REGULAR") {
    scheduledTime = lastTimed
      ? addMinutes(lastTimed.scheduledTime, 15)
      : BASE_TIME;
  }

  const active = await prisma.patient.findFirst({
    where: { status: { in: ["NEXT", "RUNNING"] } },
  });

  return prisma.patient.create({
    data: {
      name,
      serial,
      type,
      status: active ? "WAITING" : "NEXT",
      scheduledTime,
    },
  });
};

/**
 * FIFO — TIME NEVER CHANGES
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

  // WAITING → NEXT
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
 * Delete
 */
export const deletePatient = (id) => {
  return prisma.patient.delete({ where: { id } });
};
