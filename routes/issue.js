const express = require('express')
const router = express.Router()

// issue model
const Issue = require('../models/issue')

router.get('/', (req, res) => {
    res.json({ msg: 'mendaftarkan issue' })
})

router.get('/edit', (req, res) => {
    res.json({ msg: 'mengedit issue' })
})

router.get('/details', (req, res) => {
    res.json({ msg: 'details issue' })
})

router.post('/', (req, res) => {
    res.json({ msg: 'memasukkan issue ke database' })
})


module.exports = router