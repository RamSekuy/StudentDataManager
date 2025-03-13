import { z } from "zod";

export default z
  .string()
  .optional()
  .transform((val) => (val?.trim() === "" ? undefined : val));
