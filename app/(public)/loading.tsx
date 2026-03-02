export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-accent">
          <span className="text-lg font-bold text-white">B</span>
          <span className="text-lg font-bold text-white/60">.</span>
        </div>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-border">
          <div className="h-full w-1/2 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
