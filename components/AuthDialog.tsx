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
import { userLogin } from "@/actions/userlogin";
import { toast } from "@/components/ui/toast";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [haveAccount, setHaveAccount] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = haveAccount ? { email, password } : { username, email, password };

  const res = await userLogin(payload);

  if (!res.success && res.errors) {
    const errorMessage =
      res.errors.password?.[0] ??``
      res.errors.email?.[0] ??
      res.errors.username?.[0] ??
      "An unexpected validation error occurred.";

    toast.add({
      title: "Validation Error",
      description: errorMessage,
    });
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {haveAccount
              ? "Sign In to RetailX AI"
              : "Create RetailX AI Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {haveAccount
              ? "Enter your email and password to sign in"
              : "Enter your details to create an account"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-3 text-left">
            {!haveAccount && (
              <div className="mb-4">
                <h2 className="mb-2 text-sm font-medium">
                  Enter your username
                </h2>
                <Input
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            <div className="mb-4">
              <h2 className="mb-2 text-sm font-medium">Enter your email</h2>
              <Input
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <h2 className="mb-2 text-sm font-medium">Enter your password</h2>
              <Input
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Conditional Toggle Footer */}
          <div className="flex justify-center items-center gap-1 mb-4 text-sm">
            {haveAccount ? (
              <>
                <span>Don't have an account?</span>
                <button
                  type="button"
                  className="font-semibold text-primary underline cursor-pointer hover:opacity-80"
                  onClick={() => setHaveAccount(false)}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <button
                  type="button"
                  className="font-semibold text-primary underline cursor-pointer hover:opacity-80"
                  onClick={() => setHaveAccount(true)}
                >
                  Log in
                </button>
              </>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            {haveAccount ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
