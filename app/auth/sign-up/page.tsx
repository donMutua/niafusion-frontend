"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    console.log("Form data:", formData);

    try {
      // Make a direct fetch request
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK before attempting to parse JSON
      if (!response.ok) {
        // Try to get the error message as text first
        const errorText = await response.text();
        console.log("Error response text:", errorText);

        // Try to parse as JSON if possible
        let errorMessage = "Failed to sign up";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If parsing fails, use the status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Parse successful response
      const result = await response.json();
      console.log("Success response:", result);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(
          result.success || "Sign-up successful! Please check your email."
        );
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("An unexpected error occurred. Please try again.");
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
            alt="Sign up illustration"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2">
        <div className="flex justify-end">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-[#4F46E5] hover:text-[#4F46E5]/90"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-medium leading-tight tracking-tight">
            Create account
          </h1>

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  name="firstName"
                  placeholder="First name"
                  className="h-12 text-base px-4"
                  required
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  className="h-12 text-base px-4"
                  required
                />
              </div>
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="h-12 text-base px-4"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="••••••••••"
                className="h-12 text-base px-4"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="text-[#4F46E5] hover:text-[#4F46E5]/90"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-[#4F46E5] hover:text-[#4F46E5]/90"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
