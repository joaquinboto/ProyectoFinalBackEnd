const {Router} = require('express')
const router = Router()
const FACTORYDAO = require('../dao/indexDAO')
const dao = FACTORYDAO()


router.post("/register", async (req, res) => {
  try {
    dao.users.save(req.body)
  } catch (error) {
    console.log(error)
  }
});



  
  module.exports = router;
