import express from "express";
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuario, updateUsuario } from "../controllers/UsuarioController.js";

const router = express.Router();

router.get('/',getAllUsuarios);
router.get('/:id',getUsuario);
router.post('/',createUsuario);
router.put('/:id',updateUsuario);
router.delete('/:id',deleteUsuario);

export default router;