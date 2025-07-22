import { Zain } from "next/font/google";

// Styles
import "./globals.css";
import "@mantine/core/styles.css";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Mantine Library
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";

const zain = Zain({
  variable: "--font-zain",
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Mobolap Store",
  description: "Developed And Designed By Wael Altyeb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" {...mantineHtmlProps}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Theme color */}
        <meta
          name="theme-color"
          content="#339af0"
          // media="(prefers-color-scheme: light)"
        />
        <ColorSchemeScript />
      </head>
      <body className={`${zain.variable} antialiased`}>
        <MantineProvider>
          <MainLayout>{children}</MainLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
