export const CustomFullScreenLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-8">

        {/* Loader */}
        <div className="relative h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/20" />

          {/* Spinning ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />

          {/* Inner pulse */}
          <div className="absolute inset-3 rounded-full bg-primary/10 animate-pulse" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold tracking-wide">
            Cagando información
          </p>
          <p className="text-xs text-muted-foreground">
            Espere un momento
          </p>
        </div>

      </div>
    </div>
  );
};
