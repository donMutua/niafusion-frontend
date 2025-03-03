"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { config } from "@/lib/config";
import { useAnalysisStore } from "@/lib/stores/analysis-store";
import { WebsiteAnalysisService } from "@/lib/services/website-analysis-service";
import { isValidUrl, normalizeUrl } from "@/lib/utils/url-helpers";
import { ImpactBadge, EffortBadge } from "@/components/analysis/status-badges";

export function WebsiteAnalyzer() {
  // Local state
  const [activeTab, setActiveTab] = useState("overview");

  // Global state from Zustand store
  const {
    url,
    setUrl,
    urlError,
    setUrlError,
    isAnalyzing,
    setIsAnalyzing,
    taskId,
    setTaskId,
    result,
    setResult,
    progress,
    setProgress,
    error: analysisError,
    setError,
    addRecentAnalysis,
    reset,
  } = useAnalysisStore();

  // Function to handle polling for results
  const pollForResults = useCallback(
    async (taskId: string) => {
      try {
        const result = await WebsiteAnalysisService.getAnalysisResult(taskId);

        if (result.status === "completed") {
          setResult(result);
          setProgress(100);
          setIsAnalyzing(false);
          addRecentAnalysis(result);

          toast({
            title: "Analysis completed",
            description: "Your website analysis is ready to view.",
          });

          return true;
        } else if (result.status === "failed") {
          setError("Analysis failed. Please try again.");
          setIsAnalyzing(false);
          setProgress(0);

          toast({
            title: "Analysis failed",
            description: result.error || "Please try again later.",
            variant: "destructive",
          });

          return true;
        }

        return false;
      } catch (err) {
        console.error("Error polling for results:", err);
        return false;
      }
    },
    [setResult, setProgress, setIsAnalyzing, setError, addRecentAnalysis]
  );

  // Function to start analysis
  const startAnalysis = async () => {
    // Reset previous states
    reset();
    setIsAnalyzing(true);

    // Validate URL
    if (!isValidUrl(url)) {
      setUrlError(
        "Please enter a valid URL (e.g., example.com or https://example.com)"
      );
      setIsAnalyzing(false);

      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });

      return;
    }

    const normalizedUrl = normalizeUrl(url);

    try {
      // Create a progress interval to show activity
      const progressInterval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 2;
        });
      }, config.analysis.progressIntervalMs);

      // Start the analysis
      const response = await WebsiteAnalysisService.startAnalysis({
        url: normalizedUrl,
        depth: 1,
        priority: 1,
      });

      const newTaskId = response.task_id;
      setTaskId(newTaskId);

      toast({
        title: "Analysis started",
        description: "We're analyzing your website. This may take a minute.",
      });

      // Start polling for results
      let completed = false;
      let attempts = 0;
      const maxAttempts = config.analysis.maxPollingAttempts;

      const pollInterval = setInterval(async () => {
        attempts++;

        try {
          completed = await pollForResults(newTaskId);

          if (completed || attempts >= maxAttempts) {
            clearInterval(pollInterval);
            clearInterval(progressInterval);

            if (!completed && attempts >= maxAttempts) {
              setError(
                "Analysis is taking longer than expected. Please check back later."
              );
              setIsAnalyzing(false);

              toast({
                title: "Analysis timeout",
                description:
                  "Please check your analysis history later for results.",
                variant: "destructive",
              });
            }
          }
        } catch (err) {
          console.error("Error in polling interval:", err);
          clearInterval(pollInterval);
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setError("An error occurred while analyzing your website.");

          toast({
            title: "Analysis error",
            description: "An error occurred. Please try again later.",
            variant: "destructive",
          });
        }
      }, config.analysis.pollingIntervalMs);
    } catch (err) {
      console.error("Error starting analysis:", err);
      setIsAnalyzing(false);
      setError("Failed to start analysis. Please try again.");

      toast({
        title: "Failed to start analysis",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAnalyzing) {
      startAnalysis();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                onClick={startAnalysis}
                disabled={isAnalyzing || !url.trim()}
                className="min-w-[120px] bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {urlError && (
              <Alert
                variant="destructive"
                className="bg-red-900/20 border-red-800 text-red-300"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{urlError}</AlertDescription>
              </Alert>
            )}

            {isAnalyzing && (
              <div className="space-y-2">
                <Progress
                  value={progress}
                  className="h-2 bg-gray-800"
                  indicatorClassName="bg-purple-600"
                />
                <p className="text-sm text-gray-400">
                  Analyzing your website... {progress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 bg-gray-800 text-gray-400">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                  Recommendations
                </TabsTrigger>
                <TabsTrigger
                  value="metadata"
                  className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                  Metadata
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Analysis Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Website</p>
                        <div className="flex items-center">
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-white hover:text-purple-400 flex items-center"
                          >
                            {result.url}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Status</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="font-medium text-white">
                            Completed
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Recommendations</p>
                        <p className="font-medium text-white">
                          {result.recommendations.length} items
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Analyzed At</p>
                        <p className="font-medium text-white">
                          {new Date(result.completed_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Website Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Title</span>
                            <span className="font-medium text-white">
                              {result.metadata.title || "Not available"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400">Images</span>
                            <span className="font-medium text-white">
                              {result.metadata.image_count ?? "N/A"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              External Links
                            </span>
                            <span className="font-medium text-white">
                              {result.metadata.external_links ?? "N/A"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-400">Description</span>
                            <span className="font-medium text-white truncate max-w-[15rem]">
                              {result.metadata.description || "Not available"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-800 p-4">
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Key Findings
                        </h3>
                        <div className="space-y-3">
                          {result.recommendations
                            .slice(0, 3)
                            .map((rec, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div
                                  className={`mt-0.5 h-2 w-2 rounded-full ${
                                    rec.impact === "high"
                                      ? "bg-red-400"
                                      : rec.impact === "medium"
                                      ? "bg-yellow-400"
                                      : "bg-green-400"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium text-white">
                                    {rec.title}
                                  </p>
                                  <p className="text-sm text-gray-400 truncate max-w-[15rem]">
                                    {rec.description.split(".")[0]}.
                                  </p>
                                </div>
                              </div>
                            ))}

                          <Button
                            variant="ghost"
                            className="mt-2 w-full text-purple-400 hover:text-purple-300 hover:bg-gray-700"
                            onClick={() => setActiveTab("recommendations")}
                          >
                            View All Recommendations
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                <div className="grid gap-6">
                  <h3 className="text-xl font-semibold text-white">
                    Detailed Recommendations
                  </h3>
                  {result.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-gray-800 bg-gray-900">
                        <CardContent className="p-6">
                          <div className="mb-6 flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {rec.title}
                              </h3>
                              <p className="text-sm text-gray-400">
                                Category: {rec.category}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <ImpactBadge impact={rec.impact} />
                              <EffortBadge effort={rec.effort} />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <p className="text-gray-300">{rec.description}</p>
                            </div>
                            <div>
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
                            <div className="rounded-lg bg-purple-500/10 p-4">
                              <h4 className="mb-2 font-medium text-purple-400">
                                Potential Benefit
                              </h4>
                              <p className="text-gray-300">
                                {rec.potential_benefit}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="metadata" className="mt-6">
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Website Metadata
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Title</p>
                        <p className="font-medium text-white">
                          {result.metadata.title || "Not available"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="font-medium text-white">
                          {result.metadata.description || "Not available"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Page Size</p>
                        <p className="font-medium text-white">
                          {result.metadata.page_size
                            ? `${(result.metadata.page_size / 1024).toFixed(
                                2
                              )} KB`
                            : "Not available"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Load Time</p>
                        <p className="font-medium text-white">
                          {result.metadata.load_time
                            ? `${result.metadata.load_time.toFixed(2)}s`
                            : "Not available"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Image Count</p>
                        <p className="font-medium text-white">
                          {result.metadata.image_count ?? "Not available"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">External Links</p>
                        <p className="font-medium text-white">
                          {result.metadata.external_links ?? "Not available"}
                        </p>
                      </div>
                    </div>

                    {result.metadata.meta_tags && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-lg font-medium text-white">
                          Meta Tags
                        </h3>
                        <pre className="rounded-lg bg-gray-800 p-4 overflow-auto text-sm text-gray-300">
                          {JSON.stringify(result.metadata.meta_tags, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.metadata.headers && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-lg font-medium text-white">
                          Headers
                        </h3>
                        <pre className="rounded-lg bg-gray-800 p-4 overflow-auto text-sm text-gray-300">
                          {JSON.stringify(result.metadata.headers, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>

      {analysisError && !result && (
        <Alert
          variant="destructive"
          className="bg-red-900/20 border-red-800 text-red-300"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{analysisError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
