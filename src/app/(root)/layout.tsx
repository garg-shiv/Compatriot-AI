import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Navbar from "@/components/navbar";
import { checkSubscription } from "@/lib/subscription";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isPro = await checkSubscription();

  return (
    <div className="h-full">
      <Navbar isPro={isPro} />
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar isPro={isPro} />
      </div>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
}