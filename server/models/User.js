const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    date: {type: String},
    name: {type: String, required: true},
    lastLogDate: {type: String},
    blocked: {type: String}
})

module.exports = model('User', User);