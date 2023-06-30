import { z } from "zod";

export const register = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  email: z.string().email(),
  password: z.string().min(4),
});
