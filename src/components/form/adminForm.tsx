"use client";

import FormAction from "./formAction";
import adminLogin from "@/actions/adminLogin";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AdminForm() {
  const router = useRouter();

  return (
    <FormAction
      action={adminLogin}
      onSuccess={() => router.push("/dashboard/student")}
    >
      <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-2">
        <tbody>
          <tr>
            <th>Email</th>
            <td>
              <Input name="email" />
            </td>
          </tr>
          <tr>
            <th>Password</th>
            <td>
              <Input name="password" type="password"/>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Button type="submit">Submit</Button>
      </div>
    </FormAction>
  );
}