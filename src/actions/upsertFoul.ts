"use server";
import { prisma } from "@/lib/prisma";

import { z } from "zod";
import emptyStringToUndefiendSchema from "@/lib/zod/emptyStringToUndefiend.schema";
import { foulCategory } from "@prisma/client";
import createFormAction from "./createFormAction";

const toFoulCategory = (grade: string) => {
  switch (grade.toLowerCase()) {
    case "low":
      return foulCategory.LOW;
    case "Medium":
      return foulCategory.MEDIUM;
    case "high":
      return foulCategory.HIGH;
    default:
      throw new Error("Invalid grade value");
  }
};

const upsertFoulAction = createFormAction({
  action: async (formData) => {
    const formSchema = z.object({
      id: emptyStringToUndefiendSchema,
      activity: z.string().min(2, "Minimum 2 Character"),
      grade: z.string().min(1).toUpperCase(),
      category: z.string().transform((v) => toFoulCategory(v)),
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

    const data = formSchema.parse(formData);

    await prisma.foul.upsert({
      where: { id: data.id || "-" },
      create: { ...data, id: undefined },
      update: data,
    });
  },
});
export default upsertFoulAction;
