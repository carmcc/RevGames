const express= require('express')
const router = express.Router()


const reviewController = require('../controllers/reviewController')

router.get('/review/getAllReviews', reviewController.getAllReviews);
router.get('/review/getAllReviewsOfGame/:gameId', reviewController.getAllReviewsOfGame);
router.get('/review/getAllReviewsOfUser/:userId', reviewController.getAllReviewsOfUser);
router.get('/review/getAllReviewsOfGameAndUser/:gameId/:userId', reviewController.getAllReviewsOfUserAndGame);
router.post('/review/addReview', reviewController.addReview);
router.put('/review/updateReview', reviewController.updateReview);
router.all('/review/*', reviewController.error);

module.exports = router