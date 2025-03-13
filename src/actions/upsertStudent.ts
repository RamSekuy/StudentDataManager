"use server";
import { z } from "zod";
import { ActionForm } from "./actionForm.class";
import { prisma } from "@/lib/prisma";

const action = new ActionForm("success", async (form: FormData) => {
  const formData = Object.fromEntries(form.entries());

  const schema = z.object({
    id: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val)),
    name: z.string(),
    nis: z.string(),
    grade: z.string().transform(Number),
    group: z.string(),
    sd: z
      .string()
      .optional()
      .transform((val) => val === "on"),
    smp: z
      .string()
      .optional()
      .transform((val) => val === "on"),
    sma: z
      .string()
      .optional()
      .transform((val) => val === "on"),
    alumni: z
      .string()
      .optional()
      .transform((val) => val === "on"),
  });

  const student = schema.parse(formData);
  await prisma.student.upsert({
    where: { id: student.id || "" },
    create: student,
    update: student,
  });
  return {};
});

export default async function upsertStudent(form: FormData) {
  return await action.execute(form);
}
