import { Router } from 'express';
import { crearLote } from '../controllers/lote.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post("/crearLote", authRequired, crearLote);

export default router;
