const express= require('express')
const router = express.Router()
router.use(express.json())

const authController = require("../controllers/authController");

router.post('/login' , authController.login)

router.post('/register', authController.register)

module.exports = router