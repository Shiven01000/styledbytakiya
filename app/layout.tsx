import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/sections/Preloader";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

/* Switzer carries the small amount of UI text. Self-hosting is a Phase 8 task. */
const FONTSHARE =
  "https://api.fontshare.com/v2/css?f[]=switzer@300,400,500&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://styledbytakiya.ca"),
  title: {
    default: "Styled by Takiya — Colourist, Edmonton",
    template: "%s · Styled by Takiya",
  },
  description:
    "Colour correction and lived-in blonde in Edmonton. One client in the chair at a time, by appointment.",
  openGraph: {
    title: "Styled by Takiya — Colourist, Edmonton",
    description:
      "Colour correction and lived-in blonde in Edmonton. By appointment.",
    url: "https://styledbytakiya.ca",
    siteName: "Styled by Takiya",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bodoni.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={FONTSHARE} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
