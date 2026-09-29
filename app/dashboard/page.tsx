import { getSession } from "@/actions/sessions";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";

export default async function Dashboard() {
  /*const session = await getSession();
  if (session === null) redirect("/");*/
  return (
    <div className="w-screen h-screen bg-[#0f0f0f]">
      <div className="w-full h-20 flex justify-between items-center text-white px-10" >
        <h2 className="text-3xl" >RetailX AI</h2>
        <UserRound className="cursor-pointer" />
      </div>
      <h2 className="text-white text-5xl w-full pl-10 mt-10" >Hello name,Your Threads</h2>
      <h2 className="w-full flex justify-center items-center text-white mt-45" >Currently you dont have any active threads</h2>
    </div>
  );
}
