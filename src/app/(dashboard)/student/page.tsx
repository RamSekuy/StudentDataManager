import StudentTable from "../../../components/studentView/studentsTable";
import { prisma } from "@/lib/prisma";
type Prop = {
  searchParams: Promise<{ name?: string; grade?: string }>;
};

export default async function Page({ searchParams }: Prop) {
  const { name, grade } = await searchParams;
  const students = await prisma.student.findMany({
    where: {
      name: { contains: name },
      grade: grade ? Number(grade) : undefined,
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center my-5 px-5">
      <h1 className="text-4xl font-bold my-5">Daftar SISWA</h1>
      <StudentTable students={students} />
    </div>
  );
}
