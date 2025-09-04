import { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/pokemonApi";

const PokemonContext = createContext();

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
      }, [ fetchPokemons]);


  return (
    <PokemonContext.Provider value={{ pokemons, error }}>
      {children}
    </PokemonContext.Provider>
  );
}

const usePokemons = () => {
  const [context, setContext] = useContext(PokemonContext);
return context;
};

export { PokemonProvider, usePokemons };