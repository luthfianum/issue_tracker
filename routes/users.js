const express = require('express')
const router = express.Router()

// users model
const Users = require('../models/users')

router.get('/create', (req, res) => {
    res.json({ msg: 'halaman form untuk membuat users' })
})

router.get('/login', (req, res) => {
    res.json({ msg: "halaman login" })
})

router.post('/create', (req, res) => {
    res.json({ msg: 'Halaman membuat users' })
})

module.exports = router