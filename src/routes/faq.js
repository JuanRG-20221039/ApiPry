import { Router } from 'express';
import { faqSchema } from '../models/faq.js';

export const faqRouter = Router();

// Obtener todas las preguntas y respuestas
faqRouter.get('', (req, res) => {
    faqSchema.find()
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ message: error }));
});

// Buscar pregunta y respuesta por id
faqRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    faqSchema.findById(id)
        .then(data => {
            if (!data)
                res.status(404).json({ message: 'Pregunta y respuesta no encontradas' });
            else
                res.json(data);
        })
        .catch(error => res.status(400).json({ message: error }));
});
