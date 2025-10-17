'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Film, Heart, LogOut, Search, User } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import { ROUTES } from '@/lib/constants';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const { getFavoritesCount } = useFavorites();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: ROUTES.MOVIES, label: 'Movies', icon: Film },
    { href: ROUTES.SEARCH, label: 'Search', icon: Search },
    { href: ROUTES.FAVORITES, label: 'Favorites', icon: Heart, badge: getFavoritesCount() },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={ROUTES.MOVIES} className="flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="font-bold text-xl">MovieExplorer</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="relative"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <div className="flex items-center gap-2 border-l pl-2">
            <div className="hidden md:flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}