import express from 'express';
import { listUsers, createUser, getUser, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();
// list all users
router.get('/api/users', listUsers);

// create a new user
router.post('api/users/', createUser);

// get a user
router.get('/api/users/:userId', getUser);

// update a user
router.put('/api/users/:userId', updateUser);

// delete a user
router.delete('/api/users/:userId', deleteUser);

export default router;