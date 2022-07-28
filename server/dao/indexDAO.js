const ProductsMongoDAO = require('./Productos/ProductsMongoDAO')
const ProductsMemoryDAO = require('./Productos/ProductsMemoriaDAO')
const ProductsArchivoDAO = require('./Productos/ProductsArchivoDAO')
const CartMongoDAO = require('./Cart/CartMongoDAO')
const CartMemoryDAO = require('./Cart/CartMemoriaDAO')
const CartArchivoDAO = require('./Cart/CartArchivoDAO')
const ChatMongoDAO = require('./Chat/ChatMongoDAO')
const ChatMemoryDAO = require('./Chat/ChatMemoriaDAO')
const ChatArchivoDAO = require('./Chat/ChatArchivoDAO')
const UsersArchivoDAO = require('./Users/UsersArchivoDAO')
const UsersMemoryDAO = require('./Users/UsersMemoriaDAO')
const UsersMongoDAO = require('./Users/UsersMongoDAO')
require('dotenv').config()

const FactortyDAO = () => {
    switch(process.env.TYPE_DB){
        case 'mongo':
            return {
                products: new ProductsMongoDAO(),
                cart: new CartMongoDAO(),
                chat: new ChatMongoDAO(),
                users: new UsersMongoDAO()
            }
        case 'memory':
            return {
                products: new ProductsMemoryDAO(),
                cart: new CartMemoryDAO(),
                chat: new ChatMemoryDAO(),
                users: new UsersMemoryDAO()
            }
        case 'file':
            return {
                products: new ProductsArchivoDAO(),
                cart: new CartArchivoDAO(),
                chat: new ChatArchivoDAO(),
                users: new UsersArchivoDAO()
            }
    }

}

module.exports = FactortyDAO