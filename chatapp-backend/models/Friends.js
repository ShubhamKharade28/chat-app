const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user: String,
    friends: [],
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;