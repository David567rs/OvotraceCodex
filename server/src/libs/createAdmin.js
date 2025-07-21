import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } from "../config.js";

export const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) return;

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new User({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    console.log("Admin user created");
  } catch (error) {
    console.error("Error creating admin:", error
      .message);
  }
};