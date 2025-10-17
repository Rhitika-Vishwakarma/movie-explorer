'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { tmdbApi } from '@/lib/api/tmdb';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favorites.length === 0) {
        setMovies([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const moviePromises = favorites.map((id) =>
          tmdbApi.getMovieDetails(id)
        );
        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">
          Your collection of favorite movies ({favorites.length})
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading favorites...</p>
        </div>
      ) : movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground">
            Start adding movies to your favorites to see them here
          </p>
        </div>
      )}
    </div>
  );
}