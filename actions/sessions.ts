"use server";
import { cookies } from "next/headers";

interface userData{
  name?: string;
  email: string;
  password: string;
}

export const setSession = async (user: userData) => {
  (await cookies()).set("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};

export const getSession = async (): Promise<any | null> => {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  const user = JSON.parse(session);
  return user;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
