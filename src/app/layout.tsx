import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Header from '@/components/ui/Header';
import { ThemeProvider } from "@/components/theme-provider";
import Footer from '@/components/ui/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="flex flex-col min-h-screen bg:white dark:bg-zinc-950">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <header>
              <Header />
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
