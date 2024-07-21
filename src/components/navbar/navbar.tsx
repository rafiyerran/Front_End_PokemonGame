import { Link, useNavigate } from 'react-router-dom';

import './navbarstyles.css'; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <h2 className="text-base font-bold">Pokemon</h2>
      <div className="flex flex-row font-bold gap-10">
        <Link to="/">Pokemon Game</Link>

        <Link to="/pokedex">List Of Pokemon</Link>
        <Link to="/mypokemon">My Pokemon</Link>
        <Link to="/gamemap">Game Map</Link>
        <button className="flex flex-row font-bold gap-10" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar