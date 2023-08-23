//importacion del modelo
import UsuarioModel from "../Models/UsuarioModel.js";

// Inicio Sesión
export const logIn = async(req, res) =>{
    try {
        const usuario = await UsuarioModel.findAll({
            where:{
                correo_usuario: req.params.correo_usuario,
                contraseña_usuario: req.params.contraseña_usuario
            }
        });
        res.json(true);
    } catch (error) {
        res.json({message: error.message})
    }
}


// metodos CRUD

// Mostrar todos los registros

export const getAllUsuarios = async (req , res) =>{
    try{
        const usuarios = await UsuarioModel.findAll();
        res.json(usuarios);
    }catch(error){
        res.json({message: error.message});
    }
}

//Mostrar un Registro

export const getUsuario = async (req , res) =>{
    try {
        const usuario = await UsuarioModel.findAll({
                where:{id_usuario:req.params.id}
        })
        res.json(usuario)
    } catch (error){
        res.json({message: error.message})
    }
}


//Crear Producto 

export const createUsuario = async (req , res) => {

    try {
        await UsuarioModel.create(req.body)
        res.json({
            "message":"Producto creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }

}

// Actualizar Producto

 export const updateUsuario = async (req, res) =>{

    try {
        await UsuarioModel.update(req.body,{
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

export const deleteUsuario = async (req,res) =>{

    try {
        await UsuarioModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message": "Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }

}

