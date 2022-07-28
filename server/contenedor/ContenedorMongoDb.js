const ObjectId = require('mongoose').Types.ObjectId; 


class ContenedorMongo {

    constructor(model) {
        this.model = model
    }

    async save(obj) {
        const nuevoProducto = new this.model(obj);
        return await nuevoProducto.save();
    }

    async getById(id) {
        return this.model.find({_id: new ObjectId(id)});
    }

    async editById(obj, id) {
        console.log('UPDATE');
        const objUpdated = await this.model.updateOne(
            { _id: new ObjectId(id)},
            { $set: obj }
        )
        return objUpdated
    }

    async getAll() {
        return await this.model.find({});
    }

    async deleteByID(id) {
        console.log(id)
        const userDelete = await this.model.deleteOne({_id: new ObjectId(id)})
        return true
    }
}

module.exports = ContenedorMongo;
