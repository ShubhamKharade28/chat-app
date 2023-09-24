const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const { register, login } = AuthController;

router.post('/register', register);
router.post('/login', login);


module.exports = router;