"use server";

import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { redirect } from "next/navigation";
import { setSession } from "./sessions";

export const userRegister = async (
  name: string,
  email: string,
  password: string,
) => {
  let isSuccessful = false;

  try {
    await connectDB();

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      isSuccessful = true;
      await setSession({name,email,password})
    }
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create user account." };
  }

  if (isSuccessful) {
    redirect("/dashboard");
  }
};
