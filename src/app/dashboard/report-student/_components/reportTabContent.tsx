"use client";
import addStudentFoul from "@/actions/addStudentFoul";
import { DatePicker } from "@/components/input/datePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRowSelectionStore } from "@/stores/rowSelectionStore";
import { FoulActivity } from "@prisma/client";

import { useState } from "react";
export default function ReportTabContent({
  fouls: allFouls,
}: {
  fouls: FoulActivity[];
}) {
  const store = useRowSelectionStore((s) => s);
  const students = store.selectedRows["selectedStudents"];
  const fouls = store.selectedRows["selectedFouls"];
  const clear = store.clear;

  const points = allFouls.reduce((a, b) => {
    return fouls?.has(b.id) ? a + b.point : a;
  }, 0);
  const dateState = useState(new Date());
  const disabled = !Boolean(students?.size) || !Boolean(fouls?.size);
  return (
    <Card className="flex flex-col text-center justify-center items-center py-8 px-12 w-max mx-auto">
      <p>Total Students : {students?.size || 0}</p>
      <p>Total Fouls : {fouls?.size || 0}</p>
      <p>Total Points : {points}</p>

      <DatePicker dateState={dateState} className="my-4" />
      <Button
        className={`${
          disabled ? "" : "bg-green-500 hover:bg-green"
        }-700 max-w-max px-4`}
        size={"lg"}
        disabled={disabled}
        onClick={() =>
          addStudentFoul({
            fouls: Array.from(fouls),
            students: Array.from(students),
            date: dateState[0],
          })
            .then(() => {
              alert("berhasil ditambahkan");
              clear("selectedStudents");
              clear("selectedFouls");
            })
            .catch((e) => alert(e.message || "error"))
        }
      >
        Add Report
      </Button>
    </Card>
  );
}
