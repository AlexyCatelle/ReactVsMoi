export function HomePage({pokemons}) {
  if (pokemons.length === 0) {
    return <p>Aucun Pokémon trouvé</p>;
  }
  return (
    <main>
      <h2>Liste des Pokémon</h2>
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
};
