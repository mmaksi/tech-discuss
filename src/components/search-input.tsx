'use client';

import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
      alert('Search for: ' + input);
    };

    return (
      <div className="flex items-center gap-2">
        <input
          type={type}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        <button onClick={handleSearch}>
          <Search />
        </button>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };