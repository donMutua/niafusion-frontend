import { createClient } from "@/lib/supabase/client";
import { AnalysisResult } from "@/types/analysis";

export const UserAnalysisService = {
  /**
   * Save analysis result to Supabase
   */
  saveAnalysis: async (
    analysis: AnalysisResult,
    userId: string
  ): Promise<void> => {
    try {
      const supabase = createClient();

      //TODO: Calculate scores (for demonstration - you'd implement your actual scoring logic)
      const seoScore = Math.floor(Math.random() * 31) + 70; // Random score between 70-100
      const performanceScore = Math.floor(Math.random() * 31) + 70;
      const accessibilityScore = Math.floor(Math.random() * 31) + 70;
      const bestPracticesScore = Math.floor(Math.random() * 31) + 70;

      // Format the data to match Supabase table structure
      const analysisData = {
        user_id: userId,
        task_id: analysis.task_id,
        url: analysis.url,
        status: analysis.status,
        recommendations: analysis.recommendations,
        metadata: analysis.metadata,
        summary: analysis.summary,
        error: analysis.error,
        created_at: analysis.created_at,
        completed_at: analysis.completed_at,

        // Add scores
        seo_score: seoScore,
        performance_score: performanceScore,
        accessibility_score: accessibilityScore,
        best_practices_score: bestPracticesScore,
      };

      // Use upsert to handle both new records and updates
      const { error } = await supabase
        .from("user_analyses")
        .upsert(analysisData, {
          onConflict: "task_id",
          ignoreDuplicates: false, // Update if a record with the same task_id exists
        });

      if (error) throw error;
    } catch (error) {
      console.error("Failed to save analysis:", error);
      throw error;
    }
  },

  /**
   * Get all analyses for a user
   */
  getUserAnalyses: async (userId: string): Promise<AnalysisResult[]> => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_analyses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match AnalysisResult type
      return data.map((item) => ({
        task_id: item.task_id,
        url: item.url,
        status: item.status,
        recommendations: item.recommendations,
        metadata: item.metadata,
        summary: item.summary,
        error: item.error,
        created_at: item.created_at,
        completed_at: item.completed_at,
        // Add analytics property to match UI requirements
        analytics: {
          seo_score: item.seo_score || 75,
          performance_score: item.performance_score || 75,
          accessibility_score: item.accessibility_score || 75,
          best_practices_score: item.best_practices_score || 75,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch user analyses:", error);
      throw error;
    }
  },

  /**
   * Get a specific analysis by ID
   */
  getAnalysisById: async (taskId: string): Promise<AnalysisResult | null> => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_analyses")
        .select("*")
        .eq("task_id", taskId)
        .single();

      if (error) throw error;

      if (!data) return null;

      // Transform to match AnalysisResult type
      return {
        task_id: data.task_id,
        url: data.url,
        status: data.status,
        recommendations: data.recommendations,
        metadata: data.metadata,
        summary: data.summary,
        error: data.error,
        created_at: data.created_at,
        completed_at: data.completed_at,
        analytics: {
          seo_score: data.seo_score || 75,
          performance_score: data.performance_score || 75,
          accessibility_score: data.accessibility_score || 75,
          best_practices_score: data.best_practices_score || 75,
        },
      };
    } catch (error) {
      console.error("Failed to fetch analysis by ID:", error);
      return null;
    }
  },

  /**
   * Delete an analysis
   */
  deleteAnalysis: async (taskId: string): Promise<void> => {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("user_analyses")
        .delete()
        .eq("task_id", taskId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed to delete analysis:", error);
      throw error;
    }
  },
};
