import type { Metadata } from "next";
import "./globals.css";
import { outfit, spaceGrotesk } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "RetailX AI",
  description:
    "RetailX is an MCP-enabled retail intelligence agent that lets store owners analyze and update PostgreSQL sales databases using natural language. Built with React, FastAPI, and LangGraph, it features real-time SSE streaming and a Human-in-the-Loop approval safety modal for database write operations",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
