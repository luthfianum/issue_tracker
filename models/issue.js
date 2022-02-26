const mongoose = require('mongoose')

const Issue = mongoose.model('Issue', {
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: String,
    createdAt: Date,
    lastUpdate: Date
})

module.exports = Issue