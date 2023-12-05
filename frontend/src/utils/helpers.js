//Cart helpers
const getTotalPrice = (cart) => {
    return cart.reduce((acc, item) => acc + item.precio_producto * item.cantidad_producto, 0);
}

const getTotalItems = (cart) => {
    return cart.reduce((acc, item) => acc + item.cantidad_producto, 0);
}

const getTotalWeight = (cart) => {
    return cart.reduce((acc, item) => acc + (item.peso_producto/1000) * item.cantidad_producto, 0);
}

const getProduct = (cart, id) => {
    return cart.find((item) => item.id_producto === id);
}

//Global helpers

const formatPrice = (price) => {
    return price.toLocaleString("en-US");
  }; 

const formatWeight = (weight) => {
    return weight.toFixed(2);
}

const prodTotalPrice = (prod) => {
    return prod.precio_producto * prod.cantidad_producto;
}




export { getTotalPrice, getTotalItems, getTotalWeight, formatPrice, prodTotalPrice, getProduct, formatWeight };