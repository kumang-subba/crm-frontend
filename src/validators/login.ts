import { z } from "zod";

const LoginSchema = z.object({
  username: z.string("Username required").trim().min(3, "Username needs to be 3 characters minimum"),
  password: z.string("Password is required").min(4, "Password needs to be at least 4 characters"),
});

export default LoginSchema;
