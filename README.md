# marsai# MarsAi 🚀

Application web composée d'un **frontend** et d'un **backend** 

## 📁 Structure du projet

```
marsai/
├── MarsAi/          # Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── marsai-api/      # Backend API
│   ├── src/
│   ├── routes/
│   └── package.json
│
└── README.md
```

---

## 🛠️ Technologies utilisées

### Frontend

* [React / Vue / Angular]
* JavaScript / TypeScript
* CSS / Tailwind / autre
* Vite

### Backend

* Node.js
* Express.js
* Base de données : MySQL
* API REST

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone git@github.com:Alexandre-Ck/marsai.git

cd marsai
```

---

## 🚀 Installation du Frontend

Se rendre dans le dossier frontend :

```bash
cd MarsAi
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:XXXX
```

Lancer le frontend :

```bash
npm run dev
```

---

## 🔥 Installation du Backend

Se rendre dans le dossier backend :

```bash
cd marsai-api
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` :

```env
PORT=XXXX
DATABASE_URL=
```

Lancer le serveur :

```bash
npm run dev
```

---

## 🌐 Fonctionnement

Le frontend communique avec le backend via une API REST.

Architecture :

```
Utilisateur
    |
    ↓
Frontend
    |
    ↓
API Backend
    |
    ↓
Base de données
```

---

## 📌 Fonctionnalités

* [ ] Authentification utilisateur
* [ ] Gestion des utilisateurs
* [ ] Gestion des données
* [ ] Interface responsive
* [ ] API sécurisée

*(À compléter selon les fonctionnalités réelles du projet)*

---

## 🔐 Variables d'environnement

Les fichiers `.env` ne sont pas versionnés pour des raisons de sécurité.

Chaque développeur doit créer son propre fichier `.env` local.

---

## 👨‍💻 Développement

Créer une nouvelle branche :

```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

Après modification :

```bash
git add .
git commit -m "Description du changement"
git push
```

---

## 📄 Licence

Projet privé — Tous droits réservés.

