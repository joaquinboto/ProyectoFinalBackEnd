const ContenedorMongo = require('../../contenedor/ContenedorMongoDb')
const Model = require('../../models/cartModel.js')

class CartMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model)
    }
}

module.exports = CartMongoDAO