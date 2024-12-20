import axios from 'axios';

const API_KEY = '31546f9b0e671832ecdaa48be1889ed7';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovie = async (movieTitle) => { //get search text here from moviepage
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: movieTitle,
        language: 'en-US',
        page: 1,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0]; 
    } else {
      console.warn(`No movie found for title: "${movieTitle}"`);
      return null;
    }
  } catch (error) {
    console.error('Error searching for movie:', error.message);
    throw error; 
  }
};

// Get movie recommendations by movie ID
export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results.slice(0, 4); 
    } else {
      console.warn(`No recommendations found for movie ID: ${movieId}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    throw error; 
  }
};
