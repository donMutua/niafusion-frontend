"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import type { AnalysisResult } from "@/types/analysis";
import Link from "next/link";
import { useAnalysisStore } from "@/lib/stores/analysis-store";
import { useCurrentUser } from "@/hooks/use-current-user";

export function AnalysisHistory() {
  const router = useRouter();
  const { userId, isLoading: isUserLoading } = useCurrentUser();

  // Get analyses from Zustand store
  const {
    userAnalyses,
    isLoadingUserAnalyses,
    userAnalysesError,
    fetchUserAnalyses,
    deleteUserAnalysis,
  } = useAnalysisStore();

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Fetch analyses when component mounts
  useEffect(() => {
    if (!isUserLoading && userId) {
      fetchUserAnalyses(userId);
    }
  }, [userId, isUserLoading, fetchUserAnalyses]);

  const toggleRowExpansion = (taskId: string) => {
    setExpandedRows((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleDeleteAnalysis = async (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this analysis?")) {
      try {
        await deleteUserAnalysis(taskId);
        toast({
          title: "Analysis deleted",
          description: "The analysis has been removed from your history.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete analysis. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isUserLoading || isLoadingUserAnalyses) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading analysis history...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userAnalysesError) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <Alert className="bg-red-900/20 border-red-800 text-red-300">
            <AlertDescription>{userAnalysesError}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (userAnalyses.length === 0) {
    return (
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            <p className="mb-4">
              No analysis history found. Start by analyzing a website.
            </p>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push("/dashboard/analysis")}
            >
              Analyze a Website <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
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
            {userAnalyses.map((analysis) => (
              <React.Fragment key={analysis.task_id}>
                <TableRow className="border-gray-800 transition-colors hover:bg-gray-800/50">
                  <TableCell className="text-white">
                    {format(new Date(analysis.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    {analysis.url}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        analysis.status === "completed"
                          ? "success"
                          : "secondary"
                      }
                      className="bg-green-500/20 text-green-400"
                    >
                      {analysis.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analysis.analytics?.seo_score || 75}
                        className="h-2 w-16 bg-gray-800"
                        indicatorClassName="bg-purple-600"
                      />
                      <span className="text-white">
                        {analysis.analytics?.seo_score || 75}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analysis.analytics?.performance_score || 75}
                        className="h-2 w-16 bg-gray-800"
                        indicatorClassName="bg-blue-600"
                      />
                      <span className="text-white">
                        {analysis.analytics?.performance_score || 75}
                      </span>
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
                      <Link
                        href={`/dashboard/analysis/${analysis.task_id}`}
                        passHref
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                        onClick={(e) =>
                          handleDeleteAnalysis(analysis.task_id, e)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                              <p className="text-sm text-gray-400">
                                Recommendations
                              </p>
                              <p className="font-medium">
                                {analysis.recommendations.length}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Images</p>
                              <p className="font-medium">
                                {analysis.metadata.image_count || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">
                                External Links
                              </p>
                              <p className="font-medium">
                                {analysis.metadata.external_links || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Completed</p>
                              <p className="font-medium">
                                {format(
                                  new Date(analysis.completed_at),
                                  "HH:mm:ss"
                                )}
                              </p>
                            </div>
                          </div>
                          {analysis.recommendations.length > 0 && (
                            <div>
                              <p className="mb-2 text-sm text-gray-400">
                                Top Recommendations
                              </p>
                              <div className="space-y-2">
                                {analysis.recommendations
                                  .slice(0, 2)
                                  .map((rec, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <div
                                        className={`mt-1 h-2 w-2 rounded-full ${
                                          rec.impact === "high"
                                            ? "bg-red-400"
                                            : rec.impact === "medium"
                                            ? "bg-yellow-400"
                                            : "bg-green-400"
                                        }`}
                                      />
                                      <div>
                                        <p className="font-medium">
                                          {rec.title}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                          {rec.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
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
  );
}
