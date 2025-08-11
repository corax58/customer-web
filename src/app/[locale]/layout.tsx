import { Poppins, Sigmar } from "next/font/google";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { routing } from "@/i18n/routing";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const sigmar = Sigmar({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sigmar",
});

export const metadata: Metadata = {
  title: "Time delivery: Your Favourite Food Delivered Hot & Fresh",
  description:
    "Get your favorite meals from top local restaurants in delivered to your door. With Time delivery, browse menus, place orders online, and enjoy food quickly!",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={` ${poppins.variable} ${sigmar.variable} antialiased`}>
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="top-center" />
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
