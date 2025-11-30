import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { XRayProvider } from "../context/XRayContext";
import { XRayToggle } from "../components/XRayToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Iterator Project",
  description: "Try -> Fail -> Learn -> Repeat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5f5] text-black overflow-x-hidden`}
      >
        <XRayProvider>
          {children}
          <XRayToggle />
        </XRayProvider>
      </body>
    </html>
  );
}
