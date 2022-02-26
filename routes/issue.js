const express = require('express')
const router = express.Router()
const { createIssue, editIssue } = require('../utils/crud')

// issue model
const Issue = require('../models/issue')

// To the issue form
router.get('/', (req, res) => {
    res.json({ msg: 'mendaftarkan issue' })
})

// To the edit form
router.get('/edit/:id', async (req, res) => {

    // Issue yang ingin diedit
    const data = await Issue.findById(req.params.id)
    // Issue yang ingin diedit

    res.json({ msg: 'mengedit issue' })
})

// See details about issue
router.get('/details/:id', async (req, res) => {

    // Issue yang ingin dilihat
    const data = await Issue.findById(req.params.id)
    // Issue yang ingin dilihat

    res.json({ msg: 'details issue' })
})

router.get('/delete/:id', async (req, res) => {

    const wait = await Issue.findByIdAndRemove(req.params.id)

    req.flash('success', 'Successfully deleted an issue')

    res.redirect('/')
})

// Add new issue
router.post('/', async (req, res) => {

    let title = req.body.title
    let description = req.body.description
    let tag = req.body.tag

    let wait = await createIssue(title, description, tag)

    req.flash('success', 'Succesfully create an issue')

    res.redirect('/')
})

// Edit issue
router.post('/edit/:id', async (req, res) => {
    const data = await Issue.findById(req.params.id)

    const update = {
        username: data.username,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        createdAt: data.createdAt,
        lastUpdate: new Date()
    }

    const wait = await Issue.findByIdAndUpdate(req.params.id, update)

    req.flash('success', 'Succesfully edit issue')

    res.redirect('/')

})

module.exports = router