import { z } from "zod";

export const loteSchema = z.object({
  productorId: z.string().nonempty("El ID del productor es obligatorio"),

  granja: z.string().nonempty("Debe indicar el nombre de la granja"),

  vacunaciones: z.object({
    bronquitis: z.boolean().optional(),
    newcastle: z.boolean().optional(),
    refuerzo: z.boolean().optional(),
    viruelaAviar: z.boolean().optional(),
    otra: z.string().optional(),
  }),

  tipoHuevo: z.enum(["Orgánico", "Granja convencional", "Libre pastoreo"]),

  numeroLote: z.string().nonempty("Número de lote requerido"),
  fechaRecoleccion: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha de recolección inválida (YYYY-MM-DD)"),

  tamano: z.enum(["S", "M", "L", "XL", "NE"]),
  fechaEmpaque: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha de empaque inválida (YYYY-MM-DD)"),
  lugarEmpaque: z.string().nonempty("Lugar de empaque requerido"),

  cantidadPorCaja: z
    .number({
      required_error: "Cantidad por caja es obligatoria",
      invalid_type_error: "Debe ser un número",
    })
    .int("Debe ser un entero")
    .positive("Mayor que cero"),

  fechaSalida: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha de salida inválida (YYYY-MM-DD)"),

  puntoVenta: z.enum(["Tienda", "Mercado", "Supermercado", "Otro"]),
});
