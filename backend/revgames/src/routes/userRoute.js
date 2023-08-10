const express= require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/auth/login', userController.login)
router.post('/auth/register', userController.register)
router.post('/auth/logout', userController.logout)
router.post('/auth/invalidate-refreshToken', userController.invalidateRefreshToken)
router.get('/get-nonce', userController.getNonce)
router.get('/api/protected', userController.protectedRoute)
router.get('/users/getAllUsers', userController.getAllUsers)
router.get(`/users/getUsernameById/:userId`, userController.getUserNameById)
router.get(`/users/getUserIdByUsername/:username`, userController.getUserIdByUsername)
router.get('/verify-refreshToken', userController.verifyRefreshToken)
router.post('/new-refreshToken', userController.generateNewTokens)
router.all('/users/*', userController.error)
router.all('/auth/*', userController.error)

//modulo da esportare per le rotte, richiamato in index.js
module.exports = router