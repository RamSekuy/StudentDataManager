import { StudentFull } from "@/app/type/prismaExtend.type";
import FillterDetail from "./fillterDetail";
import FoulTable from "./foulTable";

export default function StudentView({ student }: { student: StudentFull }) {
  const { name, grade, fouls } = student;
  console.log(fouls);
  return (
    <div className="w-full flex flex-col gap-5 my-5">
      <section className="w-full text-center">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="font-semibold">
          {grade} |{" "}
          {`Points : ${fouls.reduce((p, c) => p + c.activity.point, 0)}`}
        </p>
      </section>
      <section className="w-full p-4">
        <FillterDetail />
        <FoulTable fouls={fouls} />
      </section>
    </div>
  );
}
