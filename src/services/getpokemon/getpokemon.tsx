
// src/api/pokemonService.ts

import { axiosInstance } from "./axiosWithConfig";
import { Pokemon } from "./type";

export const getPokemon = async (pokemonName: string): Promise<Pokemon> => {
  try {
    const response = await axiosInstance.get<Pokemon>(`/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};
