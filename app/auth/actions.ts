"use server";

import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Determine the correct redirect URL based on the environment
const getRedirectUrl = (path: string = "/auth/sign-in") => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    // Validate inputs
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
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

export async function forgotPassword(email: string) {
  try {
    if (!email) {
      return { error: "Email is required" };
    }

    const supabase = await createClient();

    // Specify the reset password page explicitly
    const resetPasswordUrl = getRedirectUrl("/auth/reset-password");
    console.log("Reset password URL:", resetPasswordUrl);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordUrl,
    });

    if (error) {
      console.error("Forgot password error:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error during password reset:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function resetPassword(codeOrToken: string, newPassword: string) {
  try {
    console.log("Resetting password with code/token:", codeOrToken);

    if (!codeOrToken || !newPassword) {
      return { error: "Reset code and new password are required" };
    }

    if (newPassword.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }

    const supabase = await createClient();

    // First try to exchange the code for a session
    try {
      console.log("Attempting to exchange code for session...");
      const { data, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(codeOrToken);

      if (exchangeError) {
        console.error("Error exchanging code for session:", exchangeError);
        return { error: exchangeError.message };
      }

      console.log("Code exchange successful:", data);
    } catch (exchangeError) {
      console.error("Error during code exchange:", exchangeError);
      // Continue anyway, as this might fail if the code was already exchanged
    }

    // Now update the user's password
    console.log("Updating user password...");
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Reset password error:", error);
      return { error: error.message };
    }

    console.log("Password updated successfully");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error during password reset:", error);
    return { error: "An unexpected error occurred" };
  }
}
