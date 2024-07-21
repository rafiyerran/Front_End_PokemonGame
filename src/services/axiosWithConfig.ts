// src/services/pokemonService.ts
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

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
