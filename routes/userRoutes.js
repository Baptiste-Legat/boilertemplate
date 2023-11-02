import express from 'express';
import {verifyToken, loginUser, listUsers, createUser, getUser, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();


//login
router.post('/api/login', loginUser);

// list all users
router.get('/api/users', verifyToken, listUsers);

// create a new user
router.post('/api/users', createUser);

// get a user
router.get('/api/users/:userId', verifyToken, getUser);

// update a user
router.put('/api/users/:userId', verifyToken, updateUser);

// delete a user
router.delete('/api/users/:userId', verifyToken, deleteUser);

export default router;