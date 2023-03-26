const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', userSchema)
module.exports = user;