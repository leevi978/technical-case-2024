import "@/styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen">
        <header>Header</header>
        <main className="flex flex-col flex-grow">{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
