export interface AnalysisStep {
  step: string;
}

export interface Recommendation {
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  steps: string[];
  potential_benefit: string;
  priority: number;
}

export interface Metadata {
  title: string | null;
  description: string | null;
  page_size: number | null;
  load_time: number | null;
  image_count: number | null;
  external_links: number | null;
  meta_tags: any | null;
  headers: any | null;
}

export interface AnalyticsScores {
  seo_score: number;
  performance_score: number;
  accessibility_score: number;
  best_practices_score: number;
}

export interface AnalysisResult {
  task_id: string;
  url: string;
  status: "completed" | "pending" | "failed";
  recommendations: Recommendation[];
  metadata: Metadata;
  summary: string | null;
  error: string | null;
  created_at: string;
  completed_at: string;
  analytics?: AnalyticsScores;
}

export interface AnalysisResponse {
  task_id: string;
  status: string;
  message: string;
}
