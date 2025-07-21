import User from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.js";

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funciones para la gestion de las imagenes a traves de Cloudinary

export const uploadavatar = async (req, res) => {
  const { path } = req.file;
  const result = await cloudinary.uploader.upload(path, {
    folder: "avatars",
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: result.secure_url },
    { new: true }
  );
  res.json({ avatar: user.avatar });
};
