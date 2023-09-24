const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const { createChat, getChat, deleteChat,  getAllChats, getNewChats} = chatController;

router.post('/create', createChat);
router.post('/', getChat);
router.delete('/delete', deleteChat);
router.get('/:user', getAllChats);
router.get('/new/:user', getNewChats);

module.exports = router;