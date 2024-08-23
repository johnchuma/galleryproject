import { Inter } from "next/font/google";
import "./globals.css";
import "./index.css";
import Navbar from "./components/navbar";
//import hooks

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  //define reactive variables

  //fetch user info from Database

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {/* use provider to transfer values */}
        {children}
      </body>
    </html>
  );
}
