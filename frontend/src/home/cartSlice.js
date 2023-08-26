export class Producto {
    constructor(nombre, precio, cantidad) {
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
    }
  
    // Método para actualizar el precio
    actualizarPrecio(nuevoPrecio) {
      this.precio = nuevoPrecio;
    }
  
    // Método para actualizar la cantidad
    sumCantidad() {
      this.cantidad = this.cantidad + 1;
      alert(this.cantidad)
    }

    resCantidad(){
        if(this.cantidad===0){
            this.cantidad= 0;
        }else{
            console.log('Prod: ' + this.nombre + ' QTY: ' + this.cantidad)
            this.cantidad = this.cantidad -1;
        }
    }

    cantidadT(){
        return this.cantidad;
    }
  
    // Método para calcular el precio total
    calcularPrecioTotal() {
      return this.precio * this.cantidad;
    }
  }