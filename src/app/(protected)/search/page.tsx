'use client';

import { useState, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { SearchBar } from '@/components/movies/SearchBar';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { tmdbApi } from '@/lib/api/tmdb';

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await tmdbApi.searchMovies(query);
      setMovies(data.results);
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Search Movies</h1>
        <p className="text-muted-foreground">
          Find your favorite movies by title
        </p>
      </div>

      <div className="flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {hasSearched && (
        <>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          ) : (
            <>
              {movies.length > 0 ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Found {movies.length} results
                  </p>
                  <MovieGrid movies={movies} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No movies found. Try a different search term.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {!hasSearched && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Start typing to search for movies
          </p>
        </div>
      )}
    </div>
  );
}
