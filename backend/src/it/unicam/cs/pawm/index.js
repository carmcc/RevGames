const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoutes);

const db = require('./config/db')
db.sync()
    .then(() => { console.log("Connected."); })
    .catch((err) => { console.log("Not Connected : " + err.message);
});

const port = process.env.PORT || 3090
app.listen(port, () => console.log(`App listening on port ${port}`))





