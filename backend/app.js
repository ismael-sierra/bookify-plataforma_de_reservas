const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Rutas (de momento placeholder)
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("📌 API de Bookify funcionando...");
});

module.exports = app;
