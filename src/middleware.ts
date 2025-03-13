import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jose";
import adminRoleSchema from "./lib/zod/adminRole.schema";

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value || "";

  async function checkToken(token: string) {
    try {
      return await verifyToken(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      cookieStore.delete("access");
    }
    return;
  }

  const payload = await checkToken(token);
  const { success } = adminRoleSchema.safeParse(payload?.role);

  if (!success && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (success && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
