import { z } from "zod";
import { verifyToken } from "../jose";
import adminCookieSchema from "../zod/adminCookieSchema";

export default class AuthToken {
  private _token: string;
  private _data: z.infer<typeof adminCookieSchema>;

  constructor(token: string, data: z.infer<typeof adminCookieSchema>) {
    this._token = token;
    this._data = data;
  }

  get token(): string {
    return this._token;
  }

  get data(): z.infer<typeof adminCookieSchema> {
    return this._data;
  }

  get isSuperAdmin(): boolean {
    return this._data.accessLevel.includes("SUPER_ADMIN");
  }

  get gradeAccess(): string[] {
    return this._data.accessLevel
      .map((access) => {
        const tmp = access.split("_");
        if (Number.isInteger(Number(tmp[1]))) return tmp[1];
        else return null;
      })
      .filter((item) => item !== null) as string[];
  }

  static async create(token: string): Promise<AuthToken> {
    const data = adminCookieSchema.parse(await verifyToken(token));
    return new AuthToken(token, data);
  }
}