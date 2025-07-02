// src/routes/auth.routes.js
import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

// Registro de cliente
router.post(
  "/register/cliente",
  validateSchema(registerSchema),
  (req, res, next) => {
    req.body.role = "cliente";
    return register(req, res, next);
  }
);

// Registro de productor
router.post(
  "/register/productor",
  validateSchema(registerSchema),
  (req, res, next) => {
    req.body.role = "productor";
    return register(req, res, next);
  }
);

// (Opcional) Ruta genérica de register que por defecto crea cliente
router.post("/register", validateSchema(registerSchema), (req, res, next) => {
  req.body.role = "cliente";
  return register(req, res, next);
});

// Login, logout y profile
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;