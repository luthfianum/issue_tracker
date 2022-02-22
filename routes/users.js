const express = require('express')
const router = express.Router()

// Utility
const { createUser, login } = require('../utils/crud')

// users model
const Users = require('../models/users')

router.get('/create', (req, res) => {
    res.json({ msg: 'halaman form untuk membuat users' })
})

router.get('/login', (req, res) => {
    res.json({ msg: "halaman login" })
})

router.post('/create', (req, res) => {

    let usernmae = req.body.username
    let email = req.body.email
    let password = req.body.password

    let result = createUser(usernmae, email, password)

    if (result === true) res.redirect('/users/login')
    else {
        // Also send the error message
        res.redirect('/users/create')
    }

})

router.post('/login', async (req, res) => {
    let email = req.body.username
    let password = req.body.password

    const result = login(email, password)

    if (result === true) res.redirect('/')
    else {
        // Also send the error message
        res.redirect('/users/login')
    }
})


router.get('/api', (req, res) => {
    res.redirect('/')
})
module.exports = router