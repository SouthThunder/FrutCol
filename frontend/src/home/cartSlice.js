import axios from "axios";
import jwt_decode from "jwt-decode";

export class Producto {
  constructor(id, nombre, precio, cantidad, image, exists, peso) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.image = image;
    this.exists = exists;
    this.peso = peso;
  }



  // Método para actualizar la cantidad
  async sumCantidad(headers) {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad = this.cantidad + 1;
    try {
      const URI = "https://frutcol-backend.onrender.com/carrito/mod";
      await axios.put(URI, {
        id_carrito: idUser.id_usuario,
        id_producto: this.id,
        cantidad_producto: this.cantidad,
      }, {
        headers
      });
    } catch (error) {
      console.error(error);
    }
  }

  async resCantidad(headers) {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad = this.cantidad - 1;
    try {
      const URI = "https://frutcol-backend.onrender.com/carrito/mod";
      await axios.put(URI, {
        id_carrito: idUser.id_usuario,
        id_producto: this.id,
        cantidad_producto: this.cantidad,
      }, {
        headers
      });
    } catch (error) {
      console.error(error);
    }
  }

  async delProd(headers) {
    this.cantidad=0;
    const idUser= jwt_decode(localStorage.getItem('token'))
    try {
      const URI = "https://frutcol-backend.onrender.com/carrito/mod";
      await axios.put(URI, {
        id_carrito: idUser.id_usuario,
        id_producto: this.id,
        cantidad_producto: this.cantidad,
      }, {
        headers
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  cantidadT() {
    return this.cantidad;
  }

  async insertIntoDb(headers) {
    const idUser= jwt_decode(localStorage.getItem('token'))
    this.cantidad += 1;
    try {
      const URI = "https://frutcol-backend.onrender.com/carrito/";
      await axios.post(URI, {
        id_producto: this.id,
        cantidad_producto: this.cantidad,
        id_carrito: idUser.id_usuario
      }, {
        headers
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Método para calcular el precio total
  calcularPrecioTotal() {
    return this.precio * this.cantidad;
  }
}
