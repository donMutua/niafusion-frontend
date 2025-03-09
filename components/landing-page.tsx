"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  MapPinned,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MailQuestion } from "lucide-react";
import { AuthNavButtons } from "./auth-nav-buttons";
import { useAuth } from "@/hooks/use-auth";
import { ComingSoonSection } from "./coming-soon-section";

const Logo = () => (
  <svg
    viewBox="29 193 411 81"
    className="w-32 h-8"
    style={{ filter: "contrast(1.1)" }}
  >
    <g transform="matrix(0.31999998,0,0,0.31999998,0,9.434666e-6)">
      <g transform="matrix(3.125,0,0,3.125,110.88121,639.65308)">
        <text
          style={{
            fontFamily: "Prata",
            fontSize: "66.34px",
            fill: "#ff00ff",
          }}
          transform="translate(0,58)"
        >
          NIAFUSION
        </text>
      </g>
      <g transform="matrix(3.125,0,0,3.125,103.10626,639.65308)">
        <text
          style={{
            fontFamily: "Prata",
            fontSize: "66.34px",
            fill: "#00ffff",
          }}
          transform="translate(0,58)"
        >
          NIAFUSION
        </text>
      </g>
      <g transform="matrix(3.125,0,0,3.125,106.99374,639.65308)">
        <text
          style={{
            fontFamily: "Prata",
            fontSize: "66.34px",
            fill: "#000000",
          }}
          transform="translate(0,58)"
        >
          NIAFUSION
        </text>
      </g>
    </g>
  </svg>
);

const OptiMindIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 4L35.2583 10.5V23.5L24 30L12.7417 23.5V10.5L24 4Z"
      stroke="#00FFFF"
      strokeWidth="2"
    />
    <path d="M24 30V44" stroke="#00FFFF" strokeWidth="2" />
    <path d="M35.2583 23.5L44 28" stroke="#00FFFF" strokeWidth="2" />
    <path d="M12.7417 23.5L4 28" stroke="#00FFFF" strokeWidth="2" />
  </svg>
);

const SEOSageIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 4V44" stroke="#00FFFF" strokeWidth="2" />
    <path d="M4 24H44" stroke="#00FFFF" strokeWidth="2" />
    <circle cx="24" cy="24" r="8" stroke="#00FFFF" strokeWidth="2" />
    <path
      d="M35.2583 12.7417L41.2583 6.74167"
      stroke="#00FFFF"
      strokeWidth="2"
    />
    <path
      d="M6.74167 41.2583L12.7417 35.2583"
      stroke="#00FFFF"
      strokeWidth="2"
    />
  </svg>
);

const SellMateIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 4L35.2583 10.5V23.5L24 30L12.7417 23.5V10.5L24 4Z"
      stroke="#00FFFF"
      strokeWidth="2"
    />
    <path d="M24 30V44" stroke="#00FFFF" strokeWidth="2" />
    <path d="M35.2583 23.5L44 28" stroke="#00FFFF" strokeWidth="2" />
    <path d="M12.7417 23.5L4 28" stroke="#00FFFF" strokeWidth="2" />
    <circle cx="24" cy="17" r="4" stroke="#00FFFF" strokeWidth="2" />
  </svg>
);

export const ScrollLink = ({ to, children }: any) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={to} onClick={handleClick} className="cursor-pointer">
      {children}
    </a>
  );
};

