import { NextRequest, NextResponse } from 'next/server';
import { tmdbApi } from '@/lib/api/tmdb';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const data = await tmdbApi.searchMovies(query, page);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error searching movies:', error);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    );
  }
}