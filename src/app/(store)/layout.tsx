import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import "../globals.css";
import container from "./layout.module.scss";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/actions/getCurrentUser";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dziram Maxwell",
    default: "Dziram Maxwell Dashboard",
  },
  description: "Home Page of Dziram Maxwell",
  authors: { name: "Jeremiah Charles" },
  keywords: ["Fashion", "Style", "Clothes"],
  metadataBase: new URL(
    "https://e-commerce-project-nu-lovat.vercel.app/admin/manage-orders"
  ),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <CartProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>
          <Toaster />

          <div className={container.container}>
            <Navbar currentUser={currentUser} />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </CartProvider>
  );
}
