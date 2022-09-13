import mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema(
  {
    categoria: { type: String, unique: true },
    description: { type: String },
    eventos: [
      {
        nome: { type: String },
        operacao: { type: String },
        valor: { type: Number },
      },
    ],
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogadores',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categorias',
  },
);
