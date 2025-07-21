import { Router } from "express";
import { getUsers, deleteUser } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { adminOnly } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/users", authRequired, adminOnly, getUsers);
router.delete("/users/:id", authRequired, adminOnly, deleteUser);

export default router;