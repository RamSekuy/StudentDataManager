import { Input } from "../ui/input";
import FormAction from "./formAction";
import upsertFoul from "@/actions/upsertFoul";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Foul } from "@prisma/client";

type Props = {
  foulActivity?: Foul;
};

export default function FoulForm({ foulActivity }: Props) {
  return (
    <Card className="p-4 md:p-8 w-max">
      <FormAction action={upsertFoul}>
        <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-2">
          <tbody>
            <tr className="hidden">
              <th>id</th>
              <th>
                <Input name="id" value={foulActivity?.id} readOnly />
              </th>
            </tr>
            <tr>
              <th>Activity</th>
              <th>
                <Input
                  name="activity"
                  defaultValue={foulActivity?.activity}
                  required
                />
              </th>
            </tr>
            <tr>
              <th>Point</th>
              <th>
                <Input
                  name="point"
                  defaultValue={foulActivity?.point}
                  required
                />
              </th>
            </tr>
            <tr>
              <th>Description</th>
              <th>
                <Textarea
                  name="desctiption"
                  defaultValue={foulActivity?.description || ""}
                />
              </th>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </FormAction>
    </Card>
  );
}
