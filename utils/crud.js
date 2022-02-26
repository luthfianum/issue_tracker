const bcrypt = require('bcrypt')
const validator = require('validator').default

// Models
const Issue = require('../models/issue')
const User = require('../models/users')

async function createUser(username, email, password) {

    // Check if user is already exist
    let u = await User.findOne({ username })
    let e = await User.findOne({ email })

    if (u != null || e != null) return "Email or username is not available"

    if (!validator.isEmail(email)) return "Please insert a valid email"

    let salt = bcrypt.genSaltSync()
    let fixPassword = bcrypt.hashSync(password, salt)

    const result = {
        username,
        email,
        password: fixPassword
    }
    const wait = await User.insertMany(result)

    return true
}

async function login(email, password) {
    let user

    if (validator.isEmail(email)) {
        user = await User.findOne({ email })
    }
    else {
        user = await User.findOne({ username: email })
    }

    if (user == null) return "Cannot find the user"

    console.log(user)
    console.log('checking a password')
    let check = bcrypt.compareSync(password, user.password)

    if (!check) return "Wrong password"

    return true
}

async function getIssue(username) {
    const result = await Issue.find({ username: username })

    return result
}

async function createIssue(username, title, description, tag) {
    const input = {
        username: username,
        title: title,
        description: description,
        tag: tag,
        createdAt: new Date(),
        lastUpdate: new Date()
    }

    const wait = await Issue.insertMany(input)
}

module.exports = { createUser, login, getIssue, createIssue }