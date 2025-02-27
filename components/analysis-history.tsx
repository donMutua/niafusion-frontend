"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye } from "lucide-react"
import type { AnalysisResult } from "@/types/analysis"

// Dummy history data
const dummyHistory: AnalysisResult[] = [
  {
    task_id: "eab9a3e6-2bc9-4911-ba7b-c4780fed79c5",
    url: "https://naifusion.com/",
    status: "completed",
    recommendations: [],
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
    created_at: "2025-02-24T07:18:08.243408Z",
    completed_at: "2025-02-24T07:18:08.243415Z",
  },
  {
    task_id: "f1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    url: "https://example.com/",
    status: "completed",
    recommendations: [],
    metadata: {
      title: "Example Domain",
      description: "This domain is for use in illustrative examples in documents.",
      page_size: null,
      load_time: null,
      image_count: 0,
      external_links: 1,
      meta_tags: null,
      headers: null,
    },
    summary: null,
    error: null,
    created_at: "2025-02-23T15:30:00.000000Z",
    completed_at: "2025-02-23T15:30:05.000000Z",
  },
]

export default function AnalysisHistory() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchAnalyses = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAnalyses(dummyHistory)
      } catch (error) {
        console.error("Error fetching analyses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Clock className="mr-2 h-4 w-4 animate-spin" />
            Loading analyses...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (analyses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">No analyses found. Start by analyzing a website.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <Card key={analysis.task_id} className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{analysis.url}</h4>
                    <p className="text-sm text-gray-500">{new Date(analysis.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={analysis.status === "completed" ? "success" : "default"}>{analysis.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

