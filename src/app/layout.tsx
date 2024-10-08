import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Cormorant_SC } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { CartProvider } from "@/context/cart";
import { WishListProvider } from "@/context/wishList";
import { UserProvider } from "@/context/user";
import { CountryProvider } from "@/context/country";
import { ConfigProvider } from "@/context/config";
import ToastProvider from "@/context/toast";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Invern Spirit",
  description: "Invern Spirit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>
          <UserProvider>
            <CountryProvider>
              <WishListProvider>
                <ConfigProvider>
                  <ToastProvider>{children}</ToastProvider>
                </ConfigProvider>
              </WishListProvider>
            </CountryProvider>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
