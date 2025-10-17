import { LoginForm } from '@/components/auth/LoginForm';
import { Film } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Film className="h-12 w-12" />
          <h1 className="text-3xl font-bold">MovieExplorer</h1>
          <p className="text-muted-foreground">
            Discover and explore amazing movies
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}