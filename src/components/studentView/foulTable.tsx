"use client";
import { StudentFoulFull } from "@/app/type/prismaExtend.type";
import { DataTable } from "@/components/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";

const studentsTableFormat: ColumnDef<StudentFoulFull>[] = [
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
        </button>
      );
    },
    accessorKey: "activity",
    cell: ({ row }) => <p>{row.original.activity.activity}</p>,
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
        </button>
      );
    },
    accessorKey: "date",
    cell: ({ row }) => <p>{row.original.date.toLocaleDateString()}</p>,
  },
  {
    header: "Points",
    accessorKey: "points",
    cell: ({ row }) => <p>{row.original.activity.point}</p>,
  },
];

export default function FoulTable({ fouls }: { fouls: StudentFoulFull[] }) {
  return <DataTable columns={studentsTableFormat} data={fouls} />;
}
