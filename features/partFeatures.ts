import { z } from "zod";

export const partSchema = z.object({
  analysis_type: z
    .string({ required_error: "Analysis type is required" })
    .trim()
    .min(3, { message: "Analysis type must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Analysis type must be alphanumeric" }),
  part_kind: z
    .string({ required_error: "Part kind is required" })
    .trim()
    .min(3, { message: "Part kind must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Part kind must be alphanumeric" }),
  part_make: z
    .string({ required_error: "Part make is required" })
    .trim()
    .min(3, { message: "Part make must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Part make must be alphanumeric" }),
  part_type: z
    .string({ required_error: "Part type is required" })
    .trim()
    .min(3, { message: "Part type must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Part type must be alphanumeric" }),
  bi_carbunation: z
    .boolean({ required_error: "Bi-carbunation is required" }),
  other_part_make: z
    .string()
    .trim()
    .min(3, { message: "Other part make must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  other_part_type: z
    .string()
    .trim()
    .min(3, { message: "Other part type must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  part_info: z
    .string()
    .trim()
    .min(3, { message: "Part info must be at least 3 characters" })
    .optional()
    .or(z.literal("")),
  part_id: z
    .string()
    .trim()
    .min(3, { message: "Part ID must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Part ID must be alphanumeric" })
    .optional()
    .or(z.literal("")),
  capacity_in_ltrs: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(0, { message: "Capacity must be non-negative" })
    .optional(),
  machine_id: z
    .string({ required_error: "Machine ID is required" })
    .trim()
});

export type Part = z.infer<typeof partSchema>;