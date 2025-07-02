import QRCode from 'qrcode';
import Lote from '../models/lote.model.js';
import { loteSchema } from '../schemas/lote.schema.js';

export const crearLote = async (req, res) => {
  // Extrae todos los campos del body
  const {
    productorId,
    granja,
    vacunaciones,
    tipoHuevo,
    numeroLote,
    fechaRecoleccion,
    tamano,
    fechaEmpaque,
    lugarEmpaque,
    cantidadPorCaja,
    fechaSalida,
    puntoVenta,
  } = req.body;

  // 1. Validar input con Zod
  const parsed = loteSchema.safeParse({
    productorId,
    granja,
    vacunaciones,
    tipoHuevo,
    numeroLote,
    fechaRecoleccion,
    tamano,
    fechaEmpaque,
    lugarEmpaque,
    cantidadPorCaja,
    fechaSalida,
    puntoVenta,
  });
  if (!parsed.success) {
    // Si falla validación, 400 con errores
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    // 2. Crear y guardar el nuevo lote
    const nuevoLote = new Lote({
      ...parsed.data,
      fechaRecoleccion: new Date(parsed.data.fechaRecoleccion),
      fechaEmpaque:     new Date(parsed.data.fechaEmpaque),
      fechaSalida:      new Date(parsed.data.fechaSalida),
    });
    const loteGuardado = await nuevoLote.save();

    // 3. Generar QR como DataURL
    const payload = { loteId: loteGuardado._id };
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload));

    // 4. Guardar el QR en el documento del lote
    loteGuardado.qrCode = qrDataUrl;
    await loteGuardado.save();

    // 5. Devolver respuesta con lote y QR
    return res.status(201).json({
      lote: {
        id: loteGuardado._id,
        productorId: loteGuardado.productorId,
        granja: loteGuardado.granja,
        vacunaciones: loteGuardado.vacunaciones,
        tipoHuevo: loteGuardado.tipoHuevo,
        numeroLote: loteGuardado.numeroLote,
        fechaRecoleccion: loteGuardado.fechaRecoleccion,
        tamano: loteGuardado.tamano,
        fechaEmpaque: loteGuardado.fechaEmpaque,
        lugarEmpaque: loteGuardado.lugarEmpaque,
        cantidadPorCaja: loteGuardado.cantidadPorCaja,
        fechaSalida: loteGuardado.fechaSalida,
        puntoVenta: loteGuardado.puntoVenta,
        createdAt: loteGuardado.createdAt,
        updatedAt: loteGuardado.updatedAt,
      },
      qr: qrDataUrl,
    });
  } catch (error) {
    // En caso de error interno, 500 con mensaje
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
