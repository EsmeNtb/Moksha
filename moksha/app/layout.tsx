import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Moksha",
  description: "Find local sports, teams and training sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="moksha-theme"
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}