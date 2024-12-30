import { Skeleton } from '@/components/ui/skeleton';

export function CommentShowSkeleton() {
  return (
    <>
      <div className="p-4 border mt-2 mb-1">
        <div className="flex gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-[15%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
