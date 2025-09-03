# TP : Mini Blog React

Cet exercice vise à utiliser React, React-Router et Axios

---

## Setup rapide

```bash
npm vite@latest create mini-blog --template react
cd mini-blog
npm install axios react-router-dom
npm start
```

**API utilisée** : `https://jsonplaceholder.typicode.com`

---

## Architecture recommandée

```
src/
├── components/
│   ├── PostCard.js
│   ├── PostForm.js
│   └── Navigation.js
├── pages/
│   ├── PostsPage.js
│   ├── PostDetailPage.js
│   └── CreatePostPage.js
├── services/
│   └── api.js
└── App.js

```

**Routes à créer** :

- `/` → Liste des articles
- `/post/:id` → Détail d'un article
- `/create` → Créer un article

---