import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flow Productions",
  description: "Criatividade em movimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
