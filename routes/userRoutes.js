import express from 'express';
import { listUsers, createUser, getUser, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();
// list all users
router.get('/', listUsers);

// create a new user
router.post('/', createUser);

// get a user
router.get('/:userId', getUser);

// update a user
router.put('/:userId', updateUser);

// delete a user
router.delete('/:userId', deleteUser);

export default router;