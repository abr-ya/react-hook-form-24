import { z } from "zod";

import { PATTERNS } from "@/constants";

export const schema = z
  .intersection(
    // common part
    z.object({
      name: z.string().min(1),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((text) => PATTERNS.email.test(text), { message: "Email not valid" }),
      states: z.array(z.string()).min(1).max(2),
      languagesSpoken: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2),
      registerDateAndTime: z.date(),
      employmentPeriod: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).max(2),
      isTeacher: z.boolean(),
    }),
    z.discriminatedUnion("variant", [
      // the same for create
      z.object({ variant: z.literal("create") }),
      // additional field for edit
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ]),
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),

        students: z.array(
          z.object({
            name: z.string().min(4),
          }),
        ),
      }),
    ]),
  );

export type SchemaType = z.infer<typeof schema>;

export const defaultValues: SchemaType = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registerDateAndTime: new Date(),
  employmentPeriod: [new Date(), new Date()],
  salaryRange: [1000, 2000],
  isTeacher: false,
};
