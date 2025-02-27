"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

interface AnalysisResult {
  task_id: string
  url: string
  status: string
  recommendations: Recommendation[]
  metadata: Metadata
  summary: string | null
  error: string | null
  created_at: string
  completed_at: string
}

interface Recommendation {
  category: string
  title: string
  description: string
  impact: string
  effort: string
  steps: string[]
  potential_benefit: string
  priority: number
}

interface Metadata {
  title: string | null
  description: string | null
  page_size: number | null
  load_time: number | null
  image_count: number | null
  external_links: number | null
  meta_tags: string | null
  headers: string | null
}

const mockAnalyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

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
}

export function WebsiteAnalyzer() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      const data = await mockAnalyzeWebsite(url)
      setResult(data)
      setProgress(100)
    } catch (error) {
      console.error("Error analyzing website:", error)
    } finally {
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="url"
                  placeholder="Enter your website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url}
                className="min-w-[120px] bg-purple-600 hover:bg-purple-700"
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
            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-purple-600" />
                <p className="text-sm text-gray-400">Analyzing your website... {progress}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {/* Overview */}
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-white">Analysis Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Status</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-medium text-white">Completed</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Images</p>
                    <p className="font-medium text-white">{result.metadata.image_count} images</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">External Links</p>
                    <p className="font-medium text-white">{result.metadata.external_links} links</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Analyzed At</p>
                    <p className="font-medium text-white">{new Date(result.completed_at).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="grid gap-6">
              {result.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-gray-800 bg-gray-900">
                    <CardContent className="p-6">
                      <div className="mb-6 flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{rec.title}</h3>
                          <p className="text-sm text-gray-400">Category: {rec.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            className={`${
                              rec.impact === "high"
                                ? "bg-red-500/20 text-red-400"
                                : rec.impact === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {rec.impact} impact
                          </Badge>
                          <Badge
                            className={`${
                              rec.effort === "high"
                                ? "bg-red-500/20 text-red-400"
                                : rec.effort === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {rec.effort} effort
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="text-gray-300">{rec.description}</p>
                        </div>
                        <div>
                          <h4 className="mb-3 font-medium text-white">Implementation Steps:</h4>
                          <ul className="list-inside list-disc space-y-2">
                            {rec.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-gray-300">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-lg bg-purple-500/10 p-4">
                          <h4 className="mb-2 font-medium text-purple-400">Potential Benefit</h4>
                          <p className="text-gray-300">{rec.potential_benefit}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

