const express = require('express');
const { getUsers, updateUser, getUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);





module.exports = router;