const express= require('express')
const router = express.Router()
router.use(express.json())


const User = require('../models/user')

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username && password){
        res.send('Login OK')
    }
    else{
        res.send('Login ERROR')
    }
});

router.post('/register', async (req, res) => {

    const {username, password, email} = req.body;
    const userDB = await User.findOne({$or: [{username: username}, {email: email} ]});
    if(userDB)
        res.status(400).send('Username or email already exists');
    else
    {
        const newUser = await User.create({username, password, email});
        await newUser.save();
        res.status(200).send('User created');
    }
});

module.exports = router