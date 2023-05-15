const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
// const https = require('https')
const app = express()

// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }
const userRoutes = require('./routes/userRoute')
const gameRoutes = require('./routes/gameRoute')
const reviewRoutes = require('./routes/reviewRoute')


const db = require('./config/db')
const createAssociations = require("./models/associations")

const User = require("./models/user")
const Game = require("./models/game")
const Review = require("./models/review")


app.use(cors({origin: 'http://localhost:8080', optionsSuccessStatus: 200}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoutes);
app.use(gameRoutes);
app.use(reviewRoutes);
app.use(createAssociations)

db.sync()
    .then(() => { console.log("Connected.");
    })
    .catch((err) => { console.log("Not Connected : " + err.message);
});

const port = process.env.PORT || 3000
// https.createServer(options, app).listen(port, () => console.log(`Https server listening on port ${port}`))
app.listen(port, () => console.log(`Http server listening on port ${port}`))



