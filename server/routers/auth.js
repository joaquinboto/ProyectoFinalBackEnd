const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const FACTORYDAO = require('../dao/indexDAO')
const dao = FACTORYDAO()


router.post("/register", async (req, res) => {
  try {
    //valida que el usuario no exista
    const { username, email, password } = req.body
    if(await dao.users.getByEmail(req.body.email) || await dao.users.getByUsername(req.body.username)){
      res.status(400).send({message: "El usuario ya existe"})
    } else {
      const userNuevo = {
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10)
      }
      const user = await dao.users.save(userNuevo)
      delete user.password
      res.status(200).send({message: "Usuario registrado", user})
    }
   
  } catch (error) {
    console.log(error)
  }
});





  
  module.exports = router;
