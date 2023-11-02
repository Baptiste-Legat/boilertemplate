import User from '../model/userModels.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware pour vérifier le token JWT
const jwtSecret = process.env.JWT_SECRET;

// Middleware pour vérifier le token JWT
export function verifyToken(req, res, next) {
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

// List all users
export async function listUsers(req, res) {
    
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            res.status(404).json({ error: "Aucun utilisateur n'a été trouvé" });
            return;
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Create a new user
export async function createUser(req, res) {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès", user});
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

// Get a user
export async function getUser(req, res) {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
  
// Update a user
export async function updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
  
// Delete a user
export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndRemove(req.params.userId);
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Login a user with JWT
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "L'email ou le mot de passe est incorrect" });
            return;
        }

        if (password !== user.password) {
            res.status(401).json({ error: "L'email ou le mot de passe est incorrect" });
            return;
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: "Connexion réussie", token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
