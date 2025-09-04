# TP React Context - Gestionnaire de Pokémons NIVEAU 2

- Découvrir et maîtriser **useContext** et **Context API**
- Comprendre la différence avec le **props drilling**
- Pratiquer **useState**, **useEffect** et **react-router**
- Gérer un état global partagé entre composants

---

## Mission : Créer un Pokédex interactif !

Vous allez étoffer votre application Pokédex avec les features suivantes :

- Consulter une liste de Pokémons (API)
- Ajouter des Pokémons à leurs favoris
- Capturer des Pokémons dans leur équipe
- Voir leur profil de dresseur avec statistiques

---

## Cahier des charges

### **Fonctionnalités principales :**

1. **Page d'accueil** : Liste de 20 Pokémons avec image et nom
2. **Page détail** : Fiche complète d'un Pokémon + actions (favoris/capturer)
3. **Page favoris** : Liste des Pokémons favoris
4. **Page équipe** : Équipe du dresseur (max 6 Pokémons)
5. **Profil dresseur** : Statistiques et informations

### **États globaux à gérer :**

- **Profil dresseur** (nom, level, badges)
- **Liste des favoris**
- **Équipe de Pokémons** (max 6)
- **Statistiques** (total capturés, favoris, etc.)

## Architecture

Créez la structure suivante :

---

```
src/
├── context/
│   └── PokemonContext.js
├── services/
│   └── pokemonApi.js
├── components/
│   ├── Navigation.js
│   ├── PokemonCard.js
│   └── TrainerProfile.js
├── pages/
│   ├── HomePage.js
│   ├── PokemonDetail.js
│   ├── FavoritesPage.js
│   ├── TeamPage.js
│   └── ProfilePage.js
└── App.js

```