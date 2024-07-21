// src/features/pokemondetails/PokemonDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pokemondetails.css';
import { getPokemonByName } from '../../services/axiosWithConfig';
import { Pokemon } from '../../services/getpokemon/type';

const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (name) {
        try {
          const response = await getPokemonByName(name);
          setPokemon(response.data);
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        }
      }
    };

    fetchPokemon();
  }, [name]);

  return (
    <div className="details-container">
      {pokemon ? (
        <div className="details-card">
          <div className="details-header">
            <h1 className="details-title">{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="details-image" />
          </div>
          <div className="details-body">
            <div className="info-section">
              <h2 className="section-title">General Information</h2>
              <p className="details-attribute"><strong>Height:</strong> {pokemon.height / 10} m</p>
              <p className="details-attribute"><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
              <p className="details-attribute"><strong>Base Experience:</strong> {pokemon.base_experience}</p>
            </div>
            <div className="info-section">
              <h2 className="section-title">Types</h2>
              <ul className="type-list">
                {pokemon.types.map(type => (
                  <li key={type.type.name} className={`type-item ${type.type.name}`}>
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-section">
              <h2 className="section-title">Abilities</h2>
              <ul className="ability-list">
                {pokemon.abilities.map(ability => (
                  <li key={ability.ability.name} className="ability-item">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-section">
              <h2 className="section-title">Stats</h2>
              <div className="stats-container">
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="stat-bar">
                    <p className="stat-name">{stat.stat.name}: </p>
                    <div className="bar-background">
                      <div
                        className="bar-fill"
                        style={{ width: `${stat.base_stat * 3.5}px` }} // Adjust multiplier for bar length
                      />
                    </div>
                    <p className="stat-value">{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
