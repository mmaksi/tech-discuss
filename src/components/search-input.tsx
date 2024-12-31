'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

import * as actions from '@/actions';
import { useSearchParams } from 'next/navigation';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = ({ className, ...props }: SearchInputProps) => {
  const searchParams = useSearchParams();

  return (
    <form action={actions.searchFrom} className="flex items-center gap-2">
      <input
        name="term"
        defaultValue={searchParams.get('term') || ''}
        type="text"
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />
      <button type="submit">
        <Search />
      </button>
    </form>
  );
};

export { SearchInput };
