import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 1.0, rootMargin = '100px' } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            callback();
          }
        },
        { threshold, rootMargin }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, callback, threshold, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
}