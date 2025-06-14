import StoreProvider from "@/stores/provider";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin",
  description: "Admin",
};

export default function AdminLayout({ children }) {
  return (
    <main className="bg-white min-h-screen">
      <StoreProvider>{children}</StoreProvider>
      <Toaster />
    </main>
  );
}
