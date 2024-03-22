import { Router } from 'express'
import { usersSchema } from '../models/users.js'
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

export const cambiarContrasena = async (req, res) => {
    try {
        const { idUsuario, nuevaContrasena } = req.body;

        // Verificar si se proporcionó una nueva contraseña
        if (!nuevaContrasena || nuevaContrasena.length < 8) {
            return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);

        // Actualizar la contraseña del usuario en la base de datos
        const usuario = await usersSchema.findByIdAndUpdate(
            idUsuario,
            { 'datosCuenta.password': hashedPassword },
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};