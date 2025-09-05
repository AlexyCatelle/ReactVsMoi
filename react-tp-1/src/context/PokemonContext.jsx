import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { api } from "../services/pokemonApi";

const PokemonContext = createContext();

function normalizePokemon(p) {
  return {
    id: p.pokedex_id,
    name: typeof p.name === "object" ? p.name.fr : p.name,
    types: Array.isArray(p.types) ? p.types.map((t) => t.name) : [p.type],
    sprite: p.sprites?.regular || null,
  };
}

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);  

  const fetchPokemons = useCallback(
    async (isRetry = false) => {
      try {
        setLoading(true);
        setError(null);

        if (isRetry) {
          setRetryCount((prev) => prev + 1);
          console.log(`Tentative ${retryCount + 1}...`);
        }

        const response = await api.get("gen/1");

        // Normalisation ici 👇
        const normalized = response.data.map(normalizePokemon);
        setPokemons(normalized);

        console.log("Données normalisées :", normalized[0]);

        setRetryCount(0);
      } catch (err) {
        console.error("Erreur:", err);
        setError({
          message: "Impossible de charger les Pokémon",
          details: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [retryCount]
  );

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  // ✅ Correction: Passer tous les états et fonctions dans value
  const contextValue = {
    pokemons,
    loading,
    error,
    fetchPokemons,
    retryCount
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

// ✅ Correction: Hook usePokemons simplifié
const usePokemons = () => {
  const context = useContext(PokemonContext);
  
  if (!context) {
    throw new Error('usePokemons must be used within a PokemonProvider');
  }
  
  return context;
};

export { PokemonProvider, usePokemons };