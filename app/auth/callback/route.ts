import { createClient } from "../../../lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      // Check if the user is confirmed (email verified)
      if (data?.session) {
        // User is authenticated, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        // No session yet (email not verified or other issue)
        return NextResponse.redirect(
          new URL(
            "/auth/sign-in?message=Please check your email to verify your account",
            request.url
          )
        );
      }
    }

    // No code present, redirect to sign-in
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}
