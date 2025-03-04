"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "../actions";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await forgotPassword(email);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(
          "Password reset link has been sent to your email. Please check your inbox."
        );
        setEmail("");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Illustration */}
      <div className="hidden w-1/2 bg-gray-50 lg:block">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src="/auth.jpg"
            alt="Reset password illustration"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right Section - Reset Password Form */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2">
        <div className="flex justify-end">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/auth/sign-in"
              className="text-[#4F46E5] hover:text-[#4F46E5]/90"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-2 text-[clamp(2rem,5vw,3rem)] font-medium leading-tight tracking-tight">
            Reset password
          </h1>
          <p className="mb-8 text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 text-sm text-green-500 bg-green-50 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base px-4"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-[#4F46E5] hover:text-[#4F46E5]/90"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
