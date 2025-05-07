import { prisma } from "@/lib/prisma";
import StudentView from "@/components/studentView/studentView";

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
  const { nis } = await params;
  const student = await prisma.student.findUnique({
    where: { nis },
    include: {
      fouls: {
        include: { foulDetail: { include: { foul: true } } },
        orderBy: { date: order },
        where: {
          date: {
            gte: after ? new Date(after) : undefined,
            lte: before ? new Date(before) : undefined,
          },
        },
      },
    },
  });

  if (!student) throw new Error("Student Data Not Found");
  return <StudentView student={student} />;
}
