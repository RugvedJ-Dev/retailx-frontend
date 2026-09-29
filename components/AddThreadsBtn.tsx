"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddThreadsDialog } from "./AddThreadDialog";

export default function AddThreadsBtn() {
  const [isthreaddialog, setisthreaddialog] = useState(false);
  return (
    <>
    <Button
      variant="outline"
      className="w-30 h-10 rounded-2xl ml-10 mt-10 cursor-pointer"
      onClick={()=>setisthreaddialog(true)}
    >
      Add Threads
    </Button>
    <AddThreadsDialog open={isthreaddialog} onOpenChange={setisthreaddialog}/>
    </>
  );
}
