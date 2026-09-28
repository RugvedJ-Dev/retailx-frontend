"use server";

import { z } from "zod";

const userLoginSchema = z.object({
  username: z.string().optional(),
  email: z.email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type UserLoginData = z.infer<typeof userLoginSchema>;

export type ServerActionResponse = 
  | { success: true; data: UserLoginData }
  | { success: false; errors: Record<string, string[]> };

export const userLogin = async (data: UserLoginData): Promise<ServerActionResponse> => {
  const validation = userLoginSchema.safeParse(data);

  // 1. Validation Fail Return
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const validData = validation.data;

  return {
    success: true,
    data: validData,
  };
};