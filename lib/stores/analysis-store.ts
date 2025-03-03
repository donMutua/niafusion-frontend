import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnalysisResult } from "@/types/analysis";
import { UserAnalysisService } from "../services/user-analysis-service";

interface AnalysisState {
  // Existing state for current analysis
  url: string;
  urlError: string | null;
  isAnalyzing: boolean;
  taskId: string | null;
  result: AnalysisResult | null;
  progress: number;
  error: string | null;
  activeTab: string;
  recentAnalyses: AnalysisResult[];
  userAnalyses: AnalysisResult[];
  isLoadingUserAnalyses: boolean;
  userAnalysesError: string | null;

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
  fetchUserAnalyses: (userId: string) => Promise<void>;
  addUserAnalysis: (analysis: AnalysisResult) => void;
  updateUserAnalysis: (analysis: AnalysisResult) => void;
  deleteUserAnalysis: (taskId: string) => Promise<void>;
  setUserAnalysesError: (error: string | null) => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      // Existing initial state
      url: "",
      urlError: null,
      isAnalyzing: false,
      taskId: null,
      result: null,
      progress: 0,
      error: null,
      activeTab: "overview",
      recentAnalyses: [],

      // New state for user analyses
      userAnalyses: [],
      isLoadingUserAnalyses: false,
      userAnalysesError: null,

      // Existing actions
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
          const exists = state.recentAnalyses.some(
            (item) => item.task_id === analysis.task_id
          );

          if (exists) {
            return {
              recentAnalyses: state.recentAnalyses.map((item) =>
                item.task_id === analysis.task_id ? analysis : item
              ),
            };
          } else {
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

      // New actions for user analyses
      fetchUserAnalyses: async (userId) => {
        set({ isLoadingUserAnalyses: true, userAnalysesError: null });
        try {
          const analyses = await UserAnalysisService.getUserAnalyses(userId);
          set({ userAnalyses: analyses });
        } catch (error) {
          console.error("Failed to fetch user analyses:", error);
          set({ userAnalysesError: "Failed to load your analysis history" });
        } finally {
          set({ isLoadingUserAnalyses: false });
        }
      },

      addUserAnalysis: (analysis) => {
        set((state) => {
          // Check if this analysis already exists
          const exists = state.userAnalyses.some(
            (item) => item.task_id === analysis.task_id
          );

          if (exists) {
            // Update existing
            return {
              userAnalyses: state.userAnalyses.map((item) =>
                item.task_id === analysis.task_id ? analysis : item
              ),
            };
          } else {
            // Add new
            return {
              userAnalyses: [analysis, ...state.userAnalyses],
            };
          }
        });
      },

      updateUserAnalysis: (analysis) => {
        set((state) => ({
          userAnalyses: state.userAnalyses.map((item) =>
            item.task_id === analysis.task_id ? analysis : item
          ),
        }));
      },

      deleteUserAnalysis: async (taskId) => {
        try {
          await UserAnalysisService.deleteAnalysis(taskId);
          set((state) => ({
            userAnalyses: state.userAnalyses.filter(
              (item) => item.task_id !== taskId
            ),
          }));
        } catch (error) {
          console.error("Failed to delete analysis:", error);
          throw error;
        }
      },

      setUserAnalysesError: (error) => set({ userAnalysesError: error }),
    }),
    {
      name: "website-analysis-storage",
      // Only persist certain parts of the state
      partialize: (state) => ({
        recentAnalyses: state.recentAnalyses,
        // We don't persist userAnalyses because we'll fetch them from Supabase
      }),
    }
  )
);
