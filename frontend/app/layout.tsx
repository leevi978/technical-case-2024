import "@/styles/globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen">
        <header className="bg-lightgray  p-6 flex-wrap flex flex-row justify-between">
          <Link href="/">Krogsveen technical case 2024</Link>
          <nav className="flex flex-row gap-8">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </header>
        <main className="flex flex-col flex-grow py-8 px-4 gap-8">
          {children}
        </main>
        <footer className="bg-lightgray p-6 text-center">
          Created by Levi Sørum
        </footer>
      </body>
    </html>
  );
}
