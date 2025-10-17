'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { favoritesStorage } from '@/lib/utils/localStorage';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = favoritesStorage.get();
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (movieId: number) => {
    if (!favorites.includes(movieId)) {
      const newFavorites = [...favorites, movieId];
      setFavorites(newFavorites);
      favoritesStorage.set(newFavorites);
    }
  };

  const removeFavorite = (movieId: number) => {
    const newFavorites = favorites.filter(id => id !== movieId);
    setFavorites(newFavorites);
    favoritesStorage.set(newFavorites);
  };

  const toggleFavorite = (movieId: number) => {
    if (favorites.includes(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  const getFavoritesCount = () => favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        getFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};