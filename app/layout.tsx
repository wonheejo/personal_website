import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const haffer = localFont({
  src: [
    {
      path: "../public/fonts/Haffer-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Haffer-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Haffer-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-haffer",
});

const firaCode = localFont({
  src: [
    {
      path: "../public/fonts/FiraCode_VariableFont_wght.ttf",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Undefined",
  description: "A personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${haffer.variable} ${firaCode.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
