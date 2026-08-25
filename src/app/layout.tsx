import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Assetary — GFX assets for Roblox creators";
const description =
  "Free and paid Roblox GFX assets: HDRIs, 2D assets, 3D assets, materials, scenes, and templates.";

export const metadata: Metadata = {
  metadataBase: new URL("https://assetary.net"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://assetary.net",
    siteName: "Assetary",
    images: [{ url: "/images/hero.webp", width: 2048, height: 1152 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
