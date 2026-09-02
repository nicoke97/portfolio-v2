import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

import { ChatProvider } from "@/components/ChatProvider";
import { Shell } from "@/components/Shell";
import { site } from "@/data/site";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-plex-serif",
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description:
    "Full-stack software engineer in Mexico City. I design the interface and ship the system behind it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}>
      <body className="font-sans antialiased">
        <ChatProvider>
          <Shell>{children}</Shell>
        </ChatProvider>
      </body>
    </html>
  );
}
