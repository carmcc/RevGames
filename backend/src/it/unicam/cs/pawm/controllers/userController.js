const User = require('../models/user')

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll()
        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
