const express = require('express')
const router = express.Router()
//controller
const userController = require('./routes/userController')
const authController = require('./routes/auth')
//models
const user = require('./models/user')

const app = express()

const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userController);
app.use('/auth', authController);

const db = require('./config/db')

db.sync()
    .then(() => { console.log("Connected."); })
    .catch((err) => { console.log("Not Connected : " + err.message);
});


app.listen(port, () => console.log(`App listening on port ${port}`))





