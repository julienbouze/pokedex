"use client";
import PokemonList from "@/src/components/PokemonList";
import { ThemeProvider } from '@/src/utils/ThemeContext';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-8xl w-full items-center justify-center font-mono text-sm lg:flex">
        <ThemeProvider>
          <PokemonList/>
        </ThemeProvider>
      </div>
    </main>
  );
}
