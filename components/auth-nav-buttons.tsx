"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";
import { ScrollLink } from "./landing-page";
import { Logo } from "./ui/logo";
import { useAuth } from "../hooks/use-auth";

export function AuthNavButtons() {
  const { isAuthenticated, isLoading } = useAuth();

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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ScrollLink to="#home">
            <Logo />
          </ScrollLink>

          <div className="hidden md:flex items-center gap-1 bg-white/90 rounded-full px-2 py-1.5 border">
            <ScrollLink to="#home">
              <span className="px-4 py-1 text-sm rounded-full hover:bg-black/5 transition-colors">
                Home
              </span>
            </ScrollLink>
            <ScrollLink to="#features">
              <span className="px-4 py-1 text-sm rounded-full hover:bg-black/5 transition-colors">
                Features
              </span>
            </ScrollLink>
            <ScrollLink to="#about">
              <span className="px-4 py-1 text-sm rounded-full hover:bg-black/5 transition-colors">
                About
              </span>
            </ScrollLink>
            <ScrollLink to="#contact">
              <span className="px-4 py-1 text-sm rounded-full hover:bg-black/5 transition-colors">
                Contact
              </span>
            </ScrollLink>
          </div>

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
        </div>
      </nav>
    </div>
  );
}
