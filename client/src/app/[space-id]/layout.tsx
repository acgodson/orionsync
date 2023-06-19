"use client";
import Nav from "@/components/Nav";
import { useEffect } from "react";
import { useConnect } from "wagmi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connect, connectors } = useConnect();
  useEffect(() => {
    connectors;
    connect({ connector: connectors[0] });
  }, [...connectors]);

  return (
    <>
      <Nav />
      <main className="flex gap-12 max-h-screen h-screen w-full flex-col items-center p-8 px-8 overflow-scroll">
        {children}
      </main>
    </>
  );
}
