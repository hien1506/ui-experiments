import Grid from "./components/Grid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative mx-auto max-w-7xl px-4">
        <div className="pt-24 pb-24 flex flex-col gap-4">
          <h1 className="text-5xl leading-tight w-full max-w-4xl font-sans">
            Micro interactions and animations created by{" "}
            <Link className="underline" href="https://hien-nguyen.site/">
              Hien Nguyen
            </Link>
          </h1>
        </div>
        <Grid />
      </main>
    </div>
  );
}
