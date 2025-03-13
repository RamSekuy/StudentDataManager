"use client";
import FillterInput from "@/components/fillter/fillterInput";
import { DataTable } from "@/components/ui/dataTable";
import { FoulActivity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export default function FoulTable({
  foulActivites,
}: {
  foulActivites: FoulActivity[];
}) {
  const foulsTableFormat: ColumnDef<FoulActivity>[] = [
    {
      accessorKey: "activity",
      header: "Activity",
    },
    {
      accessorKey: "point",
      filterFn: "weakEquals",
      header: "Points",
      cell: ({ row }) => <p>{row.original.point}</p>,
    },
  ];
  return (
    <DataTable
      renderTop={() => (
        <div className="flex  flex-col md:flex-row gap-2 my-4 items-center justify-center">
          <FillterInput queryKey="activity" placeholder="Activity..." />
          <FillterInput type="number" queryKey="point" placeholder="Point..." />
        </div>
      )}
      columns={foulsTableFormat}
      data={foulActivites}
    />
  );
}
