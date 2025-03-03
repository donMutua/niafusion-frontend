// lib/stores/analysis-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnalysisResult } from "@/types/analysis";

interface AnalysisState {
  // Current analysis
  url: string;
  urlError: string | null;
  isAnalyzing: boolean;
  taskId: string | null;
  result: AnalysisResult | null;
  progress: number;
  error: string | null;
  activeTab: string;

  // Recent analyses history
  recentAnalyses: AnalysisResult[];

  // Actions
  setUrl: (url: string) => void;
  setUrlError: (error: string | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setTaskId: (taskId: string | null) => void;
  setResult: (result: AnalysisResult | null) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  setError: (error: string | null) => void;
  setActiveTab: (tab: string) => void;
  addRecentAnalysis: (analysis: AnalysisResult) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      // Initial state
      url: "",
      urlError: null,
      isAnalyzing: false,
      taskId: null,
      result: null,
      progress: 0,
      error: null,
      activeTab: "overview",
      recentAnalyses: [],

      // Actions
      setUrl: (url) => set({ url }),
      setUrlError: (urlError) => set({ urlError }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setTaskId: (taskId) => set({ taskId }),
      setResult: (result) => set({ result }),
      setProgress: (progress) =>
        set((state) => ({
          progress:
            typeof progress === "function"
              ? progress(state.progress)
              : progress,
        })),
      setError: (error) => set({ error }),
      setActiveTab: (activeTab) => set({ activeTab }),

      addRecentAnalysis: (analysis) =>
        set((state) => {
          // Check if this analysis already exists (by task_id)
          const exists = state.recentAnalyses.some(
            (item) => item.task_id === analysis.task_id
          );

          if (exists) {
            // Replace the existing analysis with the updated one
            return {
              recentAnalyses: state.recentAnalyses.map((item) =>
                item.task_id === analysis.task_id ? analysis : item
              ),
            };
          } else {
            // Add the new analysis and keep only the 5 most recent
            return {
              recentAnalyses: [analysis, ...state.recentAnalyses].slice(0, 5),
            };
          }
        }),

      reset: () =>
        set({
          urlError: null,
          isAnalyzing: false,
          taskId: null,
          progress: 0,
          error: null,
        }),
    }),
    {
      name: "website-analysis-storage",
      // Only persist recent analyses
      partialize: (state) => ({ recentAnalyses: state.recentAnalyses }),
    }
  )
);
