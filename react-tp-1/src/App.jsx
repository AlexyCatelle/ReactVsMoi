import { useEffect, useState } from "react";

import "./App.css";

function Search({ searchByNameTerm, handleSearchByName }) {
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
					placeholder="Rechercher un Pokémon"
				/>

				{/* Search par type */}
        
			</form>
		</>
	);
}

function List({ pokemons }) {
	if (pokemons.length === 0) {
		return <p>Aucun Pokémon trouvé</p>;
	}
	return (
		<ul>
			{pokemons.map((pokemon, index) => (
				<li key={index}>
					{pokemon.name} - {pokemon.type}
				</li>
			))}
		</ul>
	);
}

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [searchByNameTerm, setSearchByNameTerm] = useState(
		() => localStorage.getItem("searchByNameTerm") || "Forgelina"
	);

	const pokemonsData = [
		{ name: "Pikachu", type: "Électrik" },
		{ name: "Bulbizarre", type: "Plante" },
		{ name: "Salamèche", type: "Feu" },
		{ name: "Carapuce", type: "Eau" },
		{ name: "Forgelina", type: "Fée" },
		{ name: "Lixy", type: "Électrik" },
	];

	useEffect(() => {
		setPokemons(pokemonsData);
		localStorage.setItem("searchByNameTerm", searchByNameTerm);
	}, [searchByNameTerm, pokemonsData]);

	const filtered = pokemons.filter((p) =>
		p.name.toLowerCase().includes(searchByNameTerm.toLowerCase())
	);

	return (
		<>
			<Search
				searchByNameTerm={searchByNameTerm}
				handleSearchByName={setSearchByNameTerm}
			/>
			<List pokemons={filtered} />
		</>
	);
}

export default App;
