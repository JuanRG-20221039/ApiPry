import { Router } from 'express'
import { usersSchema } from '../models/users.js'
import { cambiarContrasena } from '../controllers/users.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
export const userRouter = Router()

userRouter.get('',(req,res)=>{
  const { userId:id } = req.userData;
  usersSchema.findById(id)
  .then(data => {
      if(!data)
          res.status(404).json({message:'Usuario no encontrado'})
      else
          res.json(data)
  })
  .catch(error=>res.status(400).json({message:error}))
})

// Actualizar un usuario por ID 
userRouter.put('', (req, res) => {
  const { userId:id } = req.userData;
  usersSchema.findByIdAndUpdate(id, req.body, { new: true })
      .then(data => {
          if(!data)
              res.status(404).json({message:'Usuario no encontrado'})
          else
              res.json(data)
      })
      .catch(error => res.status(500).json({ message: error }));
});

// Actualizar parcialmente un usuario por ID
userRouter.patch('', (req, res) => {
  const { userId:id } = req.userData;
  usersSchema.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(data => {
          if(!data)
              res.status(404).json({message:'Usuario no encontrado'})
          else
              res.json(data)
      })
      .catch(error => res.status(500).json({ message: error }));
});

//eliminar usuario
userRouter.delete('',(req,res)=>{
  const { userId:id } = req.userData;
  usersSchema.deleteOne({_id:id})
  .then(data=>{
      if(data.deletedCount==0)
          res.status(404).json({message: 'Usuario no encontrado'})
      else
          res.json(data)
  })
  .catch(error=>res.status(500).json({message:error}))
})

userRouter.put('/cambiar-contrasena', async (req, res) => {
    try {
        // Extrae los datos necesarios del cuerpo de la solicitud
        const { userId: id } = req.userData;
        const { nuevaContrasena } = req.body;

        // Llama a la función para cambiar contraseña
        const result = await cambiarContrasena(id, nuevaContrasena);

        // Envía la respuesta adecuada
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});