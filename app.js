require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const { getIssue } = require('./utils/crud')

const Users = require('./models/users')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.use(cookieParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(flash())
// Connecting to Database
mongoose.connect('mongodb://localhost:27017/issueTracker')

// Routing for issue
const issue = require('./routes/issue')
app.use('/issue', issue)

// Routing for users
const users = require('./routes/users')
const Issue = require('./models/issue')
app.use('/users', users)

// Home page
app.get('/', async (req, res) => {
    console.log(req.cookies)
    if (req.cookies.username !== undefined && req.cookies.password !== undefined) {
        const user = await Users.findOne({ username: req.cookies.username })
        console.log(user)
        if (user != null) {
            let check = bcrypt.compareSync(req.cookies.password, user.password)

            console.log(check)

            if (check) {

                // List of issue
                const issues = await getIssue(user.username)
                // List of issue

                console.log(issues)

                res.render('dashboard', {
                    issues: issues,
                    title: 'Issue Tracker',
                    layout: 'layouts/main-layout',
                    success: req.flash('success'),
                    error: req.flash('error')
                })
            }
        }
    }
    else {
        res.redirect('/users/login')
    }
})

// app.get('/asd', (req, res) => {
//     res.json(req.flash('msg'))
// })

app.listen(3000, () => {
    console.log("App is listening to Port 3000")
})


//error : req.flash('msg')
//success : req.flash('success')

// if(error)
// if(success) 