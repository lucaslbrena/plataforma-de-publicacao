import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastifyContainer } from "@/components/ToastifyContainer";

export const metadata: Metadata = {
  title: {
    default: "Tech Insights by Lucas",
    template: "%s | Brena | Tech Insights",
  },
  description:
    "Brena Tech Insights is a blog about technology, programming, and software development.",
};
type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
