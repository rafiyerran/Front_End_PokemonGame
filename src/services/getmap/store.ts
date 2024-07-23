// store.ts
import create from 'zustand';

interface GameState {
  playerPos: { x: number; y: number };
  capturedPokemon: number[];
  movePlayer: (direction: string) => void;
  capturePokemon: (pokemonId: number) => void;
}

export const useStore = create<GameState>(set => ({
  playerPos: { x: 0, y: 0 },
  capturedPokemon: [],
  movePlayer: direction => set(state => {
    const newPos = { ...state.playerPos };
    switch (direction) {
      case 'up':
        newPos.y -= 10;
        break;
      case 'down':
        newPos.y += 10;
        break;
      case 'left':
        newPos.x -= 10;
        break;
      case 'right':
        newPos.x += 10;
        break;
    }
    return { playerPos: newPos };
  }),
  capturePokemon: pokemonId => set(state => ({
    capturedPokemon: [...state.capturedPokemon, pokemonId]
  }))
}));
