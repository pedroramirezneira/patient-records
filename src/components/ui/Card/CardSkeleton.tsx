export const CardSkeleton = () => {
  return (
    <div className="bg-foreground rounded-xl border border-border p-4 animate-pulse">
      <div className="flex items-center gap-4">
        {/* Avatar skeleton */}
        <div className="shrink-0 w-12 h-12 rounded-full bg-muted" />

        {/* Text content skeleton */}
        <div className="flex flex-col gap-2 flex-1">
          {/* Name skeleton */}
          <div className="h-4 bg-muted rounded w-3/4" />
          {/* Date skeleton */}
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};
