import adminLogin from "@/actions/adminLogin";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import FormAction from "./formAction";

export default function AdminForm() {
  return (
    <FormAction action={adminLogin}>
      <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-2">
        <tbody>
          <tr>
            <th>Username</th>
            <th>
              <Input name="username" />
            </th>
          </tr>
          <tr>
            <th>Password</th>
            <th>
              <Input name="password" />
            </th>
          </tr>
        </tbody>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </table>
    </FormAction>
  );
}
