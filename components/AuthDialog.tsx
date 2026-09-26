import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [haveAccount, sethaveAccount] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Sign In to RetailX AI
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your email and password
          </DialogDescription>
          <div className="mt-3">
            <h2 className="mb-4">Enter your email</h2>
            <Input placeholder="Enter Email" className="mb-5" />
            {!haveAccount ? (
              <div>
                <h2 className="mb-4">Enter your username</h2>
                <Input placeholder="Enter Username" className="mb-5" />
              </div>
            ) : null}
            <h2 className="mb-3">Enter your password</h2>
            <Input placeholder="Enter Password" className="mb-5" />
          </div>
          <div className="flex mb-4">
            <h2 className="mr-2">Dont have an accout.</h2>
            <h2 className="cursor-pointer" onClick={()=>sethaveAccount(false)}>Click here</h2>
          </div>
          <Button variant="default">{haveAccount ? "Sign In" : "Create Account"}</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
