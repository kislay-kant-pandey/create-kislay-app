const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/v1/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/v1/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/v1/users - Create new user
router.post('/', userController.createUser);

// PUT /api/v1/users/:id - Update user
router.put('/:id', userController.updateUser);

// DELETE /api/v1/users/:id - Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router; 