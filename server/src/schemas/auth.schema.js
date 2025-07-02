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
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Campo obligatorio",
    })
    .min(6, {
      message: "La contraseña debe ser mínimo de 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Correo es obligatorio",
    })
    .trim()
    .min(1, { message: "El correo no puede estar vacío" })
    .email({ message: "Correo inválido" }),

  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(1, {
      message: "La contraseña no puede estar vacía",
    }),
});
