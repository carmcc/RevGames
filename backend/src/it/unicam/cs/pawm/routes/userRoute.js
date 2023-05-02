const express= require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/allUsers', userController.getAllUsers)

//modulo da esportare per le rotte, richiamato in index.js
module.exports = router