"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AnalysisResult } from "@/types/analysis"

// Dummy analysis result
const dummyAnalysisResult: AnalysisResult = {
  task_id: "eab9a3e6-2bc9-4911-ba7b-c4780fed79c5",
  url: "https://naifusion.com/",
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
    description: "kitchen & cooking Accessories, Gadget, Tool",
    page_size: null,
    load_time: null,
    image_count: 3,
    external_links: 2,
    meta_tags: null,
    headers: null,
  },
  summary: null,
  error: null,
  created_at: new Date().toISOString(),
  completed_at: new Date().toISOString(),
}

export default function UrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Use dummy result
      setCurrentAnalysis({
        ...dummyAnalysisResult,
        url: url, // Use the entered URL
      })

      // In a real application, you would save this to your backend
      console.log("Analysis saved:", dummyAnalysisResult)
    } catch (error) {
      console.error("Error analyzing URL:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-white">Analyze Website</h2>
            <p className="text-gray-400">Enter your website URL to get detailed optimization recommendations</p>
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="url"
                  placeholder="https://your-website.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
        </CardContent>
      </Card>

      <AnimatePresence>
        {currentAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Website Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Title</span>
                      <span className="font-medium">{currentAnalysis.metadata.title || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Images</span>
                      <span className="font-medium">{currentAnalysis.metadata.image_count || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">External Links</span>
                      <span className="font-medium">{currentAnalysis.metadata.external_links || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <Badge variant="success">{currentAnalysis.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Task ID</span>
                      <span className="font-mono text-sm">{currentAnalysis.task_id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed At</span>
                      <span className="text-sm">{new Date(currentAnalysis.completed_at).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Recommendations</h3>
              {currentAnalysis.recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant={rec.impact === "high" ? "destructive" : "default"}>Impact: {rec.impact}</Badge>
                        <Badge variant={rec.effort === "low" ? "success" : "default"}>Effort: {rec.effort}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Implementation Steps:</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {rec.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-gray-600">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">Potential Benefit:</h5>
                        <p className="text-blue-700">{rec.potential_benefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

