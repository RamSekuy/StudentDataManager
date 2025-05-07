/*
  Warnings:

  - You are about to drop the column `confirm` on the `Foul` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Foul" DROP COLUMN "confirm";

-- AlterTable
ALTER TABLE "ReportedFoul" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "date" SET DEFAULT NOW();
