"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Target, Zap, BarChart, LineChart, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const recommendations = [
  {
    title: "Website Analysis",
    description: "Get a detailed analysis of your website's performance and optimization recommendations",
    icon: LineChart,
    color: "bg-purple-500/20",
    textColor: "text-purple-400",
    status: "Available",
    href: "/dashboard/analysis",
    available: true,
  },
  {
    title: "SEO Optimization",
    description: "AI-powered SEO recommendations and automated optimization tools",
    icon: Target,
    color: "bg-blue-500/20",
    textColor: "text-blue-400",
    status: "Coming Q2 2025",
    href: "#",
    available: false,
    releaseInfo: "Automated SEO optimization with AI-driven recommendations",
  },
  {
    title: "Performance Metrics",
    description: "Advanced analytics and real-time performance tracking",
    icon: BarChart,
    color: "bg-green-500/20",
    textColor: "text-green-400",
    status: "Coming Q3 2025",
    href: "#",
    available: false,
    releaseInfo: "Real-time performance monitoring and detailed analytics",
  },
  {
    title: "Quick Insights",
    description: "Instant AI-generated insights about your website's performance",
    icon: Zap,
    color: "bg-yellow-500/20",
    textColor: "text-yellow-400",
    status: "Coming Q4 2025",
    href: "#",
    available: false,
    releaseInfo: "AI-powered instant website analysis and recommendations",
  },
]

export function RecommendationCards() {
  const router = useRouter()

  return (
    <TooltipProvider>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="cursor-pointer"
          >
            <Card className="group relative h-[240px] overflow-hidden border-gray-800 bg-gray-900 transition-colors hover:border-gray-700">
              <CardContent className="flex h-full flex-col p-6">
                <div className={`mb-4 inline-flex rounded-lg p-2.5 ${item.color}`}>
                  <item.icon className={`h-6 w-6 ${item.textColor}`} />
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <Badge
                    variant={item.available ? "success" : "secondary"}
                    className={item.available ? "bg-green-500/20 text-green-400" : "bg-gray-800 text-gray-400"}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="mb-4 flex-1 text-sm text-gray-400">{item.description}</p>
                {item.available ? (
                  <Button
                    variant="ghost"
                    className="flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
                    onClick={() => router.push(item.href)}
                  >
                    Try it now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="flex items-center text-sm font-medium text-gray-500" disabled>
                        <Lock className="mr-2 h-4 w-4" />
                        Coming Soon
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.releaseInfo}</p>
                      <p className="mt-1 text-xs text-gray-400">Expected: {item.status}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  )
}

