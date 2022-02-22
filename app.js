require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Connecting to Database
mongoose.connect()

// Routing for issue
const issue = require('./routes/issue')
app.use('/issue', issue)

// Routing for users
const users = require('./routes/users')
app.use('/users', users)

app.get('/', (req, res) => {
    res.json({ msg: 'halaman home' })
})

app.listen(3000, () => {
    console.log("App is listening to Port 3000")
})
