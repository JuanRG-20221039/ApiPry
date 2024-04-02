import { Router } from 'express'
import { productsSchema } from '../models/products.js'

export const productRouter = Router()

productRouter.get('', (req, res) => {
    productsSchema.find()
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ message: error }))
})

//buscar un producto por id
productRouter.get('/:id',(req,res)=>{
    const {id}=req.params
    productsSchema.findById(id)
    .then(data => {
        if(!data)
            res.status(404).json({message:'Producto no encontrado'})
        else
            res.json(data)
    })
    .catch(error=>res.status(400).json({message:error}))
})

// Ruta para agregar un producto
productRouter.post('/agregar', (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, descripcion, precio, stock, tipo, imagen } = req.body;

    // Crear una nueva instancia del modelo de productos con los datos proporcionados
    const nuevoProducto = new productsSchema({
        nombre,
        descripcion,
        precio,
        stock,
        tipo,
        imagen
    });

    // Guardar el producto en la base de datos
    nuevoProducto.save()
        .then(productoGuardado => {
            res.status(201).json(productoGuardado); // Devolver el producto guardado en la respuesta
        })
        .catch(error => {
            res.status(400).json({ message: error }); // Manejar el error si ocurre
        });
});