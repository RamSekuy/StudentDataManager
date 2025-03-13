import { Student } from "@prisma/client";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import upsertStudent from "@/actions/upsertStudent";
import EachUtils from "../utils/eachUtils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import FormAction from "./formAction";

type StudentFormProps = {
  student?: Student;
  alumniOption?: boolean;
};

export default function StudentForm({
  student = {} as Student,
  alumniOption = true,
}: StudentFormProps) {
  const { id, name, grade, group, nis } = student;
  return (
    <Card className="p-4 md:p-8 w-max">
      <FormAction action={upsertStudent}>
        <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-2">
          <tbody className="*:*:text-start">
            <IDInput v={id} />
            <NameInput v={name} />
            <NISInput v={nis} />
            <GradeInput grade={grade} group={group} />
            <StageInput alumniOption={alumniOption} {...student} />
          </tbody>
        </table>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </FormAction>
    </Card>
  );
}

function IDInput({ v }: { v?: string }) {
  return (
    <tr className="hidden">
      <th>id</th>
      <th>
        <Input name="id" value={v} readOnly />
      </th>
    </tr>
  );
}

function NameInput({ v }: { v?: string }) {
  return (
    <tr>
      <th>Name</th>
      <th>
        <Input name="name" required defaultValue={v} />
      </th>
    </tr>
  );
}

function NISInput({ v }: { v?: string }) {
  return (
    <tr>
      <th>NIS</th>
      <th>
        <Input name="nis" required defaultValue={v} />
      </th>
    </tr>
  );
}

function GradeInput({
  grade,
  group = "A",
}: {
  grade?: number;
  group?: string;
}) {
  return (
    <tr>
      <th>Grade</th>
      <th>
        <div className="flex *:w-20 justify-evenly">
          <Input
            min={1}
            max={12}
            name="grade"
            type="number"
            placeholder="(1-12)"
            required
            defaultValue={grade}
          />
          <Input name="group" defaultValue={group} required />
        </div>
      </th>
    </tr>
  );
}

function StageInput({
  alumniOption,
  sd,
  smp,
  sma,
  alumni,
}: {
  alumniOption: boolean;
  sd?: boolean;
  smp?: boolean;
  sma?: boolean;
  alumni?: boolean;
}) {
  const stage = ["sd", "smp", "sma", ...(alumniOption ? ["alumni"] : [])];
  const defaultValue = {
    sd,
    smp,
    sma,
    alumni,
  };
  return (
    <tr>
      <td colSpan={2}>
        <div className="flex justify-evenly">
          <EachUtils
            of={stage}
            render={(e) => (
              <Label
                key={e}
                htmlFor={e}
                className="flex font-semibold items-center gap-2"
              >
                <p>{e.toUpperCase()}</p>
                <Input
                  name={e}
                  type="checkbox"
                  defaultChecked={defaultValue[e as keyof typeof defaultValue]}
                />
              </Label>
            )}
          />
        </div>
      </td>
    </tr>
  );
}
