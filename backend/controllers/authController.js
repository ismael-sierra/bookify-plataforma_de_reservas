const User = require("../models/User");
const generateToken = require("../utils/jwt");

// 📌 Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear usuario
    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Datos inválidos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// 📌 Login usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.getProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};
