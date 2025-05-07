import { z } from "zod";

const adminCookieSchema = z
  .object({
    accessLevel: z.array(z.string()).min(1),
    id: z.string(),
    name: z.string(),
  })

export default adminCookieSchema;
