import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string("Name is required").trim().min(3, "Group name must be at least 3 characters"),
});
