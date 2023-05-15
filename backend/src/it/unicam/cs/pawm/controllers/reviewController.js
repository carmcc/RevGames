const Review = require('../models/review.js');
const {verifyAccessToken} = require("../authentication/jwt_auth");
const User = require("../models/user.js");

/**
 * Get all reviews
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the reviews are found, 500 if an error occurs
 */

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send({error: 'Error getting reviews', status: 500});
    }
}


/**
 * Get all reviews of a game
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the reviews are found, 404 if no reviews are found, 500 if an error occurs
 *
 */

exports.getAllReviewsOfGame = async (req, res) => {
    try
    {
        //cerco tutti i giochi con l'id passato
        const reviews = await Review.findAll({ where: { gameId: req.params.gameId } });
        //se non trovo nessuna recensione
        if (reviews.length === 0)
            return res.status(404).send({message: 'No reviews found', status: 404});
        res.status(200).json(reviews);

    } catch (err) {
        res.status(500).send({error:'Error getting reviews', status: 500});
    }
}

/**
 * Gets all reviews of a user
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the reviews are found, 404 if no reviews are found, 500 if an error occurs
 */

exports.getAllReviewsOfUser = async (req, res) => {
    try {
        //vado a cercare l'utente con l'id passato
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({message: 'User not found', status: 404 });
        }
        const reviews = await Review.findAll({ where: { userId } });
        if (!reviews.length) {
            return res.status(404).send({message: 'No reviews found for this user', status: 404});
        }
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).send({error: 'Error getting reviews', status: 500 });
    }
}

/**
 * Gets all reviews of a specific game from a specific user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getAllReviewsOfUserAndGame = async (req, res) => {
    try {
        //vado a cercare l'utente con l'id passato
        const gameId = req.params.gameId;
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({message: 'User not found', status: 404 });
        }
        const reviews = await Review.findAll({ where: {gameId,userId} });
        if (!reviews.length) {
            return res.status(404).send({message: 'No reviews found for this user', status: 404});
        }
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).send({error: 'Error getting reviews', status: 500 });
    }
}

/**
 * Adds a review but the user must be logged in with valid access token,
 * @param req
 * @param res
 * @returns {Promise<*>} status code 201 if the review is created, 400 if the request is not valid, 500 if an error occurs

 */

exports.addReview = async (req, res) => {
    const { title, description, rating, userId, gameId } = req.body;

    if (title === undefined || title === '' || description === '' || description === undefined || rating === '' || rating === undefined || gameId === '' || gameId === undefined)
        return res.status(400).send({message: 'Title, description, rating or gameId missing', status: 400});

    if (typeof (title) !== "string")
        return res.status(400).send({message: 'Invalid title', status: 400});

    if (typeof (description) !== "string")
        return res.status(400).send({message: 'Invalid description', status: 400});

    if (typeof (rating) !== "number")
        return res.status(400).send({message: 'Invalid rating', status: 400});

    if (typeof (gameId) !== "number")
        return res.status(400).send({message: 'Invalid gameId', status: 400});

    verifyAccessToken(req, res, async() => {
        try {
            //creazione recensione
            const newReview = await Review.create({ title, description, rating, date: Date.now(), gameId, userId});
            await newReview.save();
            res.status(201).send({message: 'Review created', status: 201});
        } catch (err) {
            res.status(500).send({error: 'Error creating review', status: 500});
        }
    });
}

/**
 * Updates a review but the user must be logged in with valid access token
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 if the review is updated, 400 if the request is not valid, 500 if an error occurs
 */
exports.updateReview = async (req, res) => {
    const { id, title, description, rating } = req.body;

    if (typeof (description) !== "string")
        return res.status(400).send({message: 'Invalid description', status: 400});

    if (typeof (rating) !== "number")
        return res.status(400).send({message: 'Invalid rating', status: 400});

    verifyAccessToken(req, res, async () => {
        try {
            //controllo se esiste la recensione tramite id
            const review = await Review.findOne({ where: {  id: id } });
            if (review === null)
                return res.status(404).json({message: 'Review not found', status: 404});
            //aggiorno la recensione con i nuovi dati
            review.title = title;
            review.description = description;
            review.rating = rating;
            await review.save();
            res.status(200).send({message: 'Review updated', status: 200});
        } catch (err) {
            res.status(500).send({error: 'Error updating review', status: 500});
        }
    });
}

exports.error = (req, res) => {
    res.status(404).send({error: 'Error. Path not found', status: 404});
}