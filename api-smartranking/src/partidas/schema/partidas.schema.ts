import mongoose from 'mongoose';

export const PartidasSchema = new mongoose.Schema(
  {
    def: { type: String },
    resultados: [
      {
        set: { type: String },
      },
    ],
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jogadores',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'partidas',
  },
);
