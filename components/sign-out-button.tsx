"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className="text-gray-400 hover:text-white"
    >
      Sign out
    </Button>
  );
}
