"use server";

import Auth from "@/lib/auth/serverAuth.class";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import createFormAction from "./createFormAction";

// Skema yang menerima string atau string[] dan selalu mengembalikan string[]
const schema = z.object({
  reportIDs: z
    .union([z.string(), z.string().array()])
    .transform((val) => (Array.isArray(val) ? val : [val])),
});

const confirmReportedFoulAction = createFormAction({
  action: async (data) => {
    const token = await new Auth().getToken();
    if (!token.isSuperAdmin) throw new Error("Not allowed");

    // Parsing data menggunakan schema
    const { reportIDs } = schema.parse(data);

    // Memastikan semua ID pelanggaran diperbarui
    await Promise.all(
      reportIDs.map(async (id) => {
        await prisma.reportedFoul.update({
          where: { id, confirmed: false },
          data: { confirmed: true },
        });
      })
    );

    // Revalidasi cache jika diperlukan
    revalidatePath("/student/*");
    revalidatePath("/report-student");
  },
});

export default confirmReportedFoulAction;
