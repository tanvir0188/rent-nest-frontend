import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>

        <Navbar />
        {children}
        <Toaster />

      </body>
    </html>
  );
}
