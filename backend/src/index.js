import express from "express";
import prisma from "./prisma.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4006;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log("\n---[Test db conection]---");
  try {
    await prisma.$connect();

    const estudiantes = await prisma.estudiante.findMany();
    console.log(estudiantes);
    //Aqui debe de regresar algo de la base de datos, simplemente para probar la conexion
  } catch (error) {
    //throw new Error('Error connecting to database');
    console.error("Error connecting to the database:", error);
  }
});
