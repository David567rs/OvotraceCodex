import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Correo requerido",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Campo obligatorio",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .regex(/\d/, {
      message: "La contraseña debe contener al menos un número",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Correo es obligatorio",
    })
    .trim()
    .min(1)
    .email(),
  password: z
    .string({
      required_error: "Contraseña obligatoria",
    })
    .min(1),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Correo requerido",
    })
    .trim()
    .email({
      message: "Correo inválido",
    }),
});

export const verifyTokenSchema = z.object({
  email: z.string().email({
    message: "Correo inválido",
  }),
  token: z.string().min(1, {
    message: "Código requerido",
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Correo inválido",
  }),
  token: z.string().min(4, {
    message: "Código requerido",
  }),
  password: z.string().min(6, {
    message: "Mínimo 6 caracteres",
  }),
});

// nuevo esquema para verificación de email
export const verifyEmailSchema = z.object({
  email: z.string().email("Correo inválido"),
  token: z.string().min(4, "Código requerido"),
});
