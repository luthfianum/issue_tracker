const mongoose = require('mongoose')

const Issue = mongoose.model('Issue', {
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