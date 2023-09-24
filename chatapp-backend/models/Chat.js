const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: String,
    user2: String,
    messages: [
        {
            sender: String,
            payload: String,
            time: Date,
        }
    ]
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;