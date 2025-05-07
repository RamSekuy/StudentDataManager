"use server";

import Auth from "@/lib/auth/serverAuth.class";
import { prisma } from "@/lib/prisma";
import { gradeLimit } from "@/lib/prisma/studentAccessLimit";
import { ReportedFoul } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function DeleteReportedFoul(
  reportedFoulID: ReportedFoul["id"]
) {
  const token = await new Auth().getToken();
  if(!token.isSuperAdmin) throw new Error("Unauthorized")
  const { studentId } = await prisma.reportedFoul.delete({
    where: { id: reportedFoulID,grade:{in:await gradeLimit()} },
    select: { studentId: true },
  });
  revalidatePath("/dashboard/student/" + studentId, "page");
}
