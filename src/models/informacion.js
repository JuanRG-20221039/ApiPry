import mongoose from 'mongoose';

export const informacionSchema = mongoose.model(
    'Informacion',
    mongoose.Schema({
        tipo: { type: String, required: true },
        informacion: { type: String, required: true }
    })
);