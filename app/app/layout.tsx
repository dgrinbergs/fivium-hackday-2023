"use client";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { AppProvider } from "./context";
import "./globals.css";
import { EventProvider } from "./events";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`p-4 max-w-6xl mx-auto ${inter.className}`}>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
