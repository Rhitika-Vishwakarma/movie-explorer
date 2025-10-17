'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { MovieGridSkeleton } from '@/components/movies/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { tmdbApi } from '@/lib/api/tmdb';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/movies/popular?page=${pageNum}`);
      const data = await response.json();
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  const lastElementRef = useInfiniteScroll(
    loadMore,
    page < totalPages,
    isLoading
  );

  if (error && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-destructive mb-4">{error}</p>
        <Button onClick={() => fetchMovies(1)}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Popular Movies</h1>
        <p className="text-muted-foreground">
          Discover the most popular movies right now
        </p>
      </div>

      <MovieGrid movies={movies} isLoading={isLoading && page === 1} />

      {isLoading && page > 1 && (
        <div className="py-8">
          <MovieGridSkeleton count={6} />
        </div>
      )}

      {!isLoading && page < totalPages && (
        <div ref={lastElementRef} className="flex justify-center py-8">
          <Button onClick={loadMore} size="lg">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
