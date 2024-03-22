import { Router } from 'express';
import { actualizarUsuario, cambiarContrasena, crearUsuario, eliminarUsuario, obtenerUsuarioPorId, obtenerUsuarios } from '../controllers/users.js';

export const usersRouter = Router();

// Rutas existentes
usersRouter.get('', obtenerUsuarios);
usersRouter.post('', crearUsuario);
usersRouter.get('/:id', obtenerUsuarioPorId);
usersRouter.put('/:id', actualizarUsuario);
usersRouter.delete('/:id', eliminarUsuario);

// Nueva ruta para cambiar la contraseña
usersRouter.put('/:id/cambiar-contrasena', cambiarContrasena);