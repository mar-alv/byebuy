import { ClerkProvider } from "@clerk/nextjs";
import { sonnerConfig } from "@repo/ui/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <main className="w-full p-4 grid min-h-screen md:grid-cols-2">
            {children}
          </main>
          <Toaster {...sonnerConfig} />
        </ClerkProvider>
      </body>
    </html>
  );
}
