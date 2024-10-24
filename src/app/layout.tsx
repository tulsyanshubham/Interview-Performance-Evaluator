import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mock Interview",
  description: "A platform for practicing technical interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
