"use client";

import { UserRound } from "lucide-react";
import { deleteSession } from "@/actions/sessions";
import { redirect } from "next/navigation";

export default function UserMenu() {
  const handleLogout = async () => {
    await deleteSession();
    redirect("/")
  };

  return (
    <details className="relative">
      <summary className="list-none cursor-pointer flex items-center justify-center focus:outline-none">
        <UserRound />
      </summary>
      <div className="absolute right-0 mt-2 w-36 bg-[#1a1a1a] border border-zinc-800 rounded-md shadow-lg py-1 z-50">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </details>
  );
}