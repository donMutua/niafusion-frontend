import { createClient } from "../../../../lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Signup API route called");

  try {
    const formData = await request.formData();
    console.log("Received form data:", Object.fromEntries(formData));

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    // Determine the correct redirect URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const signInUrl = `${baseUrl}/auth/sign-in`;

    if (!email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    console.log("Calling Supabase signUp");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: signInUrl, // Redirect to sign-in after verification
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Signup successful:", data);
    // Directly return a response indicating sign-in page redirection
    return NextResponse.json({
      success: true,
      redirectUrl: "/auth/sign-in",
      message:
        "Account created successfully. Please check your email and sign in.",
    });
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
