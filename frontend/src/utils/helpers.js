
const getTotalPrice = (cart) => {
    return cart.reduce((acc, item) => acc + item.precio_producto * item.cantidad_producto, 0);
}

const getTotalItems = (cart) => {
    return cart.reduce((acc, item) => acc + item.cantidad_producto, 0);
}

const getTotalWeight = (cart) => {
    return cart.reduce((acc, item) => acc + (item.peso_producto/1000) * item.cantidad_producto, 0);
}

const formatPrice = (price) => {
    return price.toLocaleString("en-US");
  }; 

const prodTotalPrice = (prods) => {
    return prods.precio_producto * prods.cantidad_producto;
}


export { getTotalPrice, getTotalItems, getTotalWeight, formatPrice, prodTotalPrice };