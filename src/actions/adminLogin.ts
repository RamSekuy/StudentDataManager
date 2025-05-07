"use server";
import { z } from "zod";
import createFormAction from "./createFormAction";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jose";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const adminLoginAction = createFormAction({
  action: async (data) => {
    try {
      const { email, password } = schema.parse(data);
      const cookie = await cookies();

      const adminData = await prisma.admin.findUnique({
        where: { email },
        select: {
          id: true,
          password: true,
          accessLevel: true,
          name: true,
        },
      });
      if (!adminData) throw new Error("Admin not found");
      if (adminData.password !== password) throw new Error("Invalid password");

      const token = await generateToken(adminData);
      cookie.set("auth", token);
    } catch (e) {
      let msg = "ERROR";
      if (e instanceof Error) msg = e.message;
      return { error: msg };
    }
  },
});
export default adminLoginAction;
