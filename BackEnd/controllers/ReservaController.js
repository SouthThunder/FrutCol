//importacion del modelo
import ReservaModel from "../Models/ReservaModel.js";


// metodos CRUD

// Mostrar todos los registros

export const getAllReservas = async (req , res) =>{
    try{
        const reservas = await ReservaModel.findAll();
        res.json(reservas);
    }catch(error){
        res.json({message: error.message});
    }
}

//Mostrar un Registro

export const getReserva = async (req , res) =>{
    try {
        const reserva = await ReservaModel.findAll({
                where:{id:req.params.id}
        })
        res.joson(reserva)
    } catch (error){
        res.json({message: error.message})
    }
}


//Crear Producto 

export const createReserva = async (req , res) => {

    try {
        await ReservaModel.create(req.body)
        res.json({
            "message":"Producto creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }

}

// Actualizar Producto

 export const updateReserva = async (req, res) =>{

    try {
        await ReservaModel.update(req.body,{
            where: { id: req.params.id}
        })
        res.json({
            "message": "Producto acualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
 }


// Eliminar Producto

export const deleteReserva = async (req,res) =>{

    try {
        await ProductoModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message": "Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }

}

