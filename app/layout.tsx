import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AppHeader from "@/components/layout/AppHeader";
import { ChaosModeProvider } from "@/src/hooks/useChaosMode";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Leer la cookie en el servidor para evitar flickering
  const cookieStore = await cookies();
  const chaosEnabled = cookieStore.get("oni-games-chaos-mode")?.value === "true";

  return (
    <html
      lang="es"
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
        <Suspense fallback={null}>
          <ChaosModeProvider initialValue={chaosEnabled}>
            <main className="flex-1 relative z-10">{children}</main>
          </ChaosModeProvider>
        </Suspense>
      </body>
    </html>
  );
}
