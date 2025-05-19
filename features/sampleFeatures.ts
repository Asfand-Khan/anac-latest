import { z } from "zod";

export const sampleSchema = z.object({
  barcode_no: z
    .string({ required_error: "Barcode number is required" })
    .trim()
    .min(3, { message: "Barcode number must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Barcode number must be alphanumeric" }),
  sample_date: z
    .string({ required_error: "Sample date is required" })
    .trim()
    .min(1, { message: "Sample date is required" }),
  intermediate_sample: z
    .boolean({ required_error: "Intermediate sample is required" }),
  total_mileage: z
    .string({ required_error: "Total mileage is required" })
    .trim()
    .min(1, { message: "Total milage must be at least 1 characters" }),
  mileage_unit: z
    .string({ required_error: "Mileage unit is required" })
    .trim()
    .min(3, { message: "Mileage unit must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Mileage unit must be alphanumeric" }),
  fluid_time: z
    .string({ required_error: "Fluid time is required" })
    .trim()
    .min(1, { message: "Fluid time is required" }),
  top_up: z
    .string({ required_error: "Top-up amount is required" })
    .trim()
    .min(1, { message: "Top-up must be at least 1 characters" }),
  top_up_unit: z
    .string({ required_error: "Top-up unit is required" })
    .trim()
    .min(3, { message: "Top-up unit must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Top-up unit must be alphanumeric" }),
  fluid_name: z
    .string({ required_error: "Fluid name is required" })
    .trim()
    .min(3, { message: "Fluid name must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Fluid name must be alphanumeric" }),
  fluid_make: z
    .string()
    .trim()
    .min(3, { message: "Fluid make must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  fluid_type: z
    .string()
    .trim()
    .min(3, { message: "Fluid type must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  fluid_grade: z
    .string()
    .trim()
    .min(3, { message: "Fluid grade must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  part_id: z
    .string({ required_error: "Part ID is required" })
    .trim(),
  machine_id: z
    .string({ required_error: "Machine ID is required" })
    .trim(),
});

export type Sample = z.infer<typeof sampleSchema>;