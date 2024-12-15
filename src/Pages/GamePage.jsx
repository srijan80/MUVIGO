import React, { useState } from 'react';
import InputBox from '../Components/InputBox';
import { searchGame, getGameRecommendations } from '../Service/GameAPI';

export const Game = () => {
  const [searchText, setSearchText] = useState('');
  const [similarGames, setSimilarGames] = useState([]);

  const handleSearch = async (inputText) => {
    setSearchText(inputText);
    try {
      const game = await searchGame(inputText);
      if (game) {
        console.log(`Game found: ${game.name} (ID: ${game.id})`);
        const recommendations = await getGameRecommendations(game.id);
        setSimilarGames(recommendations);
        console.log('Recommendations:', recommendations);
      } else {
        console.warn(`No game found for "${inputText}"`);
        setSimilarGames([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      setSimilarGames([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-black p-6 text-center text-3xl font-semibold">
        <h1>Welcome to Muvigo</h1>
        <p className="text-lg mt-2">Find similar games based on your search!</p>
      </div>
      <div className="flex justify-center p-4">
        <InputBox onSearch={handleSearch} />
      </div>
      {searchText && (
        <div className="text-center text-white mt-2">
          <p className="text-xl font-semibold">Searching for: <span className="italic">{searchText}</span></p>
        </div>
      )}
      {similarGames.length > 0 ? (
        <div className="mt-2">
          <h2 className="text-white text-xl font-semibold text-center mb-6">Similar Games:</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {similarGames.map((game) => (
              <div key={game.id} className="bg-gray-800 text-white p-4 rounded-lg w-72 shadow-lg hover:shadow-xl transition-all">
                {game.background_image ? (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-56 object-contain rounded-md"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-700 flex items-center justify-center rounded-md">
                    No Image Available
                  </div>
                )}
                <h3 className="text-lg mt-4 text-center">{game.name}</h3>
                {game.genres && (
                  <p className="text-sm text-center text-gray-400 mt-2">
                    {game.genres.map((genre) => genre.name).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        searchText && <p className="text-center text-white mt-6">No recommendations found.</p>
      )}
    </div>
  );
};