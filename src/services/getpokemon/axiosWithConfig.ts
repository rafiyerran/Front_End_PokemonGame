// src/services/pokemonService.ts
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';
const GIF_BASE_URL = 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated';


export const getPokemonList = (limit: number, offset: number) => {
  return axios.get(`${API_URL}/pokemon`, {
    params: {
      limit,
      offset,
    },
  });
};

export const getPokemonByName = (name: string) => {
  return axios.get(`${API_URL}/pokemon/${name}`);
};

export const getPokemonGifUrl = (pokemonId: number) => {
  return `${GIF_BASE_URL}/${pokemonId}.gif?raw=true`;
};

export const axiosInstance = axios.create({
  
})