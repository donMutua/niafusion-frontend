"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Star, Check, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Logo = () => (
  <svg viewBox="29 193 411 81" className="w-32 h-8" style={{ filter: "contrast(1.1)" }}>
    {/* Logo SVG content */}
  </svg>
)

const ProductCard = ({ title, description, icon: Icon, features, cta, status }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-[#FF00FF]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10 p-6 md:p-8">
      <Icon className="h-12 w-12 text-[#00FFFF] mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-[#00FFFF] mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800">
        {cta}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
    {status && <Badge className="absolute top-4 right-4 bg-[#FF00FF] text-white">{status}</Badge>}
  </div>
)

export default function ProductPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="relative group">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
              Products
            </Link>
            {["Features", "Pricing", "About", "Contact"].map((item) => (
              <Link key={item} href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                {item}
              </Link>
            ))}
          </nav>
          <Button
            variant="outline"
            className="hidden md:flex rounded-full text-gray-900 border-gray-300 hover:bg-gray-100"
          >
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 px-4">
          <nav className="flex flex-col items-center gap-6">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            {["Features", "Pricing", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button
              className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
              AI-Powered Growth Suite
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unlock the power of AI to supercharge your business growth. Our intelligent agents work tirelessly to
              optimize your online presence and drive results.
            </p>
            <Button className="rounded-full text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 text-lg">
              Explore Our Solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </section>

          <section className="mb-16 md:mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCard
                title="OptiMind"
                description="Your AI Website Growth Analyst. Get instant insights and smart actions to boost performance."
                icon={(props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                features={["AI-powered website analysis", "Instant conversion insights", "No coding required"]}
                cta="Start Free Website Audit"
                status="Live"
              />
              <ProductCard
                title="SEO Sage"
                description="AI That Gets You Found. Dominate search rankings with predictive SEO that works while you sleep."
                icon={(props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                features={[
                  "AI-driven SEO for major platforms",
                  "Finds & fixes SEO mistakes",
                  "Keyword & content optimization",
                ]}
                cta="Join SEO Sage Waitlist"
                status="Coming Soon"
              />
              <ProductCard
                title="SellMate"
                description="AI That Converts Like a Pro. Turn abandoned carts into sales and automate your revenue growth 24/7."
                icon={(props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                features={["Smart cart abandonment recovery", "Automated lead follow-ups", "Personalized buyer nudges"]}
                cta="Get SellMate Early Access"
                status="Coming Soon"
              />
            </div>
          </section>

          <section className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Smarter?</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the next era of AI-driven businesses. Leave your competition in the dust with Niafusion's intelligent
              growth suite.
            </p>
            <Button className="rounded-full text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 text-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Join 10,000+ Growing Businesses</h2>
                <p className="text-gray-600">Experience the power of AI-driven growth today.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#FF00FF] text-[#FF00FF]" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm text-gray-600">AI-powered growth for modern businesses</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Us", "FAQ"].map((item) => (
              <Link key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}

