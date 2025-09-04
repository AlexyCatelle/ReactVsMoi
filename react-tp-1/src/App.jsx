import { useEffect, useState } from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { PokemonProvider, usePokemons } from "./context/PokemonContext.jsx";

// Composant interne qui utilise le context
function AppContent() {
  const { pokemons, loading, error, fetchPokemons } = usePokemons();
  
  // États pour les filtres
  const [searchByNameTerm, setSearchByNameTerm] = useState(
    () => localStorage.getItem("searchByNameTerm") || ""
  );
  const [searchByTypeTerm, setSearchByTypeTerm] = useState("");

  // Bouton reset
  const handleClear = () => {
    setSearchByNameTerm("");
    setSearchByTypeTerm("");
  };

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem("searchByNameTerm", searchByNameTerm);
  }, [searchByNameTerm]);

  // Filtre
  const filtered = pokemons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchByNameTerm.toLowerCase()) &&
      p.types.some((t) =>
        t.toLowerCase().includes(searchByTypeTerm.toLowerCase())
      )
  );

  return (
    <>
      <h1>React - TP 3</h1>
      
      {error && (
        <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
          <p>❌ {error.message}</p>
          <p>Détails: {error.details}</p>
          <button onClick={() => fetchPokemons(true)}>Réessayer</button>
        </div>
      )}
      
      {loading && <p>Chargement des Pokémon...</p>}

      {/* Composant de recherche (à créer) */}
      <div>
        <h2>Rechercher un Pokémon</h2>
        <input
          type="text"
          value={searchByNameTerm}
          onChange={(e) => setSearchByNameTerm(e.target.value)}
          placeholder="Rechercher par nom"
        />
        <input
          type="text"
          value={searchByTypeTerm}
          onChange={(e) => setSearchByTypeTerm(e.target.value)}
          placeholder="Rechercher par type"
        />
        <button onClick={handleClear}>Reset</button>
      </div>

      <HomePage pokemons={filtered} />
    </>
  );
}

function App() {
  return (
    <PokemonProvider>
      <AppContent />
    </PokemonProvider>
  );
}

export default App;