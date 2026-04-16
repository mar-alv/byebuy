import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@repo/ui/components/header/index";
import { sonnerConfig } from "@repo/ui/components/ui/sonner";
import { ThemeProvider } from "@repo/ui/components/ui/theme-provider";
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="max-w-306 w-full mx-auto px-6">
              {children}
            </main>
            <Toaster {...sonnerConfig} />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
