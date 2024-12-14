import React, { useState } from 'react';
import InputBox from '../Components/InputBox';
import { MusicAPI, getRecommendations } from '../Service/MusicAPI';

export const Music = () => {
  const [searchText, setSearchText] = useState('');
  const [similarMusic, setSimilarMusic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (inputText) => {
    setSearchText(inputText); 
    setSimilarMusic([]);
    setLoading(true);
    setError(null);

    try {
      const recommendations = await getRecommendations(inputText); //send search text to api service
      
      if (recommendations.length > 0) {
        setSimilarMusic(recommendations);
      } else {
        const searchResults = await MusicAPI(inputText);
        
        if (searchResults.length > 0) {
          setSimilarMusic(searchResults);
          setError('No exact recommendations found. Showing search results.');
        } else {
          setError(`No music found for "${inputText}"`);
        }
      }
    } catch (error) {
      console.error('Error in search process:', error);
      setError('An error occurred while searching for music.');
      setSimilarMusic([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-black p-6 text-center text-3xl font-semibold">
        <h1>Welcome to Muvigo</h1>
        <p className="text-lg mt-2">Find similar music based on your search!</p>
      </div>
      
      <div className="flex justify-center p-4">
        <InputBox onSearch={handleSearch} />
      </div>

      {searchText && (
        <div className="text-center text-white mt-2">
          <p className="text-xl font-semibold">
            Searching for: <span className="italic">{searchText}</span>
          </p>
        </div>
      )}

      {loading ? (
        <p className="text-center text-white mt-6">Loading recommendations...</p>
      ) : error ? (
        <p className="text-center text-yellow-400 mt-6">{error}</p>
      ) : similarMusic.length > 0 ? (
        <div className="mt-2">
          <h2 className="text-white text-xl font-semibold text-center mb-6">
            Similar Music:
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {similarMusic.map((track) => (
              <div 
                key={track.id} 
                className="bg-gray-800 text-white p-4 rounded-lg w-72 shadow-lg hover:shadow-xl transition-all"
              >
                {track.cover ? (
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-56 object-contain rounded-md"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-700 flex items-center justify-center rounded-md">
                    No Image Available
                  </div>
                )}
                <h3 className="text-lg mt-4 text-center">{track.title}</h3>
                <p className="text-sm text-center text-gray-400">{track.artist}</p>
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