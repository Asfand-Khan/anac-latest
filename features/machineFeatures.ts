import { z } from "zod";

export const machineSchema = z.object({
  machine_kind: z
    .string({ required_error: "Machine kind is required" })
    .trim()
    .min(3, { message: "Machine kind must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Machine kind must be alphanumeric",
    }),
  machine_make: z
    .string({ required_error: "Machine make is required" })
    .trim()
    .min(3, { message: "Machine make must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Machine make must be alphanumeric",
    }),
  machine_type: z
    .string({ required_error: "Machine type is required" })
    .trim()
    .min(3, { message: "Machine type must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Machine type must be alphanumeric",
    }),
  other_machine_make: z
    .string()
    .trim()
    .min(3, { message: "Other machine make must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  other_machine_type: z
    .string()
    .trim()
    .min(3, { message: "Other machine type must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_info1: z
    .string()
    .trim()
    .min(3, { message: "Machine info1 must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_info2: z
    .string()
    .trim()
    .min(3, { message: "Machine info2 must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  machine_id: z
    .string()
    .trim()
    .min(3, { message: "Machine ID must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Machine ID must be alphanumeric" })
    .optional()
    .or(z.literal("")),
  unit_id: z.string({ required_error: "Unit ID is required" }).trim(),
  customer_id: z.string({ required_error: "Customer ID is required" }).trim(),
});

export type Machine = z.infer<typeof machineSchema>;
