import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      //"mongodb+srv://Ovotrace:Ovotrace123@cluster0.2aeoe7x.mongodb.net/ovotrace?retryWrites=true&w=majority&appName=Cluster0"
      "mongodb://localhost/ovotrace"
    );
    console.log("DB conectado");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
