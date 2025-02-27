-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "group" TEXT NOT NULL DEFAULT 'A',
    "sd" BOOLEAN NOT NULL DEFAULT false,
    "smp" BOOLEAN NOT NULL DEFAULT false,
    "sma" BOOLEAN NOT NULL DEFAULT false,
    "alumni" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentFoul" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentFoul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoulActivity" (
    "id" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "point" INTEGER NOT NULL,

    CONSTRAINT "FoulActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_key" ON "Student"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoulActivity_activity_key" ON "FoulActivity"("activity");

-- AddForeignKey
ALTER TABLE "StudentFoul" ADD CONSTRAINT "StudentFoul_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFoul" ADD CONSTRAINT "StudentFoul_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "FoulActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
