//importacion del modelo
import ProductoModel from "../Models/ProductoModel.js";


// metodos CRUD

// Mostrar todos los registros

export const getAllProductos = async (req , res) =>{
    try{
        const productos = await ProductoModel.findAll();
        res.json(productos);
    }catch(error){
        res.json({message: error.message});
    }
}

//Mostrar un Registro

export const getProducto = async (req , res) =>{
    try {
        const producto = await ProductoModel.findAll({
                where:{id:req.params.id}
        })
        res.joson(producto)
    } catch (error){
        res.json({message: error.message})
    }
}


//Crear Producto 

export const createProducto = async (req , res) => {

    try {
        await ProductoModel.create(req.body)
        res.json({
            "message":"Producto creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }

}

// Actualizar Producto

 export const updateProducto = async (req, res) =>{

    try {
        await ProductoModel.update(req.body,{
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

export const deleteProducto = async (req,res) =>{

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

