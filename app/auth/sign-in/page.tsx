import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Illustration */}
      <div className="hidden w-1/2 bg-gray-50 lg:block">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-24%20at%2015.45.28-u2dpY0bOv3rEq36Y4wiC3FHTOaGrFW.png"
            alt="Sign in illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2">
        <div className="flex justify-end">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-[#4F46E5] hover:text-[#4F46E5]/90">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-medium leading-tight tracking-tight">Sign in</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Sign in with Open account</p>
              <Button variant="outline" className="w-full h-12 text-base">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with email address</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Input type="email" placeholder="name@example.com" className="h-12 text-base px-4" />
              </div>
              <div>
                <Input type="password" placeholder="••••••••••" className="h-12 text-base px-4" />
              </div>
              <Button className="w-full h-12 text-base bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90">
                Start trading
              </Button>
            </div>

            <div className="text-center">
              <Link href="/auth/forgot-password" className="text-sm text-[#4F46E5] hover:text-[#4F46E5]/90">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-[#4F46E5] hover:text-[#4F46E5]/90">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#4F46E5] hover:text-[#4F46E5]/90">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

