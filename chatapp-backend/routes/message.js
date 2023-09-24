const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');
const { sendMessage, getMessages } = messageController;

router.post('/send', sendMessage);
router.get('/:id', getMessages);

module.exports = router;