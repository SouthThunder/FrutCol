import axios from "axios";
import jwt_decode from "jwt-decode";

export class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  // Método para actualizar el precio
  actualizarPrecio(nuevoPrecio) {
    this.precio = nuevoPrecio;
  }

  // Método para actualizar la cantidad
  async sumCantidad() {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad = this.cantidad + 1;
    try {
      const URI = "https://frutcola-backendpru.onrender.com/carrito/mod";
      await axios.put(URI, {
        id_carrito: idUser.id_usuario,
        id_producto: this.id,
        cantidad_producto: this.cantidad,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async resCantidad() {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad = this.cantidad - 1;
    try {
      const URI = "https://frutcola-backendpru.onrender.com/carrito/mod";
      await axios.put(URI, {
        id_carrito: idUser.id_usuario,
        id_producto: this.id,
        cantidad_producto: this.cantidad,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async delProd() {
    try {
    const id_carrito= jwt_decode(localStorage.getItem('token'))
    const URI = `https://frutcola-backendpru.onrender.com/carrito/${id_carrito.id_usuario}/${this.id}`;
      const res = await axios.delete(URI);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  

  cantidadT() {
    return this.cantidad;
  }

  async insertIntoDb() {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad += 1;
    console.log(idUser.id_usuario)
    console.log(this.id)
    
    
    try {
      const URI = "https://frutcola-backendpru.onrender.com/carrito/";
      const res= await axios.post(URI, {
        id_producto: this.id,
        cantidad_producto: this.cantidad,
        id_metadata_producto: this.id,
        id_carrito: idUser.id_usuario,
      });
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }

  // Método para calcular el precio total
  calcularPrecioTotal() {
    return this.precio * this.cantidad;
  }
}
