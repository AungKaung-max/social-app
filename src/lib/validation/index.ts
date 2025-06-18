import * as z from "zod";

export const SignUpValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must not exceed 50 characters"),
    username: z.string().min(2, "Username must be at least 2 characters long").max(50, "Username must not exceed 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8,"Password must be at least 8 characters.")
})

