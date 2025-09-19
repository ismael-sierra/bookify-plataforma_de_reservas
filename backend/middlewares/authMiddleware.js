const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtener token
      token = req.headers.authorization.split(" ")[1];

      // Verificar
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token no válido" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No autorizado, falta token" });
  }
};

module.exports = { protect };
