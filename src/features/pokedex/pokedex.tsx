// src/features/pokedex/Pokedex.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pokedex.css';
import { getPokemonByName, getPokemonList } from '../../services/axiosWithConfig';
import { Pokemon } from '../../services/getpokemon/type';

interface PokemonListItem {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const handleSearch = async () => {
    try {
      const response = await getPokemonByName(searchTerm.toLowerCase());
      setPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setPokemon(null);
    }
  };

  const handleClose = () => {
    setPokemon(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPokemonList(24, page * 2);
        const results = response.data.results;

        const detailedResults = await Promise.all(
          results.map(async (pokemon: PokemonListItem) => {
            const details = await axios.get(pokemon.url);
            return { ...pokemon, sprites: details.data.sprites };
          })
        );

        setPokemonList(detailedResults);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a Pokémon"
          className="search-input"
        />  
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="pokemon-container">
        {pokemon && (
          <div className="highlighted-pokemon">
            <button className="close-button" onClick={handleClose}>&times;</button>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon-info">
              <p className="label">Types:</p>
              {pokemon.types.map((typeInfo) => (
                <p key={typeInfo.type.name}>{typeInfo.type.name}</p>
              ))}
              <p className="label">Abilities:</p>
              {pokemon.abilities.map((abilityInfo) => (
                <p key={abilityInfo.ability.name}>{abilityInfo.ability.name}</p>
              ))}
              <p className="label">Stats:</p>
              {pokemon.stats.map((statInfo) => (
                <div key={statInfo.stat.name} className="stat-bar">
                  <p className="stat-name">{statInfo.stat.name}: </p>
                  <div className="bar-background">
                    <div
                      className="bar-fill"
                      style={{ width: `${statInfo.base_stat * 1.2}px` }} // Adjust multiplier for bar length
                    />
                  </div>
                  <p className="stat-value">{statInfo.base_stat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <Link to={`/pokedex/${pokemon.name}`} key={pokemon.name} className="pokemon-card">
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            </Link>
            
          ))}
        </div>
      </div>

      <div className="pagination-buttons">
        <button 
          className="pagination-button" 
          onClick={() => setPage(page - 1)} 
          disabled={page === 0}
        >
          Previous
        </button>
        <button 
          className="pagination-button" 
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
