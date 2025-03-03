import { createClient } from "../../../lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    // Determine the base URL dynamically
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (code) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      // Check if the user is confirmed (email verified)
      if (data?.session) {
        // Always redirect to sign-in page after verification
        return NextResponse.redirect(new URL("/auth/sign-in", baseUrl));
      } else {
        // No session yet (email not verified or other issue)
        return NextResponse.redirect(
          new URL(
            "/auth/sign-in?message=Please check your email to verify your account",
            baseUrl
          )
        );
      }
    }

    // No code present, redirect to sign-in
    return NextResponse.redirect(new URL("/auth/sign-in", baseUrl));
  } catch (err) {
    console.error("Callback error:", err);

    // Determine the base URL dynamically
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return NextResponse.redirect(new URL("/auth/error", baseUrl));
  }
}
