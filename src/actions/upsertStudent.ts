"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import Auth from "@/lib/auth/serverAuth.class";
import createFormAction from "./createFormAction";

const upsertStudentAction = createFormAction({
  action: async (formData) => {
    const schema = z.object({
      id: z
        .string()
        .optional()
        .transform((val) => (val?.trim() === "" ? undefined : val)),
      name: z.string(),
      nis: z.string(),
      grade: z.string().transform(Number),
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
    const token = await new Auth().getToken();
    if (!token.isSuperAdmin)
      if (!student.id) {
        const access = token.gradeAccess;
        if (Array.isArray(access)) {
          if (!access.includes(student.grade.toString()))
            throw new Error(`[Not Allowed]: no access for grade ${access}`);
        }
        delete student.id;
      }

    await prisma.student.upsert({
      where: { id: student.id, nis: student.nis },
      update: student,
      create: student,
    });
    return {};
  },
});

export default upsertStudentAction;
