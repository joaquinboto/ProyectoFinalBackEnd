const ContenedorMongo = require('../../contenedor/ContenedorMongoDb')
const Model = require('../../models/productModel.js')

class ProductsMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model)
    }
}

module.exports = ProductsMongoDAO