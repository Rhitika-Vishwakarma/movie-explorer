'use client';

import { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';
import { MovieGridSkeleton } from './LoadingSkeleton';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

export function MovieGrid({ movies = [], isLoading }: MovieGridProps) {
  if (isLoading) {
    return <MovieGridSkeleton />;
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No movies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}