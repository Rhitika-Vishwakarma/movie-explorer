import { LOCAL_STORAGE_KEYS } from '../constants';

export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export const authStorage = {
  getToken: () => storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
  setToken: (token: string) => storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token),
  removeToken: () => storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
  getUser: () => storage.get<any>(LOCAL_STORAGE_KEYS.USER_DATA),
  setUser: (user: any) => storage.set(LOCAL_STORAGE_KEYS.USER_DATA, user),
  removeUser: () => storage.remove(LOCAL_STORAGE_KEYS.USER_DATA),
  clearAuth: () => {
    authStorage.removeToken();
    authStorage.removeUser();
  },
};

export const favoritesStorage = {
  get: () => storage.get<number[]>(LOCAL_STORAGE_KEYS.FAVORITES) || [],
  set: (favorites: number[]) => storage.set(LOCAL_STORAGE_KEYS.FAVORITES, favorites),
  add: (movieId: number) => {
    const favorites = favoritesStorage.get();
    if (!favorites.includes(movieId)) {
      favoritesStorage.set([...favorites, movieId]);
    }
  },
  remove: (movieId: number) => {
    const favorites = favoritesStorage.get();
    favoritesStorage.set(favorites.filter(id => id !== movieId));
  },
  toggle: (movieId: number) => {
    const favorites = favoritesStorage.get();
    if (favorites.includes(movieId)) {
      favoritesStorage.remove(movieId);
    } else {
      favoritesStorage.add(movieId);
    }
  },
  has: (movieId: number) => favoritesStorage.get().includes(movieId),
};