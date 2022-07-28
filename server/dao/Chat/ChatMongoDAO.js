const ContenedorMongo = require('../../contenedor/ContenedorMongoDb')
const Model = require('../../models/chatModel.js')

class ChatMongoDAO extends ContenedorMongo {
    constructor() {
        super(Model)
    }
}

module.exports = ChatMongoDAO