const Game = require("../models/game");
const User = require("../models/user");
const {verifyAccessToken} = require("../authentication/jwt_auth");

/**
 * Get all games
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 and the list of games if the request is valid, 500 if an error occurs
 */
exports.getAllGames = async (req, res) => {
    try {
        const allGames = await Game.findAll();
        return res.status(200).json(allGames);
    } catch (err) {
        return res.status(500).send({message: "Error retrieving games", status: 500});
    }
}

/**
 * Get a game by id
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 and the game if the request is valid, 404 if the game is not found,
 * 500 if an error occurs
 */
exports.getGameById = async (req, res) => {
    try
    {
        const game = await Game.findByPk(req.params.id);
        if (game === null)
            return res.status(404).send({error: 'Game not found', status: 404});
        return res.status(200).json(game);
    }
    catch (err) {
       return res.status(500).send({message: 'Error retrieving game', status: 500});
    }
}

/**
 * Get a game by title
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 and the game, 404 if the game is not found, 500 if an error occurs
 */
exports.getGameByTitle = async (req, res) => {
    try
    {
        const game = await Game.findOne({where: { title: req.params.title}});
        if (game === null)
            return res.status(404).send({message: 'Game not found', status: 404});
        return res.status(200).json(game);
    }
    catch (err) {
        return res.status(500).send({message: 'Error retrieving game', status: 500});
    }
}

/**
 * Adds a new game
 * @param req
 * @param res
 * @returns {Promise<*>} status code 201 if the game is created, 400 if the request is not valid, 500 if an error occurs
 */
exports.addGame = async (req, res) => {
    const {title, description, rating, url} = req.body;

    if(title === undefined || title === '' || description === '' || description === undefined || rating === undefined || rating === '' || url==='' || url === undefined)
        return res.status(400).send({message: 'Title, description, rating or url missing', status: 400});
    if(title.length < 4 || title.length > 100)
        return res.status(400).send({message: 'Title must be between 4 and 20 characters', status: 400});
    if(description.length < 4 || description.length > 255)
        return res.status(400).send({message: 'Description must be between 4 and 100 characters', status: 400});
    if(rating < 0 || rating > 5)
        return res.status(400).send({message: 'Rating must be greater than 0', status: 400});
    if(url.length < 4 || url.length > 100)
        return res.status(400).send({message: 'Url must be between 4 and 100 characters', status: 400});
    verifyAccessToken(req, res , async () => {
        try {

            const user = await User.findOne({where: {username: req.user.username}});
            if (!user.isAdmin)
                return res.status(401).send({message: 'Unauthorized', status: 401});

            const newGame = await Game.create({title, description, rating, url});
            await newGame.save();
            return res.status(201).send({message: 'Game created', status: 201});
        } catch (err) {
            return res.status(500).send({error: 'Error creating game', status: 500});
        }
    });
}
/**
 * Error handler
 * @param req
 * @param res
 * @returns {Promise<*>} status code 404
 */
exports.error = async (req, res) => {
    return res.status(404).send({message: 'Error. Path not found', status: 404});
}