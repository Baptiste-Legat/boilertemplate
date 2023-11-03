# BoilerTemplate - Modèle de base pour une application Node.js avec API REST et MongoDB

BoilerTemplate est un modèle de base pour le développement d'une application Node.js qui inclut une API REST avec une entité utilisateur et utilise les technologies suivantes : npm, Express.js et MongoDB.

## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [MongoDB](https://www.mongodb.com/) installés sur votre système avant de commencer.

1. Clonez ce dépôt sur votre machine :

```
git clone https://github.com/BaptisteLegat/boilertemplate.git
```

2. Accédez au répertoire du projet :

```
cd boilertemplate
```

3. Installez les dépendances en utilisant npm :

```
npm install
```

4. Démarrez l'application :

```
npm start
```

L'application sera disponible à l'adresse [http://localhost:8080](http://localhost:8080).

## Fonctionnalités

- API REST pour gérer les utilisateurs (CRUD : Create, Read, Update, Delete).
- Gestion des utilisateurs avec MongoDB comme base de données.
- Express.js pour la gestion des routes et des contrôleurs.
- Tests unitaires avec Jest sur les contrôleurs et les services.

## Routes de l'API

Utiliser [Postman](https://www.postman.com/) pour tester les routes de l'API.

- `POST /api/login` : Se connecter à l'application.
- `GET /api/users` : Récupérer la liste de tous les utilisateurs.(nécéssite d'être connecté)
- `GET /api/users/:id` : Récupérer un utilisateur par ID.(nécéssite d'être connecté)
- `POST /api/users` : Créer un nouvel utilisateur.
- `PUT /api/users/:id` : Mettre à jour un utilisateur existant.(nécéssite d'être connecté)
- `DELETE /api/users/:id` : Supprimer un utilisateur par ID.(nécéssite d'être connecté)

## Contribuer

Si vous souhaitez contribuer à ce projet, n'hésitez pas à ouvrir des issues, à soumettre des demandes de tirage (pull requests) ou à proposer des améliorations.
