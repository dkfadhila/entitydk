import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Share_Tech_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const share = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share",
});

const plex = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex",
});

const elite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elite",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0b08",
  colorScheme: "dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rinejourney.xyz"),
  title: "S1D4NG.5KR1P51.404 · Undangan Sidang — Decka Fadhila Tirta",
  description:
    "Para Entitas: S1D4NG.5KR1P51.404 recovered dari BACKROOM://PENDAPA_FMIPA. Senin 20 Juli 2026 · 15:00 WIB. Quarantine protocol aktif.",
  openGraph: {
    title: "S1D4NG.5KR1P51.404 · Undangan Sidang — Decka Fadhila Tirta",
    description:
      "Zona liminal sidang skripsi. Board of Entities online. Subject: Decka Fadhila Tirta.",
    type: "website",
    locale: "id_ID",
    siteName: "S1D4NG.5KR1P51.404",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tirtavex",
    creator: "@tirtavex",
    title: "S1D4NG.5KR1P51.404 · Undangan Sidang",
    description: "Para Entitas — clearance sidang 20 Juli 2026 · Pendapa FMIPA Aja",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "S1D4NG.404",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${share.variable} ${plex.variable} ${elite.variable} h-full`}
    >
      <body className="min-h-full min-h-dvh bg-void text-paper antialiased">{children}</body>
    </html>
  );
}
