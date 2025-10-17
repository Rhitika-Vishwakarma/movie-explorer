'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search movies...',
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}