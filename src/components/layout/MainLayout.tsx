import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
