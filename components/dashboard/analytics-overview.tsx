"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, TrendingUp, Users, Search, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnalyticsData {
  totalVisitors: number
  visitorChange: number
  averageSessionDuration: number
  sessionDurationChange: number
  bounceRate: number
  bounceRateChange: number
  topKeywords: { keyword: string; volume: number }[]
}

const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    totalVisitors: 25890,
    visitorChange: 12.5,
    averageSessionDuration: 185,
    sessionDurationChange: 7.2,
    bounceRate: 42.3,
    bounceRateChange: -3.8,
    topKeywords: [
      { keyword: "kitchen gadgets", volume: 5400 },
      { keyword: "cooking tools", volume: 3200 },
      { keyword: "best chef knives", volume: 2800 },
      { keyword: "smart kitchen devices", volume: 2100 },
    ],
  }
}

export function AnalyticsOverview() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      }
    }

    loadAnalytics()
  }, [])

  if (!analyticsData) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-400">Loading analytics...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Visitors</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analyticsData.totalVisitors.toLocaleString()}</div>
          <p className="text-xs text-gray-400">
            {analyticsData.visitorChange > 0 ? (
              <span className="text-green-400">
                <ArrowUp className="mr-1 inline h-3 w-3" />
                {analyticsData.visitorChange}% from last month
              </span>
            ) : (
              <span className="text-red-400">
                <ArrowDown className="mr-1 inline h-3 w-3" />
                {Math.abs(analyticsData.visitorChange)}% from last month
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Avg. Session Duration</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {Math.floor(analyticsData.averageSessionDuration / 60)}m {analyticsData.averageSessionDuration % 60}s
          </div>
          <p className="text-xs text-gray-400">
            {analyticsData.sessionDurationChange > 0 ? (
              <span className="text-green-400">
                <ArrowUp className="mr-1 inline h-3 w-3" />
                {analyticsData.sessionDurationChange}% from last month
              </span>
            ) : (
              <span className="text-red-400">
                <ArrowDown className="mr-1 inline h-3 w-3" />
                {Math.abs(analyticsData.sessionDurationChange)}% from last month
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Bounce Rate</CardTitle>
          <Zap className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analyticsData.bounceRate.toFixed(1)}%</div>
          <p className="text-xs text-gray-400">
            {analyticsData.bounceRateChange < 0 ? (
              <span className="text-green-400">
                <ArrowDown className="mr-1 inline h-3 w-3" />
                {Math.abs(analyticsData.bounceRateChange)}% from last month
              </span>
            ) : (
              <span className="text-red-400">
                <ArrowUp className="mr-1 inline h-3 w-3" />
                {analyticsData.bounceRateChange}% from last month
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Top Keywords</CardTitle>
          <Search className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analyticsData.topKeywords.map((keyword, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{keyword.keyword}</span>
                <div className="flex items-center">
                  <Progress
                    value={(keyword.volume / analyticsData.topKeywords[0].volume) * 100}
                    className="h-2 w-16 bg-gray-800"
                    indicatorClassName="bg-green-600"
                  />
                  <span className="ml-2 text-xs text-gray-400">{keyword.volume}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

