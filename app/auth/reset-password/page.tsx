"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "../actions";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debug search params
  console.log(
    "Search params:",
    Object.fromEntries(searchParams?.entries() || [])
  );

  // Look for both token and code parameters
  const resetCode = searchParams?.get("token") || searchParams?.get("code");
  console.log("Reset code found:", resetCode);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Check if passwords match on input change
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset when fields are empty
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!resetCode) {
      setError(
        "Invalid or missing reset code. Please request a new password reset link."
      );
    }
  }, [resetCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setError("Passwords do not match");
      return;
    }

    if (!resetCode) {
      setError("Invalid or missing reset code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await resetPassword(resetCode, password);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Your password has been reset successfully!");
        // Redirect to sign-in page after successful password reset
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            Create new password
          </h1>
          <p className="mb-8 text-gray-600">
            Your new password must be at least 6 characters long.
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base px-4 pr-10"
                required
                minLength={6}
                disabled={!resetCode}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 text-base px-4 pr-10 ${
                  !passwordsMatch && confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                required
                minLength={6}
                disabled={!resetCode}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {!passwordsMatch && confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
              disabled={isLoading || !resetCode}
            >
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-600">
          Need a new reset link?{" "}
          <Link
            href="/auth/forgot-password"
            className="text-[#4F46E5] hover:text-[#4F46E5]/90"
          >
            Request again
          </Link>
        </div>
      </div>
    </div>
  );
}
