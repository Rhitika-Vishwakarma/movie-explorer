import { TMDB_CONFIG, API_ENDPOINTS, IMAGE_SIZES } from '../constants';
import { Movie, MovieDetail, MoviesResponse } from '@/types/movie';
import { ApiResponse } from '@/types/api';

const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(`${TMDB_CONFIG.BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_CONFIG.API_KEY);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
};

export const tmdbApi = {
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const url = buildUrl(API_ENDPOINTS.POPULAR_MOVIES, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    
    return response.json();
  },

  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const url = buildUrl(API_ENDPOINTS.SEARCH_MOVIES, { query, page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    
    return response.json();
  },

  getMovieDetails: async (id: number): Promise<MovieDetail> => {
    const url = buildUrl(API_ENDPOINTS.MOVIE_DETAILS(id));
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    return response.json();
  },

  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const url = buildUrl(API_ENDPOINTS.TOP_RATED, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch top rated movies');
    }
    
    return response.json();
  },

  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const url = buildUrl(API_ENDPOINTS.NOW_PLAYING, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch now playing movies');
    }
    
    return response.json();
  },

  getImageUrl: (path: string | null, size: string = IMAGE_SIZES.POSTER.MEDIUM): string => {
    if (!path) return '/placeholder-movie.jpg';
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  },
};