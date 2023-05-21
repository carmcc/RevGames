const express= require('express')
const router = express.Router()

const gameController = require('../controllers/gameController')

router.get('/games/myGames', gameController.getAllGames)
router.get('/games/getGameById/:id', gameController.getGameById)
router.get('/games/getGameByTitle/:title', gameController.getGameByTitle)
router.post('/games/addGame', gameController.addGame)
router.put('/games/updateGame', gameController.updateGame)
router.delete('/games/deleteGameById/:id', gameController.deleteGameById)
router.all('/games/*', gameController.error)

module.exports = router