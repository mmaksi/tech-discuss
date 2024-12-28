import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="inset-0 absolute flex flex-col gap-3 items-center justify-center bg-primary">
      <Loader2 className="animate-spin text-primary-foreground w-24 h-24" />
    </div>
  );
};

export default Loading;
