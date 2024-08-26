import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header/Header";
import Footer from "./(components)/Footer/Footer";
import ReduxProvider from "@/store/reduxProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
      <link href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </head> */}
      <body >
        <ReduxProvider>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
