"use server";

import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Determine the correct redirect URL based on the environment
const getRedirectUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/auth/sign-in`;
};

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    // Validate inputs
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: getRedirectUrl(),
      },
    });

    if (error) {
      console.error("Signup error:", error);
      return { error: error.message };
    }

    return { success: "Check your email for verification link", data };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return { error: "An unexpected error occurred" };
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/sign-in");
}
