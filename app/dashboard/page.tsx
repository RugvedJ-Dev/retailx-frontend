import { getSession } from "@/actions/sessions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (session === null) redirect("/");
  return <div>Hi from Dashboard page</div>;
}
