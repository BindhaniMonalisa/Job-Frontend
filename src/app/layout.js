import { Geist, Geist_Mono } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@/styles/global.css";
import "@/styles/App.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Satmanyu job care Recruiter",
  description: "Connect with top-tier candidates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <Providers>
          <div className="App d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
