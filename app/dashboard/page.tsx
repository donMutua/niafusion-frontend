import { DashboardShell } from "@/components/dashboard/shell"
import { PlaceholderMetrics } from "@/components/dashboard/placeholder-metrics"
import { RecommendationCards } from "@/components/dashboard/recommendation-cards"
import { SearchCommand } from "@/components/dashboard/search-command"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
          <SearchCommand />
        </div>
        <PlaceholderMetrics />
        <div className="grid gap-6">
          <section>
            <h2 className="mb-4 text-lg font-medium text-white">Recommended Actions</h2>
            <RecommendationCards />
          </section>
        </div>
      </div>
    </DashboardShell>
  )
}

