
const ContenedorMongo = require('../../contenedor/ContenedorMongoDb')
const Model = require('../../models/userModel')

class UserMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model)
    }
}

module.exports = UserMongoDAO