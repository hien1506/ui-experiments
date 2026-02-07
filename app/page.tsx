import Grid from "./components/Grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative mx-auto max-w-7xl px-4">
        <div className="py-30 flex flex-col gap-4">
          <h1 className="text-md font-bold text-text-secondary font-mono uppercase">
            UI Experiments
          </h1>
          <p className="text-text-primary text-5xl w-full max-w-4xl font-sans">
            Micro interactions and animation patterns created by Hien Nguyen.
          </p>
        </div>
        <Grid />
      </main>
    </div>
  );
}
