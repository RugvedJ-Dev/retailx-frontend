"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createThread } from "@/actions/createthread"

interface ThreadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddThreadsDialog({ open, onOpenChange }: ThreadDialogProps) {
  const [threadName, setThreadName] = useState("")

  const handleSubmit = async() => {
    await createThread(threadName)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Thread</DialogTitle>
          <DialogDescription>
            Enter the name of the Thread
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="thread-name" className="sr-only">
              Thread Name
            </Label>
            <Input
              id="thread-name"
              placeholder="Enter thread name..."
              value={threadName}
              onChange={(e) => setThreadName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={handleSubmit}>
            Create
          </Button>
          <DialogClose render={<Button type="button" variant="secondary">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}