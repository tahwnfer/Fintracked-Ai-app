import { Suspense } from "react";
import Sidebar from "@/src/components/sidebar";
import Header from "@/src/components/header";

export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Suspense
          fallback={<header className="h-20 border-b border-[#1d293d]" />}
        >
          <Header />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
