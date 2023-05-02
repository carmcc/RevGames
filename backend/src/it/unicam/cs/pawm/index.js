const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoute')
const authRoutes = require('./routes/authRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const db = require('./config/db')
db.sync()
    .then(() => { console.log("Connected."); })
    .catch((err) => { console.log("Not Connected : " + err.message);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))





