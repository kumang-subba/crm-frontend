import { z } from "zod";

const RegisterSchema = z
  .object({
    username: z.string("Username required").trim().min(3, "Username needs to be 3 characters minimum"),
    password: z.string("Password is required").min(4, "Password needs to be at least 4 characters"),
    confirmPassword: z.string("Confirm password is required"),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export default RegisterSchema;
