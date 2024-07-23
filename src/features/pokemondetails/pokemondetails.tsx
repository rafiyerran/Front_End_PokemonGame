import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pokemondetails.css';
import { GridLoader } from 'react-spinners';
import { getPokemonByName, getPokemonGifUrl } from '../../services/getpokemon/axiosWithConfig';
import { Pokemon } from '../../services/getpokemon/type';

const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (name) {
        setLoading(true);
        try {
          const response = await getPokemonByName(name);
          setPokemon(response.data);
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPokemon();
  }, [name]);


    let content;

    if (loading) {
      content = (
        <div className="loader-container">
          <GridLoader color="#36D7B7" />
        </div>
      );
    } else if (pokemon) {
      content = (
      <div className="details-card">
        <div className="details-header">
          <h1 className="details-title">{pokemon.name}</h1>
          <img src={getPokemonGifUrl(pokemon.id)} alt={pokemon.name} className="details-image" />
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
                    <div className="bar-fill" style={{ width: `${stat.base_stat * 3.5}px` }} />
                  </div>
                  <p className="stat-value">{stat.base_stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = <p>Error loading Pokémon details.</p>;
  }

  return (
    <div className="details-container">
      {content}
    </div>
  );
};

export default PokemonDetails;
