import { MovieDetail } from '@/components/movies/MovieDetail';
import { notFound } from 'next/navigation';

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

    // Fetch from your API route instead of direct TMDB
    const response = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      notFound();
    }

    const movie = await response.json();

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