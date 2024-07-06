import { z } from "zod";

import { PATTERNS } from "@/constants";

export const schema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => PATTERNS.email.test(text), { message: "Email not valid" }),
});
