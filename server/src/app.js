//Dependencia para las variables de entorno
import dotenv from "dotenv";
dotenv.config(); //Carga .env antes de cualquier otra cosa
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"; // Se agrego esto para usarse en la parte del frontend


//import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import loteRoutes from './routes/lote.routes.js';  
import policyRoutes from './routes/policy.routes.js';
import userRoutes from './routes/user.routes.js';// gestion de usuarios 

const app = express();

//HABILITAR CORS para apps móviles
app.use(
  cors({
    origin: "exp://192.168.173.217:8081",// url de desarrollo 
    credentials: true,
  })
);


app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

//connectDB();

app.use("/api", authRoutes);

app.use("/api",loteRoutes);

app.use('/api', policyRoutes);

app.use('/api', userRoutes);

export default app;
