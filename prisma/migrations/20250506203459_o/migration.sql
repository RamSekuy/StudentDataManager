/*
  Warnings:

  - Added the required column `createdById` to the `ReportedFoul` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "accessLevel" AS ENUM ('StudentClass_1', 'StudentClass_2', 'StudentClass_3', 'StudentClass_4', 'StudentClass_5', 'StudentClass_7', 'StudentClass_8', 'StudentClass_9', 'StudentClass_10', 'StudentClass_11', 'StudentClass_12', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "ReportedFoul" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "date" SET DEFAULT NOW();

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "accessLevel" "accessLevel"[],

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- AddForeignKey
ALTER TABLE "ReportedFoul" ADD CONSTRAINT "ReportedFoul_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
