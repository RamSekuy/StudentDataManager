import { prisma } from "@/lib/prisma";
import StudentView from "@/components/studentView/studentView";
import Center from "@/components/utils/center";
import { gradeLimit } from "@/lib/prisma/studentAccessLimit";
import ServerAuth from "@/lib/auth/serverAuth.class";
import { StudentWithFouls } from "@/type/prismaExtend.type";

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
        select: {
          id: true,
          date: true,
          confirmed: true,
          foulDetail: {include: { foul: true } },
        },
        orderBy: { date: order },
        where: {
          date: {
            gte: !after ? undefined : new Date(Number(after)),
            lte: !before ? undefined : new Date(Number(before)),
          },
        },
      },
    },
  }) as StudentWithFouls;

  if (student) {
    const access = await gradeLimit();
    const token = await new ServerAuth().getToken();

    if (access && access.includes(student.grade) || token.isSuperAdmin) {
      return <StudentView student={student} isSuperAdmin={token.isSuperAdmin} />;
    }

    return (
      <Center>
        <h1 className="text-4xl">Not allowed to access data</h1>
      </Center>
    );
  }

  return (
    <Center>
      <h1 className="text-4xl">Student Not Found</h1>
    </Center>
  );
}
