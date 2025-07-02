import mongoose from "mongoose";

const loteSchema = new mongoose.Schema(
  {
    productorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    granja: { type: String, required: true },

    vacunaciones: {
      bronquitis: { type: Boolean, default: false },
      newcastle: { type: Boolean, default: false },
      refuerzo: { type: Boolean, default: false },
      viruelaAviar: { type: Boolean, default: false },
      otra: { type: String, default: "" },
    },

    tipoHuevo: {
      type: String,
      enum: ["Orgánico", "Granja convencional", "Libre pastoreo"],
      required: true,
    },

    numeroLote: { type: String, required: true },
    fechaRecoleccion: { type: Date, required: true },

    // Paso 2
    tamano: { type: String, enum: ["S", "M", "L", "XL", "NE"], required: true },
    fechaEmpaque: { type: Date, required: true },
    lugarEmpaque: { type: String, required: true },

    cantidadPorCaja: { type: Number, required: true },
    fechaSalida: { type: Date, required: true },
    puntoVenta: {
      type: String,
      enum: ["Tienda", "Mercado", "Supermercado", "Otro"],
      required: true,
    },

    // Para guardar el QR generado (dataURL)
    qrCode: { type: String, default: " " },
  },
  { timestamps: true }
);

export default mongoose.model("Lote", loteSchema);
