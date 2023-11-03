const userController = require('../controller/userController');
const User = require('../model/userModels');
const middleware = require('../middleware');
const { verifyToken, handleEtagResponse } = require('../middleware');
const jwt = require('jsonwebtoken');

jest.mock('../model/userModels');
jest.mock('../middleware', () => ({
  handleEtagResponse: jest.fn(),
  verifyToken: jest.fn(),
}));

describe('User Controller', () => {
	let req, res;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
	});

	it('should list all users', async () => {
		const users = [{ name: 'User 1' }, { name: 'User 2' }];
		
		User.find = jest.fn().mockResolvedValue(users);

		handleEtagResponse.mockImplementation(() => true);
		verifyToken.mockImplementation(() => true);

		await userController.listUsers(req, res);

		expect(User.find).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(users);
	});

	it('should handle the case when no users are found', async () => {
		User.find = jest.fn().mockResolvedValue([]);
		await userController.listUsers(req, res);

		expect(User.find).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Aucun utilisateur n'a été trouvé" });
	});

	it('should handle errors when listing users', async () => {
		const error = new Error('Database error');
		User.find = jest.fn().mockRejectedValue(error);

		await userController.listUsers(req, res);

		expect(User.find).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should create a new user', async () => {
		const newUser = new User({ name: 'User 1' });
		const savedUser = { name: 'User 1', _id: '1' };

		User.prototype.save = jest.fn().mockResolvedValue(savedUser);

		req.body = newUser;

		await userController.createUser(req, res);

		expect(User.prototype.save).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé avec succès", user: savedUser });
	});

	it('should handle errors when creating a user', async () => {
		const newUser = new User({ name: 'User 1' });
		const error = new Error('Database error');

		User.prototype.save = jest.fn().mockRejectedValue(error);

		req.body = newUser;

		await userController.createUser(req, res);

		expect(User.prototype.save).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should get a user', async () => {
		const user = { name: 'User 1', _id: '1' };
		User.findById = jest.fn().mockResolvedValue(user);

		req.params = { userId: '1' };

		handleEtagResponse.mockImplementation(() => true);
		verifyToken.mockImplementation(() => true);

		await userController.getUser(req, res);

		expect(User.findById).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(user);
	});

	it('should handle the case when no user is found', async () => {
		const user = null;
		User.findById = jest.fn().mockResolvedValue(user);

		req.params = { userId: '1' };

		await userController.getUser(req, res);

		expect(User.findById).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
	});
	
	it('should handle errors when getting a user', async () => {
		const error = new Error('Database error');
		User.findById = jest.fn().mockRejectedValue(error);

		req.params = { userId: '1' };

		await userController.getUser(req, res);

		expect(User.findById).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should update a user', async () => {
		const updatedUser = { name: 'User 1', _id: '1' };
		User.findOneAndUpdate = jest.fn().mockResolvedValue(updatedUser);

		req.params = { userId: '1' };
		req.body = updatedUser;

		handleEtagResponse.mockImplementation(() => true);
		verifyToken.mockImplementation(() => true);

		await userController.updateUser(req, res);

		expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur mis à jour avec succès", user: updatedUser });
	});

	it('should handle the case when no user is found when updating', async () => {
		const updatedUser = null;
		User.findOneAndUpdate = jest.fn().mockResolvedValue(updatedUser);

		req.params = { userId: '1' };
		req.body = updatedUser;

		await userController.updateUser(req, res);

		expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
	});

	it('should handle errors when updating a user', async () => {
		const updatedUser = { name: 'User 1', _id: '1' };
		const error = new Error('Database error');

		User.findOneAndUpdate = jest.fn().mockRejectedValue(error);

		req.params = { userId: '1' };
		req.body = updatedUser;

		await userController.updateUser(req, res);

		expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should delete a user', async () => {
		const deletedUser = { name: 'User 1', _id: '1' };
		User.findByIdAndRemove = jest.fn().mockResolvedValue(deletedUser);

		req.params = { userId: '1' };

		handleEtagResponse.mockImplementation(() => true);
		verifyToken.mockImplementation(() => true);

		await userController.deleteUser(req, res);

		expect(User.findByIdAndRemove).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur supprimé avec succès", user: deletedUser });
	});

	it('should handle the case when no user is found when deleting', async () => {
		const deletedUser = null;
		User.findByIdAndRemove = jest.fn().mockResolvedValue(deletedUser);

		req.params = { userId: '1' };

		await userController.deleteUser(req, res);

		expect(User.findByIdAndRemove).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
	});

	it('should handle errors when deleting a user', async () => {
		const error = new Error('Database error');
		User.findByIdAndRemove = jest.fn().mockRejectedValue(error);

		req.params = { userId: '1' };

		await userController.deleteUser(req, res);

		expect(User.findByIdAndRemove).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should login a user', async () => {
		const user = { name: 'User 1', _id: '10', email: 'admin@gmail.com', password: 'azerty123' };
		User.findOne = jest.fn().mockResolvedValue(user);

		req.body = { email: 'admin@gmail.com', password: 'azerty123' };

		jwt.sign = jest.fn().mockReturnValue('token');

		await userController.loginUser(req, res);

		expect(User.findOne).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should handle the case when no user is found when logging in', async () => {
		const user = null;
		User.findOne = jest.fn().mockResolvedValue(user);

		req.body = { email: 'test@gmail.com', password: '123456' };

		await userController.loginUser(req, res);

		expect(User.findOne).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Aucun utilisateur n'a été trouvé" });
	});

	it('should handle errors when logging in', async () => {
		const error = new Error('Database error');
		User.findOne = jest.fn().mockRejectedValue(error);

		req.body = { email: 'test@gmail.com', password: '123456' };

		await userController.loginUser(req, res);

		expect(User.findOne).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error });
	});

	it('should handle the case when the password is incorrect when logging in', async () => {
		const user = { name: 'User 1', _id: '10', email: 'test@gmail.com', password: '123456' };

		User.findOne = jest.fn().mockResolvedValue(user);

		req.body = { email: 'test@gmail.com', password: '123' };

		await userController.loginUser(req, res);

		expect(User.findOne).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ error: "L'email ou le mot de passe est incorrect" });
	});
});
