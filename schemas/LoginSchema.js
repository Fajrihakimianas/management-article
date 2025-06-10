import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({
      message: "Username harus diisi",
    })
    .min(3, { message: "Username minimal 3 karakter" })
    .max(50, { message: "Username maksimal 50 karakter" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .max(100, { message: "Password maksimal 100 karakter" }),
});
