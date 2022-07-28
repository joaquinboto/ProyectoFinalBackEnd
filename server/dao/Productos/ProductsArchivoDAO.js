const ContenedorArchivo = require('../../contenedor/ContenedorArchivo')


class ProductsArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('./archivosJSON/productos.json')
    }

}

module.exports = ProductsArchivoDAO