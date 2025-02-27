"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface params {
  date: Date;
  students: string[];
  fouls: string[];
}

export default async function addStudentFoul({
  date,
  fouls,
  students,
}: params) {
  try {
    const data = fouls.flatMap((activityId) =>
      students.map((studentId) => ({
        date,
        activityId,
        studentId,
      }))
    );
    await prisma.studentFoul.createMany({
      data,
    });
    revalidatePath("/student");
    revalidatePath("/report-student");
  } catch (e) {
    if (e instanceof Error) return e.message;
  }
}
