"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import type { AnalysisResult } from "@/types/analysis"
import Link from "next/link"

// Mock function to fetch analysis history
const fetchAnalysisHistory = async (): Promise<AnalysisResult[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      task_id: "eab9a3e6-2bc9-4911-ba7b-c4780fed79c5",
      url: "https://example.com",
      status: "completed",
      recommendations: [],
      metadata: {
        title: "Example Website",
        description: "This is an example website",
        page_size: 1024,
        load_time: 1.5,
        image_count: 10,
        external_links: 5,
        meta_tags: null,
        headers: null,
      },
      summary: null,
      error: null,
      created_at: "2025-02-20T10:30:00Z",
      completed_at: "2025-02-20T10:31:00Z",
      analytics: {
        seo_score: 75,
        performance_score: 82,
        accessibility_score: 90,
        best_practices_score: 88,
      },
    },
    {
      task_id: "f1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      url: "https://anotherexample.com",
      status: "completed",
      recommendations: [],
      metadata: {
        title: "Another Example",
        description: "This is another example website",
        page_size: 2048,
        load_time: 2.0,
        image_count: 15,
        external_links: 8,
        meta_tags: null,
        headers: null,
      },
      summary: null,
      error: null,
      created_at: "2025-02-18T14:45:00Z",
      completed_at: "2025-02-18T14:46:30Z",
      analytics: {
        seo_score: 68,
        performance_score: 79,
        accessibility_score: 85,
        best_practices_score: 92,
      },
    },
  ]
}

export function AnalysisHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchAnalysisHistory()
        setHistory(data)
      } catch (error) {
        console.error("Error fetching analysis history:", error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  const toggleRowExpansion = (taskId: string) => {
    setExpandedRows((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-400">Loading analysis history...</div>
        </CardContent>
      </Card>
    )
  }

  if (history.length === 0) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">No analysis history found. Start by analyzing a website.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle className="text-white">Recent Analyses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Website</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">SEO Score</TableHead>
              <TableHead className="text-gray-400">Performance</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((analysis) => (
              <React.Fragment key={analysis.task_id}>
                <TableRow className="border-gray-800 transition-colors hover:bg-gray-800/50">
                  <TableCell className="text-white">{format(new Date(analysis.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell className="font-medium text-white">{analysis.url}</TableCell>
                  <TableCell>
                    <Badge
                      variant={analysis.status === "completed" ? "success" : "secondary"}
                      className="bg-green-500/20 text-green-400"
                    >
                      {analysis.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analysis.analytics.seo_score}
                        className="h-2 w-16 bg-gray-800"
                        indicatorClassName="bg-purple-600"
                      />
                      <span className="text-white">{analysis.analytics.seo_score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analysis.analytics.performance_score}
                        className="h-2 w-16 bg-gray-800"
                        indicatorClassName="bg-blue-600"
                      />
                      <span className="text-white">{analysis.analytics.performance_score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-400 hover:text-purple-300"
                        onClick={() => toggleRowExpansion(analysis.task_id)}
                      >
                        {expandedRows[analysis.task_id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="ml-2">Details</span>
                      </Button>
                      <Link href={`/dashboard/analysis/${analysis.task_id}`} passHref>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Full Analysis
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows[analysis.task_id] && (
                  <TableRow className="border-gray-800 bg-gray-900/50">
                    <TableCell colSpan={6} className="p-4">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid gap-4 rounded-lg bg-gray-800 p-4 text-white">
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                              <p className="text-sm text-gray-400">Page Size</p>
                              <p className="font-medium">
                                {analysis.metadata.page_size
                                  ? `${(analysis.metadata.page_size / 1024).toFixed(2)} KB`
                                  : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Load Time</p>
                              <p className="font-medium">
                                {analysis.metadata.load_time ? `${analysis.metadata.load_time.toFixed(2)}s` : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Images</p>
                              <p className="font-medium">{analysis.metadata.image_count}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">External Links</p>
                              <p className="font-medium">{analysis.metadata.external_links}</p>
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-sm text-gray-400">Analytics Scores</p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {Object.entries(analysis.analytics).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="capitalize">{key.replace("_", " ")}</span>
                                  <Progress
                                    value={value}
                                    className="h-2 w-24 bg-gray-700"
                                    indicatorClassName="bg-purple-600"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

