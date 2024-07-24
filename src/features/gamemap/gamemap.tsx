// GameMap.tsx

import './gamemap.css';

import mapImage from '../../assets/mapRegion1.png'

// Adjust the path as necessary


function GameMap () {
   return (
      <div className="game-map">
        <img src={mapImage} alt="Game Map" className="map-image" />
      </div>
    );
};

export default GameMap;
