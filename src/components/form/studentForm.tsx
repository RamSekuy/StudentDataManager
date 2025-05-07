import { Student } from "@prisma/client";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import upsertStudent from "@/actions/upsertStudent";
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
  const { id, name, grade, nis, sd, smp, sma, alumni } = student;

  return (
    <Card className="p-6 md:p-10 w-max">
      <FormAction action={upsertStudent}>
        <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-2">
          <tbody>
            <HiddenIDInput id={id} />
            <TextInput label="Name" name="name" value={name} required />
            <TextInput label="NIS" name="nis" value={nis} required />
            <NumberInput
              label="Grade"
              name="grade"
              value={grade}
              min={1}
              max={12}
              placeholder="(1-12)"
              required
            />
            <StageInput
              alumniOption={alumniOption}
              stages={{ sd, smp, sma, alumni }}
            />
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <Button type="submit">Submit</Button>
        </div>
      </FormAction>
    </Card>
  );
}

function HiddenIDInput({ id }: { id?: string }) {
  return (
    <tr className="hidden">
      <td>
        <Input name="id" value={id} readOnly />
      </td>
    </tr>
  );
}

function TextInput({
  label,
  name,
  value,
  required = false,
}: {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
}) {
  return (
    <tr>
      <th className="text-left">{label}</th>
      <td>
        <Input name={name} defaultValue={value} required={required} />
      </td>
    </tr>
  );
}

function NumberInput({
  label,
  name,
  value,
  min,
  max,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <tr>
      <th className="text-left">{label}</th>
      <td>
        <Input
          name={name}
          type="number"
          defaultValue={value}
          min={min}
          max={max}
          placeholder={placeholder}
          required={required}
        />
      </td>
    </tr>
  );
}

function StageInput({
  alumniOption,
  stages,
}: {
  alumniOption: boolean;
  stages: { sd?: boolean; smp?: boolean; sma?: boolean; alumni?: boolean };
}) {
  const stageKeys = ["sd", "smp", "sma", ...(alumniOption ? ["alumni"] : [])];

  return (
    <tr>
      <td colSpan={2}>
        <div className="flex justify-evenly">
          {stageKeys.map((stage) => (
            <Label
              key={stage}
              htmlFor={stage}
              className="flex items-center gap-2"
            >
              <p>{stage.toUpperCase()}</p>
              <Input
                name={stage}
                type="checkbox"
                defaultChecked={stages[stage as keyof typeof stages]}
              />
            </Label>
          ))}
        </div>
      </td>
    </tr>
  );
}