import { useEffect, useState, useCallback } from "react";
import { api } from "./services/pokemonApi";
import "./App.css";

// -----------------------------
// Normalisation des données
// -----------------------------
function normalizePokemon(p) {
  return {
    id: p.pokedex_id,
    name: typeof p.name === "object" ? p.name.fr : p.name,
    types: Array.isArray(p.types) ? p.types.map((t) => t.name) : [p.type],
    sprite: p.sprites?.regular || null,
  };
}

// -----------------------------
// Composant Search
// -----------------------------
function Search({
  searchByNameTerm,
  handleSearchByName,
  searchByTypeTerm,
  handleSearchByType,
  handleClear,
}) {
  return (
    <>
      <h2>Rechercher un Pokémon</h2>

      <form id="search-form">
        {/* Search par nom */}
        <label htmlFor="searchByName-input"> Par nom : </label>
        <input
          id="searchByName-input"
          type="text"
          value={searchByNameTerm}
          onChange={(e) => handleSearchByName(e.target.value)}
          placeholder="Rechercher par nom"
        />

        {/* Search par type */}
        <label htmlFor="searchByType-input"> Par type : </label>
        <input
          id="searchByType-input"
          type="text"
          value={searchByTypeTerm}
          onChange={(e) => handleSearchByType(e.target.value)}
          placeholder="Rechercher par type"
        />

        <button type="button" onClick={handleClear}>
          Reset
        </button>
      </form>
    </>
  );
}

// -----------------------------
// Composant List
// -----------------------------
function List({ pokemons }) {
  if (pokemons.length === 0) {
    return <p>Aucun Pokémon trouvé</p>;
  }
  return (
    <main>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.sprite && (
              <img src={pokemon.sprite} alt={pokemon.name} width={50} />
            )}
            {pokemon.name} - {pokemon.types.join(", ")}
          </li>
        ))}
      </ul>
    </main>
  );
}

// -----------------------------
// Composant App
// -----------------------------
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // -----------------------------
  // Fetch Pokémons
  // -----------------------------
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

  // -----------------------------
  // States pour les filtres
  // -----------------------------
  const [searchByNameTerm, setSearchByNameTerm] = useState(
    () => localStorage.getItem("searchByNameTerm") || ""
  );
  const [searchByTypeTerm, setSearchByTypeTerm] = useState("");

  // Bouton reset
  const handleClear = () => {
    setSearchByNameTerm("");
    setSearchByTypeTerm("");
  };

  // -----------------------------
  // useEffect
  // -----------------------------
  useEffect(() => {
    fetchPokemons();
    localStorage.setItem("searchByNameTerm", searchByNameTerm);
  }, [searchByNameTerm, fetchPokemons]);

  // -----------------------------
  // Filtre
  // -----------------------------
  const filtered = pokemons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchByNameTerm.toLowerCase()) &&
      p.types.some((t) =>
        t.toLowerCase().includes(searchByTypeTerm.toLowerCase())
      )
  );

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <>
      <h1>React - TP 1</h1>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {loading && <p>Chargement...</p>}

      <Search
        searchByNameTerm={searchByNameTerm}
        handleSearchByName={setSearchByNameTerm}
        searchByTypeTerm={searchByTypeTerm}
        handleSearchByType={setSearchByTypeTerm}
        handleClear={handleClear}
      />
      <List pokemons={filtered} />
    </>
  );
}

export default App;
