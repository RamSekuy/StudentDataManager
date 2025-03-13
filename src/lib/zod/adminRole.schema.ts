import { z } from "zod";

const adminRoleSchema = z.enum(["ADMIN", "SUPER-ADMIN"]);
export default adminRoleSchema;
