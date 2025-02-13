import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.variable}   font-inter  antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <main>{children}</main>
            </UserProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
