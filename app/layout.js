import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Article Management System",
  description:
    "Web application for managing articles with user and admin roles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
