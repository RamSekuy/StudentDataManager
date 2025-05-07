"use client";
import FillterDetail from "./fillterDetail";
import FoulTable from "./foulTable";
import { StudentWithFouls } from "@/type/prismaExtend.type";
type Props = { student: StudentWithFouls,isSuperAdmin?:boolean };

export default function StudentView({
  student,isSuperAdmin = false
}: Props) {
  const { name, grade,fouls } = student;
  
  return (
    <div className="w-full flex flex-col gap-5 my-5">
      <section className="w-full text-center">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="font-semibold">
          Grade: {grade} 
          {`Points : ${fouls.reduce((p, c) => p + c.foulDetail.foul.point, 0)}`}
        </p>
      </section>
      <section className="w-full p-4">
        <FillterDetail />
        <FoulTable fouls={student.fouls} isSuperAdmin={isSuperAdmin} />
      </section>
    </div>
  );
}
