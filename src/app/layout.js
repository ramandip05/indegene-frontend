
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";



export const metadata = {
  title: "Indegene Job Portal",
  description: "Hire easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
