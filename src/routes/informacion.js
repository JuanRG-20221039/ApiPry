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

// Agregar nueva información
informacionRouter.post('/agregar', (req, res) => {
    const { tipo, informacion } = req.body;
    const nuevaInformacion = new informacionSchema({ tipo, informacion });
    nuevaInformacion.save()
        .then(data => res.status(201).json(data))
        .catch(error => res.status(400).json({ message: error }));
});

// Eliminar información por id
informacionRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    informacionSchema.findByIdAndDelete(id)
        .then(deletedData => {
            if (!deletedData)
                res.status(404).json({ message: 'No se encontró la información para eliminar' });
            else
                res.json({ message: 'Informacion eliminada exitosamente' });
        })
        .catch(error => res.status(400).json({ message: error }));
});

// Modificar información por id
informacionRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tipo, informacion } = req.body;
    informacionSchema.findByIdAndUpdate(id, { tipo, informacion }, { new: true })
        .then(updatedData => {
            if (!updatedData)
                res.status(404).json({ message: 'No se encontró la información para modificar' });
            else
                res.json(updatedData);
        })
        .catch(error => res.status(400).json({ message: error }));
});
