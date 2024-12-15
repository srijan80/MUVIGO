import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Components/Nav.jsx";

function Home() {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate('/movies');
  };

  const handleMusicClick = () => {
    navigate('/music');
  };
  const handleGameClick = () => {
    navigate('/games');
  };

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center h-[calc(85vh-26px)] w-auto overflow-hidden">
        <div className="text-center flex flex-col items-center ">
          <div className="flex gap-4">
            <button 
              onClick={handleMovieClick}
              className="bg-black text-white py-2.5 px-5 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Movie
            </button >
            <button onClick={handleMusicClick} className="bg-black text-white py-2.5 px-5 rounded-md hover:bg-gray-800 transition duration-300">
              Music
            </button>
            <button onClick={handleGameClick} className="bg-black text-white py-2.5 px-5 rounded-md hover:bg-gray-800 transition duration-300">
              Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;