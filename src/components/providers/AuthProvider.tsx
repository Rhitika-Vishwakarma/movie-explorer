'use client';

import { AuthProvider as AuthContextProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </AuthContextProvider>
  );
}