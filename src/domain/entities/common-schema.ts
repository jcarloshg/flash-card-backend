import { z } from "zod";

/**
 * Common reusable Zod schemas for validation
 */
export const CommonSchema = {
    uuid: z
        .string("Should be a string")
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
            "Invalid UUID format"
        ),
    email: z
        .string("Should be a string")
        .regex(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    nonEmptyString: z
        .string("Should be a string")
        .min(1, "Field is required"),
    password: z
        .string("Should be a string")
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    createdAt: z
        .date("Should be a Date")
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "createdAt must be a valid Date",
        }),
    updatedAt: z
        .date("Should be a Date")
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "updatedAt must be a valid Date",
        }),
};
