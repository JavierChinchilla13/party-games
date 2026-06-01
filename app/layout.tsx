import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONI Games - Juegos Sociales",
  description: "Juegos divertidos para jugar en grupo con un solo dispositivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-white">
        {/* Background Decorative Elements */}
        <div className="bg-glow">
          <div className="glow-shape glow-1"></div>
          <div className="glow-shape glow-2"></div>
          <div className="glow-shape glow-3"></div>
        </div>
        
        <AppHeader />
        <main className="flex-1 relative z-10">{children}</main>
      </body>
    </html>
  );
}
