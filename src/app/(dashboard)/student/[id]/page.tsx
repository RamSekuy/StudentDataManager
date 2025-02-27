import { prisma } from "@/lib/prisma";
import StudentView from "@/components/studentView/studentView";
import { StudentFull } from "@/app/type/prismaExtend.type";

type PageProps = {
  searchParams: Promise<{
    before: string;
    after: string;
    order: "desc" | "asc";
  }>;
  params: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams, params }: PageProps) {
  const { before, after, order } = await searchParams;
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      fouls: {
        include: { activity: true },
        orderBy: { date: order },
        where: { date: { gte: after, lte: before } },
      },
    },
  });
  if (!student) throw new Error("Student Data Not Found");
  return <StudentView student={student as StudentFull} />;
}
