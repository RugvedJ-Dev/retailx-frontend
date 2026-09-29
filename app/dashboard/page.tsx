import { getSession } from "@/actions/sessions";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import { getThreads } from "@/actions/getthreads";
import AddThreadsBtn from "@/components/AddThreadsBtn";

export default async function Dashboard() {
  const session = await getSession();
  if (session === null) redirect("/");
  const threads = await getThreads(session._id);

  return (
    <div className="w-screen h-screen bg-[#0f0f0f]">
      <div className="w-full h-20 flex justify-between items-center text-white px-10">
        <h2 className="text-3xl">RetailX AI</h2>

       
        <details className="relative">
          <summary className="list-none cursor-pointer flex items-center justify-center focus:outline-none">
            <UserRound />
          </summary>
          <div className="absolute right-0 mt-2 w-36 bg-[#1a1a1a] border border-zinc-800 rounded-md shadow-lg py-1 z-50">
            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 transition-colors cursor-pointer">
              Logout
            </button>
          </div>
        </details>

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