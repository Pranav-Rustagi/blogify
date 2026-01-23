import { z } from "zod";

const signUpSchema = z.object({
    email: z
        .email("Invalid email address"),

    name: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const signInSchema = z.object({
    email: z
        .email("Invalid email address"),
    
    password: z
        .string()
        .min(1, "Password is required"),
});

export {
    signUpSchema,
    signInSchema
}