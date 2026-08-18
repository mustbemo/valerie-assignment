export function ViewportLock() {
  return (
    <aside className="fixed inset-0 z-100 hidden place-items-center bg-brand-950 p-8 text-foreground max-[1279px]:grid [@media(max-height:719px)]:grid">
      <div className="max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Desktop experience
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide">
          A larger window is required
        </h1>
        <p className="mt-4 text-muted-foreground">
          This experience is designed for a minimum display size of 1280 × 720.
          Resize the window or open it on a desktop to continue.
        </p>
      </div>
    </aside>
  );
}
