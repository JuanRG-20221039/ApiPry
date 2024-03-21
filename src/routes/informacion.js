import { Router } from 'express';
import { informacionSchema } from '../models/informacion.js';

export const informacionRouter = Router();

// Obtener toda la información
informacionRouter.get('', (req, res) => {
    informacionSchema.find()
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ message: error }));
});

// Buscar información por id
informacionRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    informacionSchema.findById(id)
        .then(data => {
            if (!data)
                res.status(404).json({ message: 'Informacion no encontrada' });
            else
                res.json(data);
        })
        .catch(error => res.status(400).json({ message: error }));
});

// Buscar información por tipo
informacionRouter.get('/tipo/:tipo', (req, res) => {
    const { tipo } = req.params;
    informacionSchema.find({ tipo: tipo })
        .then(data => {
            if (data.length === 0)
                res.status(404).json({ message: 'Informacion no encontrada para este tipo' });
            else
                res.json(data);
        })
        .catch(error => res.status(400).json({ message: error }));
});