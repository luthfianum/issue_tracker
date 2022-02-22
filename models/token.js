const mongoose = require('mongoose')

const Token = mongoose.model('Token', {
    createdAt: Date,
    expiredAt: Date
})

module.exports = Token