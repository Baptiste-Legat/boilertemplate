import User from '../model/userModels.js';

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
