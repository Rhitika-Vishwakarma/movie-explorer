import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}