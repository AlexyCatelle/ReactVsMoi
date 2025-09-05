## Exercice : Gestionnaire de tâches avec useReducer

**Objectif :** Créer un composant simple de liste de tâches utilisant `useReducer` au lieu de `useState`.

**Durée estimée :** 60 minutes

### Consignes :

1. **Créer le reducer** qui gère ces actions :
   - `ADD_TASK` : ajouter une tâche
   - `TOGGLE_TASK` : marquer/démarquer comme terminée
   - `DELETE_TASK` : supprimer une tâche

2. **State initial :**
```javascript
const initialState = {
  tasks: [],
  nextId: 1
};
```

3. **Interface à créer :**
   - Un input pour ajouter une nouvelle tâche
   - Un bouton "Ajouter"
   - Liste des tâches avec :
     - Texte de la tâche
     - Checkbox pour marquer terminé/non terminé
     - Bouton "Supprimer"

4. **Bonus (si temps) :**
   - Compteur du nombre de tâches restantes
   - Filtre "Toutes" / "Terminées" / "En cours"

### Structure suggérée :
```javascript
// 1. Définir le reducer
// 2. Utiliser useReducer dans le composant
// 3. Créer les fonctions de dispatch pour chaque action
// 4. Rendre l'interface
```