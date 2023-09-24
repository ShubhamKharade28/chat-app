const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    user: String,
    requests: []
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;