"use server";

import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { redirect } from "next/navigation";
import { setSession } from "./sessions";

export const userLogin = async (email: string, password: string) => {
  let isSuccessful = false;

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return { error: "Invalid email or password" };
    }

    isSuccessful = true;
    await setSession({email,password,name:user.name,_id:user._id as any})
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "An unexpected error occurred." };
  }

  if (isSuccessful) {
    redirect("/dashboard");
  }
};
