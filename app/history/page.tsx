import DashboardLayout from "@/components/dashboard-layout"
import AnalysisHistory from "@/components/analysis-history"

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Analysis History</h1>
          <p className="text-gray-500">View your past website analyses</p>
        </div>

        <AnalysisHistory />
      </div>
    </DashboardLayout>
  )
}

