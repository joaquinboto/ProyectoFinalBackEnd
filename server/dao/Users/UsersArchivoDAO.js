const ContenedorArchivo = require('../../contenedor/ContenedorArchivo')


class UsersArchivoDAO extends ContenedorArchivo {


    constructor() {
        super('./archivosJSON/users.json')
    }

}

module.exports = UsersArchivoDAO