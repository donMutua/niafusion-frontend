"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { AnalysisResult } from "@/types/analysis"

// Mock function to fetch a single analysis result
const fetchAnalysis = async (taskId: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    task_id: taskId,
    url: "https://example.com",
    status: "completed",
    recommendations: [
      {
        category: "seo",
        title: "Improve Meta Descriptions",
        description:
          "Your meta descriptions are too short or missing. Add descriptive and keyword-rich meta descriptions to improve click-through rates from search results.",
        impact: "high",
        effort: "medium",
        steps: [
          "Review all pages without meta descriptions",
          "Write unique, compelling meta descriptions for each page",
          "Include relevant keywords in the descriptions",
          "Keep descriptions between 120-160 characters",
        ],
        potential_benefit: "Increased click-through rates from search engine results pages",
        priority: 1,
      },
      {
        category: "performance",
        title: "Optimize Image Sizes",
        description:
          "Large image files are slowing down your page load times. Compress and resize images to improve overall site performance.",
        impact: "high",
        effort: "low",
        steps: [
          "Identify oversized images",
          "Use image compression tools to reduce file sizes",
          "Implement responsive images for different screen sizes",
          "Consider lazy loading for images below the fold",
        ],
        potential_benefit: "Faster page load times and improved user experience",
        priority: 2,
      },
      {
        category: "accessibility",
        title: "Add Alt Text to Images",
        description: "Many images on your site lack alt text, making them inaccessible to users with screen readers.",
        impact: "medium",
        effort: "low",
        steps: [
          "Review all images on the site",
          "Add descriptive alt text to each image",
          "Ensure decorative images have empty alt attributes",
          "Use meaningful text that describes the image content",
        ],
        potential_benefit: "Improved accessibility and potential SEO benefits",
        priority: 3,
      },
    ],
    metadata: {
      title: "Example Website - Home",
      description: "This is an example website for demonstration purposes",
      page_size: 1024000,
      load_time: 2.5,
      image_count: 15,
      external_links: 8,
      meta_tags: {
        "og:title": "Example Website",
        "og:description": "This is an example website for demonstration purposes",
        "twitter:card": "summary",
      },
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "max-age=3600",
      },
    },
    summary:
      "The website has several areas for improvement, particularly in SEO, performance, and accessibility. Addressing these issues could significantly enhance user experience and search engine rankings.",
    error: null,
    created_at: "2025-02-24T10:30:00Z",
    completed_at: "2025-02-24T10:31:30Z",
    analytics: {
      seo_score: 68,
      performance_score: 75,
      accessibility_score: 82,
      best_practices_score: 90,
    },
  }
}

const ScoreBadge = ({ score }: { score: number }) => {
  let color = "bg-red-500/20 text-red-400"
  if (score >= 90) {
    color = "bg-green-500/20 text-green-400"
  } else if (score >= 70) {
    color = "bg-yellow-500/20 text-yellow-400"
  } else if (score >= 50) {
    color = "bg-orange-500/20 text-orange-400"
  }
  return <Badge className={color}>{score}</Badge>
}

export function AnalysisView({ taskId }: { taskId: string }) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        const data = await fetchAnalysis(taskId)
        setAnalysis(data)
      } catch (error) {
        console.error("Error fetching analysis:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalysis()
  }, [taskId])

  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-400">Loading analysis...</div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">Analysis not found or an error occurred.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-gray-400">URL</p>
              <p className="font-medium text-white">{analysis.url}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <Badge
                variant={analysis.status === "completed" ? "success" : "secondary"}
                className="bg-green-500/20 text-green-400"
              >
                {analysis.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400">Analyzed At</p>
              <p className="font-medium text-white">
                {format(new Date(analysis.completed_at), "MMM d, yyyy HH:mm:ss")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-medium text-white">
                {((new Date(analysis.completed_at).getTime() - new Date(analysis.created_at).getTime()) / 1000).toFixed(
                  2,
                )}
                s
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Performance Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(analysis.analytics).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-400 capitalize">{key.replace("_", " ")}</p>
                <div className="flex items-center gap-2">
                  <Progress
                    value={value}
                    className="h-2 w-full bg-gray-800"
                    indicatorClassName={`${value >= 90 ? "bg-green-600" : value >= 70 ? "bg-yellow-600" : value >= 50 ? "bg-orange-600" : "bg-red-600"}`}
                  />
                  <ScoreBadge score={value} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <Card key={index} className="border-gray-700 bg-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                    <Badge
                      className={`${rec.impact === "high" ? "bg-red-500/20 text-red-400" : rec.impact === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}
                    >
                      {rec.impact} impact
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{rec.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Steps to Implement:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {rec.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-medium text-white">Potential Benefit:</h4>
                    <p className="text-gray-300">{rec.potential_benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-400">Title</p>
              <p className="font-medium text-white">{analysis.metadata.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Description</p>
              <p className="font-medium text-white">{analysis.metadata.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Page Size</p>
              <p className="font-medium text-white">{(analysis.metadata.page_size / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Load Time</p>
              <p className="font-medium text-white">{analysis.metadata.load_time.toFixed(2)}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Image Count</p>
              <p className="font-medium text-white">{analysis.metadata.image_count}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">External Links</p>
              <p className="font-medium text-white">{analysis.metadata.external_links}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{analysis.summary}</p>
        </CardContent>
      </Card>
    </div>
  )
}

