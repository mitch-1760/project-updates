import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1760 Strategic AI — Weekly Roadmap",
  description: "Weekly project roadmap for 1760 Strategic AI — February 21, 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
