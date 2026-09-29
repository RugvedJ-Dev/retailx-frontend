import { getSession } from "@/actions/sessions";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import { getThreads } from "@/actions/getthreads";
import AddThreadsBtn from "@/components/AddThreadsBtn";
import UserMenu from "@/components/UserMenu";


export default async function Dashboard() {
  const session = await getSession();
  if (session === null) redirect("/");
  const threads = await getThreads(session._id);

  return (
    <div className="w-screen h-screen bg-[#0f0f0f]">
      <div className="w-full h-20 flex justify-between items-center text-white px-10">
        <h2 className="text-3xl">RetailX AI</h2>

      <UserMenu/>
    
      </div>
      <h2 className="text-white text-5xl w-full pl-10 mt-10">
        Hello {session.name} , Your Threads
      </h2>
      <AddThreadsBtn/>
      {threads === null ? (
        <h2 className="w-full flex justify-center items-center text-white mt-45">
          Currently you dont have any active threads
        </h2>
      ) : (
        <div>Threads present</div>
      )}
      <div className="w-full h-auto"></div>
    </div>
  );
}