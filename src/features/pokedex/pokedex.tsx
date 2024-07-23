import './pokedex.css';
import { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Pokemon } from '../../services/getpokemon/type';
import axios from 'axios';
import { getPokemonByName, getPokemonGifUrl, getPokemonList } from '../../services/getpokemon/axiosWithConfig';

interface PokemonListItem {
  name: string;
  url: string;
  id: number; // Add id property
}

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

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
      setLoading(true);
      try {
        const response = await getPokemonList(24, page * 24);
        const results = response.data.results;

        const totalCount = response.data.count;
        setTotalPages(Math.ceil(totalCount / 24));

        const detailedResults = await Promise.all(
          results.map(async (pokemon: PokemonListItem) => {
            const details = await axios.get(pokemon.url);
            return { ...pokemon, id: details.data.id };
          })
        );

        setPokemonList(detailedResults);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const getPokemonSpriteUrl = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const renderPaginationButtons = () => {
    const buttons = []; 
    const startPage = Math.max(0, Math.min(page - 4, totalPages - 9));
    const endPage = Math.min(totalPages, startPage + 9);

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${i === page ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

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
            <img src={getPokemonGifUrl(pokemon.id)} alt={pokemon.name} />
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
                      style={{ width: `${statInfo.base_stat * 1.2}px` }}
                    />
                  </div>
                  <p className="stat-value">{statInfo.base_stat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="loader-container">
            <GridLoader color="#36D7B7" />
          </div>
        ) : (
          <div className="pokemon-grid">
            {pokemonList.map((pokemon) => (
              <Link to={`/pokedex/${pokemon.name}`} key={pokemon.name} className="pokemon-card">
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <img src={getPokemonSpriteUrl(pokemon.id)} alt={pokemon.name} className="pokemon-image" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
