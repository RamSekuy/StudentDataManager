import { prisma } from "@/lib/prisma";
import ReportTabContent from "./reportTabContent";
import dynamic from "next/dynamic";

export async function StudenttContent() {
  const students = await prisma.student.findMany({
    where: { grade: { lte: 12 }, alumni: false },
  });
  const StudentTabContent = dynamic(() => import("./studentTabContent"));
  return <StudentTabContent students={students} />;
}

export async function FoulContent() {
  const FoulTabContent = dynamic(() => import("./foulTabContent"));
  return <FoulTabContent fouls={await prisma.foulActivity.findMany()} />;
}

export async function ReportContent() {
  return <ReportTabContent fouls={await prisma.foulActivity.findMany()} />;
}
