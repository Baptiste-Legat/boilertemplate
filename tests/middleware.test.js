const {handleEtagResponse, verifyToken} = require('../middleware');
const etag = require('etag');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

describe('Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            set: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();

    });

    it('should handle ETags', () => {
        const data = { name: 'User 1' };
        const dataETag = etag(JSON.stringify(data));
        req.headers = { 'if-none-match': dataETag };

        const shouldSendResponse = handleEtagResponse(req, res, data);

        expect(shouldSendResponse).toBe(false);
        expect(res.status).toHaveBeenCalledWith(304);
        expect(res.send).toHaveBeenCalledTimes(1);
    });

    it('should set ETags', () => {
        const data = { name: 'User 1' };
        const dataETag = etag(JSON.stringify(data));
        req.headers = {};

        const shouldSendResponse = handleEtagResponse(req, res, data);

        expect(shouldSendResponse).toBe(true);
        expect(res.set).toHaveBeenCalledWith('ETag', dataETag);
    });

    it('should verify a valid token', () => {
        const validToken = jwt.sign({ username: 'user123' }, process.env.JWT_SECRET);
        req.headers = {
            authorization: `Bearer ${validToken}`
        };

        verifyToken(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(req.user.username).toBe('user123');
    });

    it('should handle missing token', () => {

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle invalid token', () => {
        const invalidToken = 'invalidtoken';
        req.headers = {
            authorization: `Bearer ${invalidToken}`
        };

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token invalide' });
        expect(next).not.toHaveBeenCalled();
    });
});
