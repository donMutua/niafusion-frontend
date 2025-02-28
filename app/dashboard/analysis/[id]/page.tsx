import { DashboardShell } from "@/components/dashboard/shell"
import { AnalysisView } from "@/components/dashboard/analysis-view"

export default async function AnalysisViewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">Analysis Results</h1>
          <p className="text-gray-400">Detailed view of the analysis for task ID: {params.id}</p>
        </div>
        <AnalysisView taskId={params.id} />
      </div>
    </DashboardShell>
  )
}

