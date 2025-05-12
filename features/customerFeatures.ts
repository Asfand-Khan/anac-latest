import { z } from "zod";

export const customerSchema = z.object({
  customer_code: z
    .string({ required_error: "Customer code is required" })
    .trim()
    .min(3, { message: "Customer code must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Customer code must be alphanumeric" }),
  customer_name: z
    .string({ required_error: "Customer name is required" })
    .trim()
    .min(3, { message: "Customer name must be at least 3 characters" })
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
  contact_no: z
    .string({ required_error: "Contact number is required" })
    .trim()
    .min(7, { message: "Contact number must be at least 7 digits" })
    .max(15, { message: "Contact number must be at most 15 digits" })
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Contact number must be a valid phone number",
    }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(5, { message: "Address must be at least 5 characters" }),
  contact_person: z
    .string()
    .trim()
    .min(3, { message: "Contact person must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
});

export type Customer = z.infer<typeof customerSchema>;
