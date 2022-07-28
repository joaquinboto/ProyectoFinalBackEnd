const mongoose = require('mongoose');

const ProductosModel = mongoose.model('Productos', new mongoose.Schema({
    name: String,
    precio: Number,
    cantidad: String,
    img: String,
}))

module.exports = ProductosModel;