import axios from "axios";
import { AnalysisResponse, AnalysisResult } from "@/types/analysis";
import { config } from "@/lib/config";

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export interface AnalysisRequest {
  url: string;
  depth?: number;
  priority?: number;
}

/**
 * Service for website analysis API operations
 */

export const WebsiteAnalysisService = {
  /**
   * Start a new website analysis
   */

  startAnalysis: async (
    request: AnalysisRequest
  ): Promise<AnalysisResponse> => {
    try {
      const response = await apiClient.post("api/v1/analyze", {
        url: request.url,
        depth: request.depth || 1,
        priority: request.priority || 1,
      });

      return response.data;
    } catch (error) {
      console.error("Failed to start analysis:", error);
      throw error;
    }
  },

  /**
   * Get analysis results by task ID
   */

  getAnalysisResult: async (taskId: string): Promise<AnalysisResult> => {
    try {
      const response = await apiClient.get(`/api/v1/analysis/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get analysis result:", error);
      throw error;
    }
  },
};
