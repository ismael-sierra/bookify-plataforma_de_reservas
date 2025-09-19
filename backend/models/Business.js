const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "El nombre del negocio es obligatorio"],
    },
    description: {
      type: String,
    },
    services: [
      {
        name: { type: String, required: true },
        duration: { type: Number, required: true }, // en minutos
        price: { type: Number, required: true },
      },
    ],
    address: {
      type: String,
      required: [true, "La dirección es obligatoria"],
    },
    openingHours: {
      type: String,
      default: "Lunes a Viernes 09:00-18:00",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
