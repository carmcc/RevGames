const Game = require("../models/game");

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
        return res.status(500).json("Error retrieving games");
    }
}

/**
 * Get a game by id
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 and the game if the request is valid, 400 if the request is not valid,
 * 404 if the game is not found, 500 if an error occurs
 */
exports.getGameById = async (req, res) => {
    try
    {
        const game = await Game.findByPk(req.params.id);
        if (game === null)
            return res.status(404).json('Game not found');
        return res.status(200).json(game);
    }
    catch (err) {
       return res.status(500).json('Error retrieving game');
    }
}

/**
 * Get a game by title
 * @param req
 * @param res
 * @returns {Promise<*>} status code 200 and the game if the request is valid, 400 if the request is not valid
 */
exports.getGameByTitle = async (req, res) => {
    try
    {
        const game = await Game.findOne({where: { title: req.params.title}});
        if (game === null)
            return res.status(404).json('Game not found');
        return res.status(200).json(game);
    }
    catch (err) {
        return res.status(500).json('Error retrieving game');
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
        return res.status(400).json('Title, description, rating or url missing');
    if(title.length < 4 || title.length > 20)
        return res.status(400).json('Title must be between 4 and 20 characters');
    if(description.length < 4 || description.length > 100)
        return res.status(400).json('Description must be between 4 and 100 characters');
    if(rating < 0 || rating > 5)
        return res.status(400).json('Rating must be greater than 0');
    try {
        const newGame = await Game.create({title, description, rating, url});
        await newGame.save();
        return res.status(201).json('Game created');
    } catch (err) {
        return res.status(500).send({message: 'Error creating game', status: 500});
    }
}
/**
 * Error handler
 * @param req
 * @param res
 * @returns {Promise<*>} status code 404
 */
exports.error = async (req, res) => {
    return res.status(404).json('Error');
}