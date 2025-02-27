import { DashboardShell } from "@/components/dashboard/shell"
import { WebsiteAnalyzer } from "@/components/dashboard/website-analyzer"

export default function AnalysisPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">Website Analysis</h1>
          <p className="text-gray-400">Get detailed insights and recommendations for your website</p>
        </div>
        <WebsiteAnalyzer />
      </div>
    </DashboardShell>
  )
}

