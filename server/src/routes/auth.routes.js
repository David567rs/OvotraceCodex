import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  forgotPassword,
  verifyToken,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verifyTokenSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../schemas/auth.schema.js";

const router = Router();
// Registro
router.post("/register/cliente", validateSchema(registerSchema), (req, res) => {
  req.body.role = "cliente";
  return register(req, res);
});
router.post(
  "/register/productor",
  validateSchema(registerSchema),
  (req, res) => {
    req.body.role = "productor";
    return register(req, res);
  }
);
//router.post("/register", validateSchema(registerSchema), (req, res) => { req.body.role="cliente"; return register(req,res); });

// Login
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

// Recuperación
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  forgotPassword
);
router.post("/verify-token", validateSchema(verifyTokenSchema), verifyToken);
router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  resetPassword
);
// nueva ruta para verificación de email
router.post("/verify-email", validateSchema(verifyEmailSchema), verifyEmail);

export default router;
