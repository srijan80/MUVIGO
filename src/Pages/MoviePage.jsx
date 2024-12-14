import React, { useState } from 'react';
import InputBox from '../Components/InputBox'; // Assuming InputBox is in the same folder
import { searchMovie, getMovieRecommendations } from '../Service/MdbService'; // API calls

export const Movie = () => {
  const [searchText, setSearchText] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);

  // Handle search and fetch similar movies
  const handleSearch = async (inputText) => {
    setSearchText(inputText);
    
    try {
      const movie = await searchMovie(inputText); // Search for the movie
      if (movie) {
        const recommendations = await getMovieRecommendations(movie.id); // Get movie recommendations
        setSimilarMovies(recommendations); // Set the recommendations to state
      } else {
        setSimilarMovies([]); // If no movie found, reset recommendations
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setSimilarMovies([]); // Reset if there's an error
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-black p-6 text-center text-3xl font-semibold">
        <h1>Welcome to Muvigo</h1>
        <p className="text-lg mt-2">Find similar movies based on your search!</p>
      </div>
      
      <div className="flex justify-center p-4">
        <InputBox onSearch={handleSearch} />
      </div>

      {searchText && (
        <div className="text-center text-white mt-2">
          <p className="text-xl font-semibold">Searching for: <span className="italic">{searchText}</span></p>
        </div>
      )}

      {similarMovies.length > 0 ? (
        <div className="mt-2">
          <h2 className="text-white text-xl font-semibold text-center mb-6">Similar Movies:</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {similarMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg w-72 shadow-lg hover:shadow-xl transition-all">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 object-contain rounded-md"
                />
                <h3 className="text-lg mt-4 text-center">{movie.title}</h3>
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
