const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');
const { sendRequest, acceptRequest, getRequests } = requestController;

router.get('/:user', getRequests);
router.post('/send', sendRequest);
router.post('/accept', acceptRequest);

module.exports = router;