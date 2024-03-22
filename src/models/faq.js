import mongoose from 'mongoose';

export const faqSchema = mongoose.model(
    'faq',
    mongoose.Schema({
        pregunta: { type: String, required: true },
        respuesta: { type: String, required: true }
    })
);