export default function LandingPage() {
  const targetRef = useRef(null);
  const { isAuthenticated, isLoading } = useAuth();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll("nav a");

      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("text-purple-500");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("text-purple-500");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f5f5]">
      {/* Navigation */}
      <div className="flex items-center gap-3">
        <AuthNavButtons />
      </div>

      {/* Hero Section */}
      <section
        id="home"
        ref={targetRef}
        className="relative pt-16 min-h-[50vh]"
      >
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <Badge
            variant="outline"
            className="mb-4 py-2 backdrop-blur-sm bg-white/30"
          >
            <Sparkles className="w-4 h-4 mr-2 text-[#ff00ff]" />
            Next-Gen AI Suite
          </Badge>

          <div className="relative">
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-medium leading-none tracking-tight max-w-4xl">
              Work AI for all.
              <span className="text-[#00ffff] relative">
                Simplified
                <span className="absolute inset-0 text-[#ff00ff] opacity-50 translate-x-[2px] translate-y-[2px]">
                  Simplified
                </span>
              </span>
            </h1>
          </div>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            Experience the fusion of intelligence and automation with our trio
            of specialized AI agents.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-6 items-start">
            <Button
              className="rounded-full text-white bg-black hover:bg-black/90 px-8 py-7 text-lg group relative overflow-hidden"
              onClick={() => {
                if (isAuthenticated) {
                  window.location.href = "/dashboard/analysis";
                } else {
                  window.location.href = "/auth/sign-in";
                }
              }}
            >
              <span className="relative z-10 flex items-center">
                Analyze Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00ffff]/20" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ff00ff]/20 translate-x-[2px] translate-y-[2px]" />
            </Button>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 max-w-xs relative group">
              <p className="text-lg leading-snug">
                The Work AI platform connected to all your data. Find, create
                and automate anything.
              </p>
              <Button variant="ghost" size="icon" className="mt-4 rounded-full">
                <ArrowRight className="w-5 h-5" />
              </Button>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00ffff]/5 rounded-3xl" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ff00ff]/5 rounded-3xl translate-x-[2px] translate-y-[2px]" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-4 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tight mb-4">
            Our AI Agents
          </h2>
          <div className="grid md:grid-cols-3 gap-[5px]">
            <Card className="bg-[#1C1E21] border-0">
              <CardContent className="p-6">
                <div className="mb-4">
                  <OptiMindIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  OptiMind
                </h3>
                <p className="text-gray-400 mb-4">
                  AI-powered insights for exponential website growth.
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-[#00FFFF]/10 text-[#00FFFF]"
                  >
                    Live
                  </Badge>
                  <Button
                    variant="ghost"
                    className="text-[#00FFFF] hover:text-white hover:bg-[#00FFFF]/20"
                  >
                    Analyze Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1C1E21] border-0">
              <CardContent className="p-6">
                <div className="mb-4">
                  <SEOSageIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Churn Shield
                </h3>
                <p className="text-gray-400 mb-4">
                  Churn is costly, but it doesn't have to be inevitable. Predict
                  which customers are at risk of leaving.
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-gray-800 text-gray-400"
                  >
                    Coming Soon
                  </Badge>
                  <Button
                    variant="ghost"
                    className="text-[#00FFFF] hover:text-white hover:bg-[#00FFFF]/20"
                  >
                    Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1C1E21] border-0">
              <CardContent className="p-6">
                <div className="mb-4">
                  <SellMateIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Cart Rescue AI
                </h3>
                <p className="text-gray-400 mb-4">
                  Every abandoned cart is a missed opportunity. Detect abandoned
                  carts in real-time.
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-gray-800 text-gray-400"
                  >
                    Coming Soon
                  </Badge>
                  <Button
                    variant="ghost"
                    className="text-[#00FFFF] hover:text-white hover:bg-[#00FFFF]/20"
                  >
                    Get Notified <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ComingSoonSection />

      {/* About Section */}
      <section id="about" className="relative py-16">
        {/* Background Shape */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-[#0B0F1A]"
            style={{
              clipPath: "polygon(0 0, 100% 8%, 100% 100%, 0% 100%)",
              borderRadius: "2.5rem 8rem 2.5rem 2.5rem",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tight text-white">
                Our culture
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-[#1C2230] flex items-center justify-center">
                    <svg
                      className="size-5 text-[#00FFFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Flexible & Understanding
                  </h3>
                  <p className="text-sm text-gray-400">
                    We put our partners first, collaborating closely to find and
                    deliver solutions that work for their unique needs.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-[#1C2230] flex items-center justify-center">
                    <svg
                      className="size-5 text-[#00FFFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Growth & Development
                  </h3>
                  <p className="text-sm text-gray-400">
                    There's a wealth of growth potential in developing your
                    platform in this long term. We're here to help you reach
                    where you want to be.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-[#1C2230] flex items-center justify-center">
                    <svg
                      className="size-5 text-[#00FFFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Open & Transparent
                  </h3>
                  <p className="text-sm text-gray-400">
                    Everyone stays informed on all the latest projects, and
                    everyone's input is valued and considered.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-[#1C2230] flex items-center justify-center">
                    <svg
                      className="size-5 text-[#00FFFF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Helpful & Supportive
                  </h3>
                  <p className="text-sm text-gray-400">
                    As part of Niafusion team, you'll never have to go it alone.
                    We support each other every step of the way.
                  </p>
                </div>
              </div>

              <Button className="bg-[#1C2230] text-white hover:bg-[#2A3241] rounded-xl px-4 py-2">
                See Open Roles
              </Button>
            </div>

            <div className="lg:flex-1 relative">
              {/* Decorative curved line */}
              <svg
                className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-32 text-[#1C2230]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M0,50 Q25,50 50,75 T100,50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div className="relative">
                <img
                  src="/work-culture.jpg"
                  alt="Team members"
                  className="rounded-2xl w-full object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to help your company scale faster? Let's chat about how we
              can help.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sales Email */}
            <Card className="relative group overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-8">
                  <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Mail className="size-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Sales</h3>
                <p className="text-gray-600 mb-6">
                  Get in touch with our sales team.
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 group-hover:bg-gray-100/50"
                  onClick={() =>
                    (window.location.href = "mailto:sales@niafusion.com")
                  }
                >
                  <span className="flex-grow text-left">
                    sales@niafusion.com
                  </span>
                  <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-gray-100/50 to-transparent" />
            </Card>

            {/* Support Email */}
            <Card className="relative group overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-8">
                  <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <MailQuestion className="size-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-6">We're here to help you.</p>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 group-hover:bg-gray-100/50"
                  onClick={() =>
                    (window.location.href = "mailto:support@niafusion.com")
                  }
                >
                  <span className="flex-grow text-left">
                    support@niafusion.com
                  </span>
                  <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-gray-100/50 to-transparent" />
            </Card>

            {/* Visit us */}
            <Card className="relative group overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-8">
                  <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <MapPin className="size-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit us</h3>
                <p className="text-gray-600 mb-6">Our office location.</p>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 group-hover:bg-gray-100/50"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=ABC+Place+Westlands+Nairobi",
                      "_blank"
                    )
                  }
                >
                  <div className="flex-grow text-left">
                    <span className="block">ABC Place</span>
                    <span className="block text-sm text-gray-500">
                      Westlands, Nairobi
                    </span>
                  </div>
                  <MapPinned className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-gray-100/50 to-transparent" />
            </Card>

            {/* Call us */}
            <Card className="relative group overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-8">
                  <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Phone className="size-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Call us</h3>
                <p className="text-gray-600 mb-6">Mon-Fri from 8am to 5pm.</p>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 group-hover:bg-gray-100/50"
                  onClick={() => (window.location.href = "tel:+254734977088")}
                >
                  <div className="flex-grow text-left">
                    <span className="block">+254 734 977 088</span>
                    <span className="block text-sm text-gray-500">
                      Click to call
                    </span>
                  </div>
                  <PhoneCall className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-gray-100/50 to-transparent" />
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm text-gray-500">
              AI-powered growth for modern businesses
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Us", "FAQ"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}
