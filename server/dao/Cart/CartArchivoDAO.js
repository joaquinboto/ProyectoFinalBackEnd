const ContenedorArchivo = require('../../contenedor/ContenedorArchivo')


class CartArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('./archivosJSON/carrito.json')
    }

}

module.exports = CartArchivoDAO