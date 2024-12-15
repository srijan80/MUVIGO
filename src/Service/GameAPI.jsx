import axios from 'axios';

const API_KEY = '31a6afdeaa63487c9d56a27bf4a2a4c0';
const BASE_URL = 'https://api.rawg.io/api';

export const searchGame = async (gameTitle) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: gameTitle,
        page_size: 1,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    } else {
      console.warn(`No game found for title: "${gameTitle}"`);
      return null;
    }
  } catch (error) {
    console.error('Error searching for game:', error.message);
    throw error;
  }
};

export const getGameRecommendations = async (gameId) => {
  try {
    const gameDetails = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: {
        key: API_KEY,
      },
    });

    if (gameDetails.data.genres && gameDetails.data.genres.length > 0) {
      const genreIds = gameDetails.data.genres.map(genre => genre.id).join(',');
      const platformId = gameDetails.data.platforms && gameDetails.data.platforms.length > 0 
        ? gameDetails.data.platforms[0].platform.id 
        : '';

      const recommendationResponse = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: API_KEY,
          genres: genreIds,
          platforms: platformId,
          page_size: 4,
          exclude_game: gameId,
        },
      });

      return recommendationResponse.data.results || [];
    }

    const generalRecommendations = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        page_size: 4,
      },
    });

    return generalRecommendations.data.results || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    throw error;
  }
};