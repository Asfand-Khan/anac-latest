import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { primaryText } from "./fonts/font";
import DynamicColors from "@/lib/DynamicColors";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Anac Lubricants",
    template: "%s",
  },
  description: "Anac Total Energies Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-behavior-smooth">
      <body className={`${primaryText.className} antialiased`}>
        <NextTopLoader
          color="#ff0000"
          showSpinner={false}
          speed={200}
          easing="ease"
        />
        <Toaster position="bottom-right" />
        <DynamicColors />
        {children}
      </body>
    </html>
  );
}
