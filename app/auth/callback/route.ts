import { createClient } from "../../../lib/supabase/server";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createClient();
      await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}
