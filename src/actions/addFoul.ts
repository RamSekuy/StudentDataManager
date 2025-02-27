"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function addFoul(data: Prisma.FoulActivityCreateInput) {
  try {
    await prisma.foulActivity.create({ data });
    revalidatePath("/foul");
    revalidatePath("/report-student");
  } catch (error) {
    if (error instanceof Error) return error;
  }
}
