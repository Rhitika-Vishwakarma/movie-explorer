import { Film } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5" />
            <span className="font-semibold">MovieExplorer</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} MovieExplorer. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground">
            Powered by TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}