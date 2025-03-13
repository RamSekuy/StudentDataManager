"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/dataTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRowSelectionStore } from "@/stores/rowSelectionStore";
import { Student } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export default function StudentTabContent({
  students,
}: {
  students: Student[];
}) {
  const studentGrouping = false;
  const tableName = "selectedStudents";
  const selectedRows = useRowSelectionStore((s) => s.selectedRows)[tableName];
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
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Checkbox id={row.original.id} checked={selectedRows?.has(row.id)} />
          <Label htmlFor={row.original.id}>{row.original.name}</Label>
        </div>
      ),
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
      filterFn: "weakEquals",
      accessorKey: "grade",
      cell: ({ row }) => (
        <p>
          {"kelas " +
            row.original.grade +
            (studentGrouping ? row.original.group : "")}
        </p>
      ),
    },
  ];
  return (
    <DataTable
      tableName={tableName}
      columns={studentsTableFormat}
      data={students}
      renderTop={(table) => (
        <div className="flex justify-center gap-4">
          <div className="flex items-center py-4">
            <Input
              placeholder="Name..."
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center py-4">
            <Input
              max={12}
              min={1}
              type="number"
              placeholder="Grade"
              onChange={(event) =>
                table.getColumn("grade")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
      )}
    />
  );
}
