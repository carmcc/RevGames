const express= require('express')
const router = express.Router()


const reviewController = require('../controllers/reviewController')

router.get('/review/allReviews', reviewController.getAllReviews);
router.get('/review/allReviewsOfGame/:gameId', reviewController.getAllReviewsOfGame);
router.get('/review/getAllReviewsOfUser/:userId', reviewController.getAllReviewsOfUser);
router.post('/review/addReview', reviewController.addReview);
router.put('/review/updateReview', reviewController.updateReview);
router.all('/review/*', reviewController.error);

module.exports = router