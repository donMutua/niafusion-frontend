"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/auth/actions";

export function AuthNavButtons() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await (await supabase).auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <>
          <Button
            variant="ghost"
            className="text-[#4F46E5] hover:bg-[#4F46E5]/5 px-4 py-2 h-9"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 px-4 py-2 h-9"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="text-[#4F46E5] hover:bg-[#4F46E5]/5 px-4 py-2 h-9"
            onClick={() => (window.location.href = "/auth/sign-in")}
          >
            Sign in
          </Button>
          <Button
            className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 px-4 py-2 h-9"
            onClick={() => (window.location.href = "/auth/sign-up")}
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
}
