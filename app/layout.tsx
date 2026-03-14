import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${firaCode.variable} ${firaCode.className} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
