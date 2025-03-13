"use server";
import { z } from "zod";
import { ActionForm } from "./actionForm.class";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jose";
import { redirect } from "next/navigation";

const schema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

const adminLoginAction = new ActionForm("Success Login", async (formData) => {
  const data = Object.fromEntries(formData.entries());
  const { username, password } = schema.parse(data);
  const cookie = await cookies();

  if (username === "SuperAdmin" && password === "SuperAdminPassword") {
    const token = await generateToken("SUPER-ADMIN");
    cookie.set("access", token);
    new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
      redirect("/dashboard")
    );
  } else {
    throw new Error("Invalid Login Data");
  }
});

export default async function adminLogin(formData: FormData) {
  return await adminLoginAction.execute(formData);
}
