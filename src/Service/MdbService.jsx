import axios from 'axios';

const API_KEY = '31546f9b0e671832ecdaa48be1889ed7';
const BASE_URL = 'https://api.themoviedb.org/3';

// Search for a movie based on title
export const searchMovie = async (movieTitle) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: movieTitle,
        language: 'en-US', // Ensure the search is in English
        page: 1, // Ensure you're searching the first page of results
      }
    });

    // Check if there are any results
    if (response.data.results.length > 0) {
      return response.data.results[0]; // Return the first result
    } else {
      console.error('No movie found for title:', movieTitle);
      return null;
    }
  } catch (error) {
    console.error('Error searching movie:', error);
    return null;
  }
};

// Get movie recommendations based on movie ID
export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: 'en-US', // Ensure the recommendations are in English
        page: 1, // Get the first page of recommendations
      }
    });

    // Check if recommendations exist
    if (response.data.results && response.data.results.length > 0) {
      // Return first 4 recommendations
      return response.data.results.slice(0, 4); 
    } else {
      console.error('No recommendations found for movie ID:', movieId);
      return [];
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};
