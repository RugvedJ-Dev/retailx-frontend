import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In to RetailX AI</DialogTitle>
          <DialogDescription>
            Access and manage your sales using natural language processing.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}