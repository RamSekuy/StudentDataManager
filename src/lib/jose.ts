import { JWT_KEY } from "@/config/config";
import { jwtVerify, SignJWT } from "jose";
import adminRoLeSchema from "./zod/adminCookieSchema";
import { z } from "zod";

export async function generateToken(payload: z.infer<typeof adminRoLeSchema>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(JWT_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_KEY, {
      algorithms: ["HS256"],
      typ: "JWT",
    });
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    throw new Error("[Invalid Token]");
  }
}
