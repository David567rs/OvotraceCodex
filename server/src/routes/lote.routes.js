import { Router } from "express";
import {
  crearLote,
  listarLotes,
  obtenerLote,
} from "../controllers/lote.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/crearLote", authRequired, crearLote);
router.get("/lotes", authRequired, listarLotes); // <-- nueva
router.get("/lotes/:id", authRequired, obtenerLote); // <-- nueva

export default router;
