"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/dataTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRowSelectionStore } from "@/stores/rowSelectionStore";
import { FoulActivity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export default function FoulTabContent({ fouls }: { fouls: FoulActivity[] }) {
  const tableName = "selectedFouls";
  const selectedFouls = useRowSelectionStore((s) => s.selectedRows)[tableName];
  const foulsTableFormat: ColumnDef<FoulActivity>[] = [
    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Checkbox checked={selectedFouls?.has(row.id)} />
          <Label htmlFor={tableName + row.id}>{row.original.activity}</Label>
        </div>
      ),
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
      tableName={tableName}
      data={fouls}
      columns={foulsTableFormat}
      renderTop={(table) => (
        <div className="flex justify-center gap-4">
          <div className="flex items-center py-4">
            <Input
              placeholder="Activity..."
              onChange={(event) =>
                table.getColumn("activity")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center py-4">
            <Input
              type="number"
              placeholder="Points"
              onChange={(event) =>
                table.getColumn("point")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
      )}
    />
  );
}
