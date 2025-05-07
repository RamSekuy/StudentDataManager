-- CreateEnum
CREATE TYPE "foulCategory" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "sd" BOOLEAN NOT NULL DEFAULT false,
    "smp" BOOLEAN NOT NULL DEFAULT false,
    "sma" BOOLEAN NOT NULL DEFAULT false,
    "alumni" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "out" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportedFoul" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "foulDetailId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT NOW(),

    CONSTRAINT "ReportedFoul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foul" (
    "id" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "point" INTEGER NOT NULL,
    "confirm" BOOLEAN NOT NULL DEFAULT false,
    "grade" TEXT NOT NULL,
    "category" "foulCategory" NOT NULL,

    CONSTRAINT "Foul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoulDetail" (
    "id" TEXT NOT NULL,
    "foulId" TEXT NOT NULL,
    "counsellor" TEXT NOT NULL,
    "punishment" TEXT NOT NULL,
    "isOption" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FoulDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_key" ON "Student"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Foul_activity_key" ON "Foul"("activity");

-- AddForeignKey
ALTER TABLE "ReportedFoul" ADD CONSTRAINT "ReportedFoul_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportedFoul" ADD CONSTRAINT "ReportedFoul_foulDetailId_fkey" FOREIGN KEY ("foulDetailId") REFERENCES "FoulDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoulDetail" ADD CONSTRAINT "FoulDetail_foulId_fkey" FOREIGN KEY ("foulId") REFERENCES "Foul"("id") ON DELETE CASCADE ON UPDATE CASCADE;
