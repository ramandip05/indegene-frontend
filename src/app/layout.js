
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";


export const metadata = {
  title: "Indegene Job Portal",
  description: "Hire easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-right" richColors closeButton/>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
