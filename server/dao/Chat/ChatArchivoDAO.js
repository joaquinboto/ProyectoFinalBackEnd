const ContenedorArchivo = require('../../contenedor/ContenedorArchivo')


class ChatArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('./archivosJSON/chat.json')
    }

}

module.exports = ChatArchivoDAO