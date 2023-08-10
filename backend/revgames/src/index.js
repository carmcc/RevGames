const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const app = express()

const userRoutes = require('./routes/userRoute')
const gameRoutes = require('./routes/gameRoute')
const reviewRoutes = require('./routes/reviewRoute')


const db = require('./config/db')
const createAssociations = require("./models/associations")


app.use(cors({origin: 'http://localhost:8080', optionsSuccessStatus: 200}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 25,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: false,
    message: (req) => { return `Too many requests from ${req.ip}. Try again later.` }
})

app.use(limiter)
app.use(userRoutes)
app.use(gameRoutes)
app.use(reviewRoutes)
app.use(createAssociations)

db.sync()
    .then(() => { console.log("Connected.")
    })
    .catch((err) => { console.log("Not Connected : " + err.message)
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Http server listening on port ${port}`))



