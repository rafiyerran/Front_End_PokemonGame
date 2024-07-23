// PokemonGame.tsx
import { useState, useEffect } from 'react';
import '../pokemongame/pokemongame.css';

const pokemonData = [
  { id: 1, name: 'Pikachu', x: 100, y: 100 },
  { id: 2, name: 'Bulbasaur', x: 300, y: 200 },
  // Add more Pokémon here
];

const PokemonGame = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [capturedPokemon, setCapturedPokemon] = useState<number[]>([]);

  // Function to handle player movement
  const movePlayer = (direction: string) => {
    setPlayerPos(prev => {
      const newPos = { ...prev };
      switch (direction) {
        case 'ArrowUp':
          newPos.y = Math.max(0, newPos.y - 10); // Prevent moving above the map
          break;
        case 'ArrowDown':
          newPos.y = Math.min(550, newPos.y + 10); // Prevent moving below the map
          break;
        case 'ArrowLeft':
          newPos.x = Math.max(0, newPos.x - 10); // Prevent moving left of the map
          break;
        case 'ArrowRight':
          newPos.x = Math.min(750, newPos.x + 10); // Prevent moving right of the map
          break;
      }
      return newPos;
    });
  };

  // Function to handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    movePlayer(event.key);
  };

  // Add and remove event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); 
    };
  }, []);

  const capturePokemon = (pokemonId: number) => {
    setCapturedPokemon([...capturedPokemon, pokemonId]);
  };

  return (
    <div className="map-container">
      <div className="map">
        <div className="player" style={{ top: playerPos.y, left: playerPos.x }}></div>
        {pokemonData.map(pokemon => (
          <div
            key={pokemon.id}
            className="pokemon"
            style={{ top: pokemon.y, left: pokemon.x }}
            onClick={() => capturePokemon(pokemon.id)}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
      <div className="captured">
        <h2>Captured Pokémon</h2>
        {capturedPokemon.map(id => (
          <div key={id}>{pokemonData.find(p => p.id === id)?.name}</div>
        ))}
      </div>
    </div>
  );
};

export default PokemonGame;