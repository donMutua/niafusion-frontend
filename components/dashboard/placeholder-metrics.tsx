import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock } from "lucide-react"

export function PlaceholderMetrics() {
  const metrics = [
    { title: "Total Visitors", comingSoon: "Q3 2025" },
    { title: "Avg. Session Duration", comingSoon: "Q3 2025" },
    { title: "Bounce Rate", comingSoon: "Q3 2025" },
    { title: "Top Keywords", comingSoon: "Q4 2025" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-gray-800 bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{metric.title}</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-full bg-gray-800" />
            <div className="mt-2 flex items-center text-xs text-gray-400">
              <Clock className="mr-1 h-3 w-3" />
              Coming {metric.comingSoon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

