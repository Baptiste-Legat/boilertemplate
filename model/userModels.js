const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = model('User', userSchema);