import Grid from "./components/Grid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative mx-auto max-w-7xl px-4">
        <div className="py-16 flex flex-col gap-4">
          <h1 className="text-md font-bold font-mono text-text-secondary">
            UI Experiments
          </h1>
          <p className="text-5xl leading-tight w-full max-w-4xl font-sans">
            Micro interactions and animation patterns created by{" "}
            <Link className="underline" href="https://hien-nguyen.site/">
              Hien Nguyen
            </Link>
            .
          </p>
        </div>
        <Grid />
      </main>
    </div>
  );
}
