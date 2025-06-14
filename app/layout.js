import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/stores/provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Article Management System",
  description:
    "Web application for managing articles with user and admin roles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${inter.className}`}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
