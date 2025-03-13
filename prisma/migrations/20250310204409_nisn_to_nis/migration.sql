/*
  Warnings:

  - You are about to drop the column `nisn` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nis` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_nisn_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "nisn",
ADD COLUMN     "nis" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "userId" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("userId","grade","group")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
