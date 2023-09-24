const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friendController');
const { getFriends, removeFriend } = friendController;

router.get('/:user', getFriends);
router.post('/remove', removeFriend);

module.exports = router;