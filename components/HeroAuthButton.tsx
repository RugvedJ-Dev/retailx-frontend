"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import AuthDialog from "./AuthDialog";

export default function HeroAuthButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="font-space-grotesk h-10 font-bold cursor-pointer w-35 my-10 border-2 rounded-2xl border-black"
        onClick={() => setIsOpen(true)}
      >
        Sign In
      </Button>

      <AuthDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
