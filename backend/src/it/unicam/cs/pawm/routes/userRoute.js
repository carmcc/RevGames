const express= require('express')
const router = express.Router()

const userController = require('../controllers/userController')
router.post('/auth/login', userController.login)
router.post('/auth/register', userController.register)
router.get('/api/protected', userController.protectedRoute)
router.get('/users/allUsers', userController.getAllUsers)

//modulo da esportare per le rotte, richiamato in index.js
module.exports = router