import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/* Boska (display) + Switzer (body), both Fontshare. Codes ending in 1 are the
   italics. Self-hosting these is a Phase 8 performance task. */
const FONTSHARE =
  "https://api.fontshare.com/v2/css?f[]=boska@300,400,500,301,401&f[]=switzer@300,400,500,600&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://styledbytakiya.ca"),
  title: {
    default: "Styled by Takiya — Colourist, Edmonton",
    template: "%s · Styled by Takiya",
  },
  description:
    "Lived-in blondes, colour correction and bridal styling in Edmonton. One client in the chair at a time, by appointment.",
  openGraph: {
    title: "Styled by Takiya — Colourist, Edmonton",
    description:
      "Lived-in blondes, colour correction and bridal styling in Edmonton. By appointment.",
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
    <html lang="en">
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
        <SmoothScroll>
          <Nav />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
