'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { tmdbApi } from '@/lib/api/tmdb';
import { ROUTES } from '@/lib/constants';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  return (
    <Link href={ROUTES.MOVIE_DETAIL(movie.id)}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform group-hover:scale-105"
            priority={false}
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-5 w-5 ${
                favorite ? 'fill-red-500 text-red-500' : 'text-foreground'
              }`}
            />
          </Button>
        </div>

        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold line-clamp-2 text-sm mb-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-muted-foreground">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}