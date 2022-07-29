const ObjectId = require('mongoose').Types.ObjectId; 


class ContenedorMongo {

    constructor(model) {
        this.model = model
    }

    async save(obj) {
        const nuevoProducto = new this.model(obj);
        console.log(nuevoProducto);
        return await nuevoProducto.save();
    }

    async getById(id) {
        return this.model.find({_id: new ObjectId(id)});
    }

    async getByUsername(name) {
        const user = await this.model.findOne({username: name});
        return user
    }

    async editById(obj, id) {
        console.log('UPDATE');
        const objUpdated = await this.model.updateOne(
            { _id: new ObjectId(id)},
            { $set: obj }
        )
        return objUpdated
    }

    async getByEmail(email) {
        return await this.model.findOne({email: email});
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
