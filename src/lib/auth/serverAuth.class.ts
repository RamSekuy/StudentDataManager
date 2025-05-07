import { cookies } from "next/headers";
import AuthToken from "./authToken.class";

export default class ServerAuth {
  async getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;
    if (!token) throw new Error("Authentication token not found");
    return AuthToken.create(token)
  }
}

