// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import MyPokemon from "../features/mypokemon/mypokemon";
import GameMap from "../features/gamemap/gamemap";  
import PokemonGame from "../features/pokemongame/pokemongame";
import Pokedex from "../features/pokedex/pokedex";
import PokemonDetails from "../features/pokemondetails/pokemondetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PokemonGame  />,
      },  
      {
        path: "/pokedex",
        element: <Pokedex  />,
      },
      {
        path: '/pokedex/:name',
        element: <PokemonDetails />,
      },
      {
        path :"/mypokemon",
        element : <MyPokemon/>
      },
      {
        path :"/gamemap",
        element : <GameMap/>
      },
    ],
  },
]);
