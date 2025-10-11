import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevNotes",
  description: "Notas minimalistas para desarrolladores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-textPrimary font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
