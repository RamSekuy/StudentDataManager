import { prisma } from "@/lib/prisma";
import FoulTable from "./_components/foulTable";

type Props = {
  searchParams: Promise<{ activity?: string; point?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { activity, point } = await searchParams;
  const foulActivities = await prisma.foulActivity.findMany({
    where: {
      activity: { contains: activity },
      point: Number(point) || undefined,
    },
  });
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold my-5 text-center">Fouls List</h1>
      <FoulTable foulActivites={foulActivities} />
    </div>
  );
}
