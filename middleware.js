const etag = require('etag');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

// Middleware pour vérifier le token JWT
const jwtSecret = process.env.JWT_SECRET;

// Middleware pour vérifier le token JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        req.user = decoded;

        next();
    });
}


// Générer un ETag pour des données JSON et gérer la réponse en conséquence
function handleEtagResponse(req, res, data) {
    const dataETag = etag(JSON.stringify(data));

    if (req.headers['if-none-match'] === dataETag) {
        res.status(304).send();
        return false;
    } else {
        res.set('ETag', dataETag);
        return true;
    }
}

module.exports = { verifyToken, handleEtagResponse };
