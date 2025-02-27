"use client";

import FillterInput from "@/components/fillter/fillterInput";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/dataTable";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { Student } from "@prisma/client";

export default function StudentTable({ students }: { students: Student[] }) {
  const studentGrouping = false;
  const studentsTableFormat: ColumnDef<Student>[] = [
    {
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
          </button>
        );
      },
      accessorKey: "name",
    },
    {
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Grade
          </button>
        );
      },
      accessorKey: "grade",
      cell: ({ row }) => (
        <p>
          Kelas{" "}
          {row.original.grade + (studentGrouping ? row.original.group : "")}
        </p>
      ),
    },
    {
      header: () => <p className="text-end px-4">Details</p>,
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex justify-end px-4">
          <Link
            className="text-green-600 hover:bg-gray-200 hover:text-green-400 rounded-full"
            href={`/student/${row.original.id}`}
          >
            <Link2Icon size={36} className="px-2" />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <DataTable
      renderTop={() => (
        <div className="flex  flex-col md:flex-row gap-2 my-4 items-center justify-center">
          <FillterInput queryKey="name" placeholder="Search by name" />
          <FillterInput
            type="number"
            queryKey="grade"
            placeholder="Search by grade"
          />
          <Link href={"/foul"}>
            <Button variant="destructive">Tambah Pelanggaran</Button>
          </Link>
        </div>
      )}
      columns={studentsTableFormat}
      data={students}
    />
  );
}
