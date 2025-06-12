import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string({
      message: "Username harus diisi",
    })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username max 30 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be max 100 characters long" }),
  role: z.enum(["admin", "user"], {
    message: "Role must be either 'admin' or 'user'",
  }),
});
