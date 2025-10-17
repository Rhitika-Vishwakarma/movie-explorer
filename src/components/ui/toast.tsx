'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-background border',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-green-600 text-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Toast.displayName = 'Toast';

export { Toast };