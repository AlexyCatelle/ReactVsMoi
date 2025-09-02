import { useEffect, useState } from "react";

import "./App.css";

function Search({
	searchByNameTerm,
	handleSearchByName,
	searchByTypeTerm,
	handleSearchByType,
  handleClear
}) {
	return (
		<>
			<h2>Rechercher un Pokémon</h2>

			<form>
				{/*Search par nom */}
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

        <button type="button" onClick={handleClear}>Reset</button>
			</form>
		</>
	);
}

function List({ pokemons }) {
	if (pokemons.length === 0) {
		return <p>Aucun Pokémon trouvé</p>;
	}
	return (
		<main>
			<ul>
				{pokemons.map((pokemon, index) => (
					<li key={index}>
						{pokemon.name} - {pokemon.type}
					</li>
				))}
			</ul>
		</main>
	);
}

function App() {
	const [pokemons, setPokemons] = useState([]);
	//----------------------------------------------------------------
	// Fake data -- START

	const pokemonsData = [
		{ name: "Pikachu", type: "Électrik" },
		{ name: "Bulbizarre", type: "Plante" },
		{ name: "Salamèche", type: "Feu" },
		{ name: "Carapuce", type: "Eau" },
		{ name: "Forgelina", type: "Fée" },
		{ name: "Lixy", type: "Électrik" },
	];

	// Fake data -- END
	//----------------------------------------------------------------

	//----------------------------------------------------------------
	// State pour les filtres -- START

	// Search par nom
	const [searchByNameTerm, setSearchByNameTerm] = useState(
		() => localStorage.getItem("searchByNameTerm") || "Forgelina"
	);

	// Search par type
	const [searchByTypeTerm, setSearchByTypeTerm] = useState("");

	// State pour les filtres -- END
	//----------------------------------------------------------------

	//----------------------------------------------------------------
	// Handles -- START
	// Bouton reset
	const handleClear = () => {
		setSearchByNameTerm("");
    setSearchByTypeTerm("");
	};
	// Handles -- END
	//----------------------------------------------------------------

	useEffect(() => {
		setPokemons(pokemonsData);
		localStorage.setItem("searchByNameTerm", searchByNameTerm);
	}, [searchByNameTerm, pokemonsData]);

	const filtered = pokemons.filter(
		(p) =>
			p.name.toLowerCase().includes(searchByNameTerm.toLowerCase()) &&
			p.type.toLowerCase().includes(searchByTypeTerm.toLowerCase())
	);

	return (
		<>
			<h1>React - TP 1</h1>

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
