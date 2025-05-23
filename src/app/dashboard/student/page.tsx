import StudentTable from "@/components/studentView/studentsTable";
import ServerAuth from "@/lib/auth/serverAuth.class";
import { prisma } from "@/lib/prisma";
import { gradeLimit } from "@/lib/prisma/studentAccessLimit";
type Props = {
  searchParams: Promise<{ name?: string; grade?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { name, grade } = await searchParams;
  
  const token = await new ServerAuth().getToken();
  const students = await prisma.student.findMany({
    where: {
      name: { contains: name },
     grade:{
      equals: grade ? Number(grade) : undefined,
      ...token.isSuperAdmin?{}:{in: await gradeLimit()}
    }
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center my-5 px-5">
      <h1 className="text-4xl font-bold my-5">Student List</h1>
      <StudentTable students={students} />
    </div>
  );
}
