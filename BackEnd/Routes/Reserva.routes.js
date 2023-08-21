import express from "express";
import { createReserva, deleteReserva, getAllReservas, getReserva, updateReserva } from "../controllers/ReservaController.js";
const router = express.Router();

router.get('/',getAllReservas);
router.get('/:id',getReserva);
router.post('/',createReserva);
router.put('/:id',updateReserva);
router.delete('/:id',deleteReserva);

export default router;