import Grid from "./components/Grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-24 pb-14 text-center sm:pt-32 sm:pb-16">
        <h1
          className="text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary sm:text-5xl"
          style={{ textWrap: "balance" }}
        >
          UI experiments
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-text-secondary">
          Micro interactions and animation patterns created by Hien Nguyen.
        </p>
      </header>

      {/* Main content */}
      <main className="relative mx-auto max-w-7xl px-6 pb-32 sm:px-8">
        <Grid />
      </main>
    </div>
  );
}
