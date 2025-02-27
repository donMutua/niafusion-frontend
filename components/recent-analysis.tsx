"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentAnalyses = [
  {
    id: "#345678",
    website: "example.com",
    date: "22-06-23",
    score: "85/100",
    status: "Complete",
  },
  {
    id: "#345679",
    website: "mystore.com",
    date: "22-06-23",
    score: "92/100",
    status: "Complete",
  },
  {
    id: "#345680",
    website: "myblog.com",
    date: "22-06-23",
    score: "78/100",
    status: "Complete",
  },
  {
    id: "#345681",
    website: "portfolio.com",
    date: "22-06-23",
    score: "Pending",
    status: "In Progress",
  },
]

export default function RecentAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Website</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((analysis) => (
                <tr key={analysis.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium">{analysis.id}</td>
                  <td className="px-6 py-4">{analysis.website}</td>
                  <td className="px-6 py-4">{analysis.date}</td>
                  <td className="px-6 py-4">{analysis.score}</td>
                  <td className="px-6 py-4">
                    <Badge variant={analysis.status === "Complete" ? "success" : "secondary"}>{analysis.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

