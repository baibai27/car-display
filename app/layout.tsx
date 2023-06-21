import "./globals.css";
import { Navbar, Footer } from "../components";

export const metadata = {
  title: "Car Rental",
  description: "Discover the best car deals for your next trip.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
