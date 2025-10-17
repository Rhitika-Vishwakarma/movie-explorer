import { NextRequest, NextResponse } from 'next/server';
import { tmdbApi } from '@/lib/api/tmdb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');

    const data = await tmdbApi.getPopularMovies(page);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}