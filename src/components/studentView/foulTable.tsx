"use client";

import { DataTable } from "@/components/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { StudentWithFouls } from "@/type/prismaExtend.type";
import { Dialog, DialogClose, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import FormAction from "../form/formAction";
import verifyReportedFoul from "@/actions/confirmReportedFoul";
import { Input } from "../ui/input";

type Props = { fouls: StudentWithFouls["fouls"]; isSuperAdmin?: boolean };

export default function FoulTable({ fouls, isSuperAdmin = false }: Props) {
  const studentsTableFormat: ColumnDef<StudentWithFouls["fouls"][number]>[] = [
    {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Activity
        </button>
      ),
      accessorKey: "foulDetail.foul.activity",
      cell: ({ row }) => (
        <p className="text-left">{row.original.foulDetail.foul.activity}</p>
      ),
    },
    {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold text-center"
        >
          Date
        </button>
      ),
      accessorKey: "date",
      cell: ({ row }) => (
        <p className="text-center">
          {new Date(row.original.date).toLocaleDateString()}
        </p>
      ),
    },
    {
      header: () => <p className="font-semibold text-center">Points</p>,
      accessorKey: "foulDetail.foul.point",
      cell: ({ row }) => (
        <p className="text-center">{row.original.foulDetail.foul.point}</p>
      ),
    },
    {
      header: () => <p className="font-semibold text-center">Confirmed</p>,
      accessorKey: "id",
      cell: ({ row }) => {
        if (row.original.confirmed) {
          return <p className="text-center text-green-600">Confirmed</p>;
        } else {
          if (isSuperAdmin) {
            return <VerifyFoulDialog foulId={row.original.id} />;
          } else {
            return <p className="text-center text-red-600">Unconfirmed</p>;
          }
        }
      },
    },
  ];

  return (
    <div className="relative">
      <DataTable columns={studentsTableFormat} data={fouls} />
    </div>
  );
}

function VerifyFoulDialog({ foulId }: { foulId: string }) {
  return (
    <Dialog>
      <div className="flex justify-center">
        <DialogTrigger asChild>
          <Button>Confirm</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-[#eaeaea] border-black border-2 p-4 shadow-lg shadow-black/50">
        <DialogTitle className="text-center my-4">
          Are you sure you want to confirm this foul?
        </DialogTitle>
        <FormAction
          action={verifyReportedFoul}
          className="flex gap-4 justify-center"
        >
          <Input name="reportIDs" className="hidden" value={foulId} />
          <Button type="submit" variant="destructive">
            Yes
          </Button>
          <DialogClose asChild>
            <Button variant="default">No</Button>
          </DialogClose>
        </FormAction>
      </DialogContent>
    </Dialog>
  );
}
