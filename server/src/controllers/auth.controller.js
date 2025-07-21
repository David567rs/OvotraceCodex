import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jws.js";
import crypto from "crypto";
import { transporter } from "../libs/mailer.js";
import { sendVerificationEmail } from "../libs/mailer.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    /*if (!userFound.emailVerified)
      return res
        .status(401)
        .json({ message: "Debes verificar tu correo antes de iniciar sesión" });
    */
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, { httpOnly: true });

    return res.json({
      token,
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash, role });

    // 1) Generar token de verificación
    const token = crypto.randomBytes(3).toString("hex").toUpperCase(); // ej. "A1B2C3"
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    newUser.emailVerificationToken = hash;
    newUser.emailVerificationExpires = Date.now() + 60 * 60 * 1000; // 1 hora

    // 2) Guardar usuario
    const userSaved = await newUser.save();

    // 3) Enviar email de verificación
    await sendVerificationEmail(email, token);

    // 4) Devolver respuesta (sin crear sesión todavía)
    return res.status(201).json({
      message: "Usuario creado. Revisa tu correo para verificar la cuenta.",
      userId: userSaved._id,
    });
  } catch (error) {
    console.error("🛑 Error en register:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "El correo ya está en uso" });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(200).json({ message: "Email enviado si existe." });

  const token = crypto.randomBytes(4).toString("hex").toUpperCase();
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPasswordToken = hash;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const html = `<p>Hola,</p><p>Tu código de recuperación es:</p><h2>${token}</h2><p>Expira en 15 min.</p>`;
  await transporter.sendMail({
    from: `"Ovotrace" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Recuperación de contraseña",
    html,
  });

  return res.status(200).json({ message: "Email enviado si existe." });
};

export const verifyToken = async (req, res) => {
  const { email, token } = req.body;
  const hash = crypto.createHash("sha256").update(token.trim()).digest("hex");
  console.log("🔍 Verify payload:", { email, token, hash });

  // Opcional: imprime lo que hay en la base
  const userDoc = await User.findOne({ email });
  console.log(
    "🗄  DB token hash:",
    userDoc?.resetPasswordToken,
    "expires:",
    new Date(userDoc?.resetPasswordExpires).toISOString()
  );
  const user = await User.findOne({
    email,
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });
  return res.status(200).json({ message: "Token válido" });
};

export const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  const hash = crypto.createHash("sha256").update(token.trim()).digest("hex");
  const user = await User.findOne({
    email,
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res.status(200).json({ message: "Contraseña actualizada" });
};

// ——— verificación de email ———
export const verifyEmail = async (req, res) => {
  const { email, token } = req.body;
  // volver a hashear
  const hash = crypto.createHash("sha256").update(token.trim()).digest("hex");

  // buscar usuario pendiente de verificación
  const user = await User.findOne({
    email,
    emailVerificationToken: hash,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Código inválido o expirado" });
  }

  // marcar verificado y limpiar campos
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return res.json({ message: "Correo verificado correctamente" });
};
