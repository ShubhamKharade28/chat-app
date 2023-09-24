const express = require('express');
const router = express.Router();

const { searchUsers, searchAll, searchOne } = require('../controllers/searchUsersController');

router.post('/', searchUsers);
router.post('/all', searchAll);
router.get('/:username', searchOne);

module.exports = router;