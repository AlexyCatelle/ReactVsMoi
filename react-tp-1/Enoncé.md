# TP1 - Construire le Minipokédex

## Contexte

Vous venez d’être embauchés par le Professeur Chen pour développer la première version d’un **Pokédex React**.

L’objectif est simple : permettre aux dresseurs de **chercher un Pokémon par son nom** dans une petite liste d’espèces disponibles.

Mais le Professeur Chen est exigeant :

- Le champ de recherche doit être **souvenu** entre deux sessions (grâce au `localStorage`).
- Si l’application est rechargée, le dernier Pokémon recherché doit réapparaître dans l’input.

---

## Consignes

1. Dans `App` :
    - Créez un état `searchTerm` initialisé depuis `localStorage` (ou `'Pikachu'` si rien n’est stocké).
    - Créez une liste statique de Pokémon :
        
        ```jsx
        const pokemons = [
          { name: 'Pikachu', type: 'Électrik' },
          { name: 'Bulbizarre', type: 'Plante' },
          { name: 'Salamèche', type: 'Feu' },
          { name: 'Carapuce', type: 'Eau' },
        ];
        ```
        
2. Ajoutez un composant `Search` :
    - Input texte contrôlé par `searchTerm`.
    - Appelle un **callback handler** passé par `App` pour mettre à jour le state.
3. Dans `App`, filtrez la liste :
    - Affichez uniquement les Pokémon dont le `name` contient le `searchTerm` (case-insensitive).
    - Passez cette liste filtrée au composant `List`.
4. Ajoutez un **useEffect** pour :
    - Sauvegarder `searchTerm` dans `localStorage` à chaque changement.
5. (Bonus) Créez un **custom hook** `useLocalStorageState(key, initialValue)` pour encapsuler cette logique et rendre le code plus propre.

---

## Résultat attendu

Interface simple :

```
🔍 Rechercher un Pokémon : [Pikachu]

Résultats :
- Pikachu (Électrik)

```

Si je tape `Carap`, le résultat devient :

```
Résultats :
- Carapuce (Eau)

```

Si je vide l’input et recharge la page → `Pikachu` revient automatiquement.

---

## Bonus

- Ajoutez un second filtre par **type** (Plante, Feu, Eau…).
- Ajoutez un état “No results” quand la liste filtrée est vide.
- Ajoutez un bouton “Clear search” qui réinitialise l’input.

---