const express = require('express')
const router = express.Router()

// Utility
const { createUser, login } = require('../utils/crud')

// users model
const Users = require('../models/users')

// To the create user form
router.get('/create', (req, res) => {
    res.render('register', {
        title: 'Issue Tracker - Create User',
        layout: 'layouts/main-layout',
        error: req.flash('error')
    })
})

// To the login form
router.get('/login', (req, res) => {
    res.render('login', {
        error: req.flash('error'),
        title: 'Issue Tracker - Login',
        layout: 'layouts/main-layout',
    })
})

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.clearCookie('password')
    console.log('cookie clear')
    res.redirect('/users/login')
})

// Create new user
router.post('/create', async (req, res) => {

    console.log(req.body)

    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    let result = await createUser(username, email, password)

    console.log(result)

    if (result === true) {
        req.flash('success', "Successfully create a user")
        res.redirect('/users/login')
    }
    else {

        //Error message
        req.flash('error', result)
        //Error message

        res.redirect('/users/create')
    }

})

// Login
router.post('/login', async (req, res) => {
    console.log(req.body)

    let email = req.body.username
    let password = req.body.password

    const result = await login(email, password)

    console.log(result)

    if (result === true) {
        res.cookie('username', email, { secure: true, httpOnly: true, maxAge: 3000000 })
        res.cookie('password', password, { secure: true, httpOnly: true, maxAge: 3000000 })
        res.redirect('/')
    }
    else {

        // Error message
        req.flash('error', result)
        // Error message

        res.redirect('/users/login')
    }
})

// router.get('/asd', (req, res) => {
//     res.cookie('u', 'anbia')
//     req.flash('msg', 'qwerty')
//     res.json(req.flash('msg'))
// })

module.exports = router