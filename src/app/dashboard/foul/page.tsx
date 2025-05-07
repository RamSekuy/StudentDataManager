import { prisma } from "@/lib/prisma";
import FoulTable from "./_components/foulTable";

type Props = {
  searchParams: Promise<{ activity?: string; point?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { activity, point } = await searchParams;
  const fouls = await prisma.foul.findMany({
    where: {
      activity: { contains: activity },
      point: Number(point) || undefined,
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center my-5 px-5">
      <h1 className="text-4xl font-bold my-5 text-center">Fouls List</h1>
      <FoulTable foulActivites={fouls} />
    </div>
  );
}
