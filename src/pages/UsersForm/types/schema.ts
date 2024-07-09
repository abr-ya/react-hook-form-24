import { z } from "zod";

import { PATTERNS } from "@/constants";

export const schema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => PATTERNS.email.test(text), { message: "Email not valid" }),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
});

export type SchemaType = z.infer<typeof schema>;

export const defaultValues: SchemaType = {
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
};
