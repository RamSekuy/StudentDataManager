// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "./lib/jose";
// import adminRoleSchema from "./lib/zod/adminCookieSchema";
// import { prisma } from "./lib/prisma";

// export const config = {
//   matcher: ["/", "/dashboard/:path*"],
// };

// export async function middleware(request: NextRequest) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("access")?.value || "";
//   console.log(request.nextUrl.toString().split("/"));
//   async function checkToken(token: string) {
//     try {
//       return await verifyToken(token);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (_) {
//       cookieStore.delete("access");
//     }
//     return;
//   }

//   const payload = await checkToken(token);
//   const { success, data, error } = adminRoleSchema.safeParse(payload);
//   console.log(error);
//   if (!success && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (success) {
//     if (request.nextUrl.pathname === "/")
//       return NextResponse.redirect(new URL("/dashboard/student", request.url));
//     if (
//       request.nextUrl.pathname.startsWith("/student/") &&
//       data.tag === "ADMIN"
//     ) {
//       const url = request.nextUrl.toString().split("/");
//       const id = url[url.length - 1];
//       const s = await prisma.student.findUnique({
//         where: { id },
//         select: { grade: true, group: true },
//       });
//       if (!(s?.grade == data.grade && s.group == data.group))
//         throw new Error("Not Authorized");
//     }
//   }

//   return NextResponse.next();
// }
