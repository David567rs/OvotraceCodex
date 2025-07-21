import mongoose from "mongoose";
import { createAdmin } from "./libs/createAdmin.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      //"mongodb+srv://Ovotrace:Ovotrace123@cluster0.2aeoe7x.mongodb.net/ovotrace?retryWrites=true&w=majority&appName=Cluster0"
      "mongodb://localhost/ovotrace"
    );
    console.log("DB conectado");
    await createAdmin();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
