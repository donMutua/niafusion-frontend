"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Clock, Menu, X, Home, Settings, HelpCircle, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock function to simulate API call
const analyzeWebsite = async (url: string) => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return mock data
  return {
    task_id: "eab9a3e6-2bc9-4911-ba7b-c4780fed79c5",
    url: url,
    status: "completed",
    recommendations: [
      {
        category: "seo",
        title: "Improve On-Page SEO",
        description:
          "The website title and description are generic and lack keywords. Improve SEO by using relevant keywords related to kitchen gadgets and tools.",
        impact: "high",
        effort: "medium",
        steps: [
          "Conduct keyword research to identify relevant terms.",
          "Rewrite the title and meta description to include high-impact keywords.",
          "Optimize image alt text with descriptive keywords.",
        ],
        potential_benefit: "Increased organic search traffic and higher rankings.",
        priority: 1,
      },
      {
        category: "user_experience",
        title: "Enhance Visual Appeal and Navigation",
        description:
          "The website has limited images and unclear navigation. Improve visual appeal and usability with more engaging visuals and intuitive navigation.",
        impact: "high",
        effort: "medium",
        steps: [
          "Add more high-quality images of products and kitchen settings.",
          "Improve navigation by creating clear menu items with working links.",
          "Ensure consistent branding and visual style.",
        ],
        potential_benefit: "Improved user engagement and reduced bounce rate.",
        priority: 2,
      },
      {
        category: "technical",
        title: "Fix Broken Links and Improve Image Optimization",
        description:
          "Several links and images appear broken or incomplete. Fixing these issues improves website functionality and loading speed.",
        impact: "medium",
        effort: "low",
        steps: [
          "Check and fix all broken internal and external links.",
          "Optimize images for web using appropriate file formats and sizes.",
          "Ensure images load quickly to improve page speed.",
        ],
        potential_benefit: "Improved website performance and user experience.",
        priority: 3,
      },
    ],
    metadata: {
      title: "kitchen & cooking",
      description: "kitchen & cooing Accessories, Gadget, Tool",
      page_size: null,
      load_time: null,
      image_count: 3,
      external_links: 2,
      meta_tags: null,
      headers: null,
    },
    summary: null,
    error: null,
    created_at: "2025-02-24T07:18:08.243408Z",
    completed_at: "2025-02-24T07:18:08.243415Z",
  }
}

const ImpactBadge = ({ impact }: { impact: string }) => {
  const color =
    impact === "high"
      ? "bg-red-100 text-red-800"
      : impact === "medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800"
  return <Badge className={`${color} capitalize`}>{impact}</Badge>
}

const EffortBadge = ({ effort }: { effort: string }) => {
  const color =
    effort === "high"
      ? "bg-red-100 text-red-800"
      : effort === "medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800"
  return <Badge className={`${color} capitalize`}>{effort}</Badge>
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-4 z-50"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Niafusion</h2>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav>
        <ul className="space-y-4">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: Settings, label: "Settings" },
            { icon: HelpCircle, label: "Help" },
            { icon: LogOut, label: "Logout" },
          ].map((item, index) => (
            <li key={index}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}

export default function Dashboard() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const result = await analyzeWebsite(url)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing website:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold">OptiMind Dashboard</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <div className="mb-8">
          <div className="flex space-x-4">
            <Input
              type="url"
              placeholder="Enter your website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Website Metadata</h3>
                    <dl className="space-y-2">
                      {Object.entries(analysisResult.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="font-medium text-gray-600 capitalize">{key.replace("_", " ")}</dt>
                          <dd className="text-gray-900">{(value as React.ReactNode) || "N/A"}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Analysis Summary</h3>
                    <div className="flex justify-around text-center">
                      <div>
                        <div className="text-4xl font-bold text-blue-600">{analysisResult.recommendations.length}</div>
                        <div className="text-sm text-gray-600">Recommendations</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-green-600">
                          {analysisResult.recommendations.filter((r) => r.impact === "high").length}
                        </div>
                        <div className="text-sm text-gray-600">High Impact</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Recommendations</h3>
                <div className="space-y-6">
                  {analysisResult.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-semibold">{rec.title}</h4>
                            <div className="flex space-x-2">
                              <ImpactBadge impact={rec.impact} />
                              <EffortBadge effort={rec.effort} />
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{rec.description}</p>
                          <div className="mb-4">
                            <h5 className="font-semibold mb-2">Steps to Implement:</h5>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              {rec.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <span className="font-semibold text-blue-800">Potential Benefit: </span>
                            <span className="text-blue-700">{rec.potential_benefit}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

