"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { useAnalysisStore } from "@/lib/stores/analysis-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { WebsiteAnalysisService } from "@/lib/services/website-analysis-service";
import { UserAnalysisService } from "@/lib/services/user-analysis-service";
import { ImpactBadge, EffortBadge } from "@/components/analysis/status-badges";

export function AnalysisView({ taskId }: { taskId: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current user
  const { userId } = useCurrentUser();

  // Access Zustand store
  const { userAnalyses, fetchUserAnalyses, addUserAnalysis } =
    useAnalysisStore();

  // Find the analysis in the store
  const analysis = userAnalyses.find((a) => a.task_id === taskId);

  useEffect(() => {
    const loadAnalysis = async () => {
      // If analysis is already in store, we're done
      if (analysis) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Supabase first if user is logged in
        if (userId) {
          // First try to refresh the store
          await fetchUserAnalyses(userId);

          // Check if now in store after refresh
          const storeAnalysis = userAnalyses.find((a) => a.task_id === taskId);
          if (storeAnalysis) {
            setLoading(false);
            return;
          }

          // If not in store, try to get directly from Supabase
          const supabaseAnalysis = await UserAnalysisService.getAnalysisById(
            taskId
          );
          if (supabaseAnalysis) {
            // Add to store
            addUserAnalysis(supabaseAnalysis);
            setLoading(false);
            return;
          }
        }

        // If we get here, try the API directly
        const apiAnalysis = await WebsiteAnalysisService.getAnalysisResult(
          taskId
        );

        // Save to Supabase and add to store
        if (apiAnalysis && userId) {
          try {
            await UserAnalysisService.saveAnalysis(apiAnalysis, userId);
            addUserAnalysis(apiAnalysis);
          } catch (error) {
            console.error("Error saving analysis:", error);
            // Still show the analysis even if saving fails
          }
        }

        // If API fails, we'll reach here and error will be null
        // If no data is found, show error
        if (!analysis && !apiAnalysis) {
          setError("Analysis not found. It may have been deleted or expired.");
        }
      } catch (error) {
        console.error("Error loading analysis:", error);
        setError("Failed to load analysis. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [
    taskId,
    userId,
    analysis,
    userAnalyses,
    fetchUserAnalyses,
    addUserAnalysis,
  ]);

  // Show loading state
  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading analysis...
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error || !analysis) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <Alert
            variant="destructive"
            className="bg-red-900/20 border-red-800 text-red-300"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Analysis not found"}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Show analysis content
  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-gray-400">URL</p>
              <p className="font-medium text-white">{analysis.url}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <Badge
                variant={
                  analysis.status === "completed" ? "success" : "secondary"
                }
                className="bg-green-500/20 text-green-400"
              >
                {analysis.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400">Analyzed At</p>
              <p className="font-medium text-white">
                {format(
                  new Date(analysis.completed_at),
                  "MMM d, yyyy HH:mm:ss"
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-medium text-white">
                {(
                  (new Date(analysis.completed_at).getTime() -
                    new Date(analysis.created_at).getTime()) /
                  1000
                ).toFixed(2)}
                s
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Scores */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Performance Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {analysis.analytics && (
              <>
                <div>
                  <p className="text-sm text-gray-400">SEO Score</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={analysis.analytics.seo_score}
                      className="h-2 w-full bg-gray-800"
                      indicatorClassName="bg-purple-600"
                    />
                    <Badge className="bg-purple-500/20 text-purple-400">
                      {analysis.analytics.seo_score}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Performance</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={analysis.analytics.performance_score}
                      className="h-2 w-full bg-gray-800"
                      indicatorClassName="bg-blue-600"
                    />
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {analysis.analytics.performance_score}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Accessibility</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={analysis.analytics.accessibility_score}
                      className="h-2 w-full bg-gray-800"
                      indicatorClassName="bg-green-600"
                    />
                    <Badge className="bg-green-500/20 text-green-400">
                      {analysis.analytics.accessibility_score}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Best Practices</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={analysis.analytics.best_practices_score}
                      className="h-2 w-full bg-gray-800"
                      indicatorClassName="bg-yellow-600"
                    />
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      {analysis.analytics.best_practices_score}
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <Card key={index} className="border-gray-700 bg-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {rec.title}
                    </h3>
                    <div className="flex gap-2">
                      <ImpactBadge impact={rec.impact} />
                      <EffortBadge effort={rec.effort} />
                    </div>
                  </div>
                  <p className="text-gray-300">{rec.description}</p>
                  <div className="mt-4">
                    <h4 className="mb-3 font-medium text-white">
                      Implementation Steps:
                    </h4>
                    <ul className="list-inside list-disc space-y-2">
                      {rec.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-300">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 rounded-lg bg-purple-500/10 p-4">
                    <h4 className="mb-2 font-medium text-purple-400">
                      Potential Benefit
                    </h4>
                    <p className="text-gray-300">{rec.potential_benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white">Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-400">Title</p>
              <p className="font-medium text-white">
                {analysis.metadata.title || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Description</p>
              <p className="font-medium text-white">
                {analysis.metadata.description || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Page Size</p>
              <p className="font-medium text-white">
                {analysis.metadata.page_size
                  ? `${(analysis.metadata.page_size / 1024).toFixed(2)} KB`
                  : "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Load Time</p>
              <p className="font-medium text-white">
                {analysis.metadata.load_time
                  ? `${analysis.metadata.load_time.toFixed(2)}s`
                  : "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Image Count</p>
              <p className="font-medium text-white">
                {analysis.metadata.image_count ?? "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">External Links</p>
              <p className="font-medium text-white">
                {analysis.metadata.external_links ?? "Not available"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary - if available */}
      {analysis.summary && (
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{analysis.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
