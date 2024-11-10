import type { Metadata } from "next";
import "./globals.css";
import { FormDataProvider } from "../context/formData-provider";

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
      <FormDataProvider>
        <body className="dark">
          {children}
        </body>
      </FormDataProvider>
    </html>
  );
}
