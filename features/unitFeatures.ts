import { z } from "zod";

export const unitSchema = z.object({
  unit_code: z
    .string({ required_error: "Unit code is required" })
    .trim()
    .min(3, { message: "Unit code must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Unit code must be alphanumeric" }),
  unit_name: z
    .string({ required_error: "Unit name is required" })
    .trim()
    .min(3, { message: "Unit name must be at least 3 characters" })
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
  unit_contact: z
    .string({ required_error: "Unit contact number is required" })
    .trim()
    .min(7, { message: "Unit contact number must be at least 7 digits" })
    .max(15, { message: "Unit contact number must be at most 15 digits" })
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Unit contact number must be a valid phone number",
    }),
  unit_address: z
    .string()
    .trim()
    .min(5, { message: "Unit address must be at least 5 characters" })
    .optional()
    .or(z.literal("")),
  unit_contact_person: z
    .string()
    .trim()
    .min(3, { message: "Unit contact person must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  customer_id: z
    .string({ required_error: "Customer ID is required" })
    .trim(),
});

export type Unit = z.infer<typeof unitSchema>;