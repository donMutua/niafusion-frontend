import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  // Add logging to check the values
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "Supabase Anon Key (first 10 chars):",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10)
  );

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );
}
