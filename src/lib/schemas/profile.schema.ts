import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be no more than 64 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character (e.g., !@#$%^&*)",
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const CancelOrderSchema = z.object({
  reason: z
    .string()
    .min(10, {
      message: "Your reason must be at least 10 characters.",
    })
    .max(100, {
      message: "Your reason must not be longer than 100 characters.",
    }),
});
