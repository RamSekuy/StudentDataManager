"use server";
import Auth from "@/lib/auth/serverAuth.class";
import { prisma } from "@/lib/prisma";
import { gradeLimit } from "@/lib/prisma/studentAccessLimit";
import { revalidatePath } from "next/cache";

interface params {
  date: Date;
  students: string[];
  fouls: string[];
}

export default async function reportStudent({
  date,
  fouls,
  students,
}: params) {
  const token = await new Auth().getToken();
  const studentsData = await prisma.student.findMany({
    where: {
      id: { in: students },
      grade: token.isSuperAdmin ? undefined : { in: await gradeLimit() },
    },
  });
  if (studentsData.length !== students.length && !token.isSuperAdmin) {
    throw new Error("Not Allowed to access some students");
  }

 
   // Memfilter detail pelanggaran berdasarkan ID pelanggaran
  const foulDetails = await prisma.foulDetail.findMany({
    where: {
      foulId: { in: fouls },
    },
  });

  const data = fouls.flatMap((foulId) =>
    studentsData.map(async (student) => {
      // Menghitung jumlah pelanggaran siswa berdasarkan pelanggaran tertentu
      const violationCount = await prisma.reportedFoul.count({
        where: {
          studentId: student.id,
          foulDetail: {
            foulId: foulId,
          },
        },
      });

      // Mendapatkan detail pelanggaran terkait
      const relatedFoulDetails = foulDetails.filter(
        (detail) => detail.foulId === foulId
      );

      // Memilih detail pelanggaran berdasarkan jumlah pelanggaran
      const foulDetailId =
        relatedFoulDetails[
          Math.min(violationCount, relatedFoulDetails.length - 1)
        ]?.id;

      // Menambahkan deskripsi jika pelanggaran melebihi jumlah detail
      const description =
        violationCount >= relatedFoulDetails.length
          ? `Pelanggaran ke-${violationCount + 1}`
          : undefined;

      return {
        date,
        grade: student.grade,
        studentId: student.id,
        foulDetailId,
        description,
        createdById: token.data.id,
      };
    })
  );

  const resolvedData = await Promise.all(data);
  await prisma.reportedFoul.createMany({ data: resolvedData });
  revalidatePath("/student");
  revalidatePath("/report-student");
}