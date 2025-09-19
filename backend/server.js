const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// Configuración de variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
