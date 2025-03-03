import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Create a Supabase client
  let response = NextResponse.next();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // This is used to set cookies in the browser
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          // This is used to remove cookies from the browser
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the URL pathname
  const path = request.nextUrl.pathname;

  // Protect dashboard routes
  if (path.startsWith("/dashboard")) {
    if (!session) {
      // Redirect to sign-in if there's no session
      return NextResponse.redirect(new URL("/auth/sign-in", baseUrl));
    }
    // User is authenticated, allow access to dashboard
    return response;
  }

  // Handle auth routes - redirect to dashboard if already signed in
  if (path.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
