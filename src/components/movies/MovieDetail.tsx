'use client';

import Image from 'next/image';
import { Heart, Star, Calendar, Clock } from 'lucide-react';
import { MovieDetail as MovieDetailType } from '@/types/movie';
import { Button } from '../ui/button';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { tmdbApi } from '@/lib/api/tmdb';
import { IMAGE_SIZES } from '@/lib/constants';

interface MovieDetailProps {
  movie: MovieDetailType;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <div className="space-y-6">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={tmdbApi.getImageUrl(movie.backdrop_path, IMAGE_SIZES.BACKDROP.LARGE)}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={tmdbApi.getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.LARGE)}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-lg text-muted-foreground italic">{movie.tagline}</p>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-muted-foreground">({movie.vote_count} votes)</span>
            </div>

            {movie.release_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
            )}

            {movie.runtime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{movie.runtime} min</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => toggleFavorite(movie.id)}
              variant={favorite ? 'default' : 'outline'}
              className="gap-2"
            >
              <Heart className={favorite ? 'fill-current' : ''} />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-semibold mb-1">Status</p>
              <p className="text-sm text-muted-foreground">{movie.status}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Original Language</p>
              <p className="text-sm text-muted-foreground uppercase">
                {movie.original_language}
              </p>
            </div>
            {movie.budget > 0 && (
              <div>
                <p className="text-sm font-semibold mb-1">Budget</p>
                <p className="text-sm text-muted-foreground">
                  ${movie.budget.toLocaleString()}
                </p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div>
                <p className="text-sm font-semibold mb-1">Revenue</p>
                <p className="text-sm text-muted-foreground">
                  ${movie.revenue.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};