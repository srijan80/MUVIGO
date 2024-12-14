import axios from 'axios';

const LAST_FM_API_KEY = '729e6b6eb3068b3efa6694a5a88735cb';
const LAST_FM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

const generateFallbackImage = (title, artist) => {
  const titleInitial = title.charAt(0).toUpperCase();
  const artistInitial = artist.charAt(0).toUpperCase();
  
  return `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect width="100%" height="100%" fill="#2c3e50"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="120">
        ${titleInitial}${artistInitial}
      </text>
    </svg>`;
};

// Music Search Function
export const MusicAPI = async (musicTitle) => {
  try {
    const response = await axios.get(LAST_FM_BASE_URL, {
      params: {
        method: 'track.search',
        track: musicTitle,
        api_key: LAST_FM_API_KEY,
        format: 'json',
        limit: 5
      }
    });

    const tracks = response.data.results?.trackmatches?.track || [];
    
    if (tracks.length > 0) {
      return tracks.map(track => {
        const imageUrl = track.image && track.image.length > 0 
          ? track.image[3]['#text'] 
          : generateFallbackImage(track.name, track.artist);

        return {
          id: track.mbid || track.name,
          title: track.name,
          artist: track.artist,
          album: 'Unknown',
          preview: '',
          cover: imageUrl || generateFallbackImage(track.name, track.artist)
        };
      });
    } else {
      console.warn(`No music found for "${musicTitle}"`);
      return [];
    }
  } catch (error) {
    console.error('Last.fm Search Error:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const getMusicRecommendations = async (trackName, artistName) => {
  try {
    const response = await axios.get(LAST_FM_BASE_URL, {
      params: {
        method: 'track.getSimilar',
        track: trackName,
        artist: artistName,
        api_key: LAST_FM_API_KEY,
        format: 'json',
        limit: 4
      }
    });

    const similarTracks = response.data.similartracks?.track || [];
    
    if (similarTracks.length > 0) {
      return similarTracks.map(track => {
        const imageUrl = track.image && track.image.length > 0 
          ? track.image[3]['#text'] 
          : generateFallbackImage(track.name, track.artist.name);

        return {
          id: track.mbid || track.name,
          title: track.name,
          artist: track.artist.name,
          album: 'Unknown',
          preview: '',
          cover: imageUrl || generateFallbackImage(track.name, track.artist.name)
        };
      });
    } else {
      console.warn(`No similar tracks found for "${trackName}" by "${artistName}"`);
      return [];
    }
  } catch (error) {
    console.error('Similar Tracks Error:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const getRecommendations = async (musicTitle) => {
  try {
   
    const tracks = await MusicAPI(musicTitle);
    
    if (tracks.length > 0) {
      
      const firstTrack = tracks[0];
      return await getMusicRecommendations(firstTrack.title, firstTrack.artist);
    }
    
    return [];
  } catch (error) {
    console.error('Recommendation Process Error:', error);
    return [];
  }
};