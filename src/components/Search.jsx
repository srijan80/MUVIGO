import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const navigate = useNavigate();

  const API_KEY = '31546f9b0e671832ecdaa48be1889ed7';
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTU0NmY5YjBlNjcxODMyZWNkYWE0OGJlMTg4OWVkNyIsInN1YiI6IjY3NTk5YzA2ZGEzYmQzOWI4Nzg2MGU4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gck1ZvDLYbZbLhSHC5XNChFBjs_MMhClS8wBDz-bbGo';

  const fetchMovies = async () => {
    if (!query) return; 
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: API_KEY,
            query: query,
            language: 'en-US',
            page: 1,
            with_original_language: 'en',
          },
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovies(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };


  const isFavorite = (movie) => {
    return favorites.some(fav => fav.id === movie.id); 
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <button
        onClick={() => navigate("/movie")}
        className="m-4 gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Back
      </button>
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Search Movies</h2>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-md rounded-lg bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="px-4 ml-2 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-84 object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/450';
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.overview}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        window.open(`https://vidsrc.cc/v2/embed/movie/${movie.id}?autoPlay=true`, "_blank")
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                      Watch Now
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
