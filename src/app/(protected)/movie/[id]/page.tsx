import { MovieDetail } from '@/components/movies/MovieDetail';
import { notFound } from 'next/navigation';
import { tmdbApi } from '@/lib/api/tmdb';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  try {
    const movieId = parseInt(params.id);
    
    if (isNaN(movieId)) {
      notFound();
    }

    // Call TMDB directly from server component
    const movie = await tmdbApi.getMovieDetails(movieId);

    return (
      <div>
        <MovieDetail movie={movie} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    notFound();
  }
}