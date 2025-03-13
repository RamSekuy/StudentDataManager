"use server";
import { prisma } from "@/lib/prisma";

import { z } from "zod";
import { ActionForm } from "./actionForm.class";
import emptyStringToUndefiendSchema from "@/lib/zod/emptyStringToUndefiend.schema";

const upsertFoulAction = new ActionForm("Success", async (formData) => {
  const formSchema = z.object({
    id: emptyStringToUndefiendSchema,
    activity: z.string().min(2, "Minimum 2 Character"),
    point: z.coerce
      .number({ message: "Invalid Number" })
      .min(0, "Minimum 0")
      .int("Invalid Integer"),
    description: z
      .string()
      .max(255, "Maximum 255 character")
      .optional()
      .transform((v) => emptyStringToUndefiendSchema.parse(v)),
  });

  const data = formSchema.parse(Object.fromEntries(formData.entries()));

  await prisma.foulActivity.upsert({
    where: { id: data.id || "" },
    create: data,
    update: data,
  });
});

export default async function upsertFoul(form: FormData) {
  return await upsertFoulAction.execute(form);
}
