import { NextRequest, NextResponse } from 'next/server';
import { tmdbApi } from '@/lib/api/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = parseInt(params.id);

    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const data = await tmdbApi.getMovieDetails(movieId);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}