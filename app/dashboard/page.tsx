import { getSession } from "@/actions/sessions";
import { redirect } from "next/navigation";
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
        <UserMenu />
      </div>
      <h2 className="text-white text-5xl w-full pl-10 mt-10 flex justify-center text-center items-center">
        Hello {session.name} , Your Threads
      </h2>
      <div className="w-full flex justify-center" >
        <AddThreadsBtn />
      </div>


      {!threads || threads.length === 0 ? (
        <h2 className="w-full flex justify-center items-center text-white mt-45">
          Currently you dont have any active threads
        </h2>
      ) : (
        <div className="flex flex-wrap gap-4 p-10">
          {threads.map((thread) => (
            <div
              key={thread._id.toString()}
              className=" bg-white text-black rounded-4xl shadow w-40 h-15 text-center flex justify-center items-center font-bold m-2"
            >
              {thread.threadname}
            </div>
          ))}
        </div>
      )}
      <div className="w-full h-auto"></div>
    </div>
  );
}
