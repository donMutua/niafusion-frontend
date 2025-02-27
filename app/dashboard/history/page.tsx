import { DashboardShell } from "@/components/dashboard/shell"
import { AnalysisHistory } from "@/components/dashboard/analysis-history"

export default function HistoryPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">Analysis History</h1>
          <p className="text-gray-400">View your past website analyses and track improvements over time</p>
        </div>
        <AnalysisHistory />
      </div>
    </DashboardShell>
  )
}

