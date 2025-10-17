export const TMDB_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
  BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
};

export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  MOVIE_DETAIL: (id: number) => `/movie/${id}`,
  FAVORITES: '/favorites',
  SEARCH: '/search',
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  FAVORITES: 'favorite_movies',
  THEME: 'theme',
};

export const API_ENDPOINTS = {
  POPULAR_MOVIES: '/movie/popular',
  SEARCH_MOVIES: '/search/movie',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  TOP_RATED: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
};

export const ITEMS_PER_PAGE = 20;