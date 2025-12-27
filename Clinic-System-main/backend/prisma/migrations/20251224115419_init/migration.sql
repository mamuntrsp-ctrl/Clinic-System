-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
