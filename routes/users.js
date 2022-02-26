const express = require('express')
const router = express.Router()

// Utility
const { createUser, login } = require('../utils/crud')

// users model
const Users = require('../models/users')

// To the create user form
router.get('/create', (req, res) => {
    res.json({ msg: 'halaman form untuk membuat users' })
})

// To the login form
router.get('/login', (req, res) => {
    res.json({ msg: "halaman login" })
})

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie()
    res.redirect('/users/login')
})

// Create new user
router.post('/create', (req, res) => {

    let usernmae = req.body.username
    let email = req.body.email
    let password = req.body.password

    let result = createUser(usernmae, email, password)

    if (result === true) res.redirect('/users/login')
    else {

        //Error message
        req.flash('error', result)
        //Error message

        res.redirect('/users/create')
    }

})

// Login
router.post('/login', async (req, res) => {
    let email = req.body.username
    let password = req.body.password

    const result = login(email, password)

    if (result === true) {
        res.cookie('email', email, { secure: true, httpOnly: true, maxAge: 3000000 })
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