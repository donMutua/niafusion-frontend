import { AnalysisResult, Recommendation, Metadata } from "@/types/analysis";

/**
 * Calculate analysis scores based on recommendations and metadata
 */
export function calculateAnalysisScores(analysis: AnalysisResult) {
  // Initialize baseline scores
  let seo = 80;
  let performance = 80;
  let accessibility = 80;
  let bestPractices = 80;

  // Define impact weights
  const impactWeights = {
    high: -10,
    medium: -5,
    low: -2,
  };

  // Group recommendations by category
  const categories = categorizeRecommendations(analysis.recommendations);

  // Apply recommendation impacts
  seo += calculateCategoryImpact(categories.seo, impactWeights);
  performance += calculateCategoryImpact(categories.performance, impactWeights);
  accessibility += calculateCategoryImpact(
    categories.accessibility,
    impactWeights
  );

  // UX, conversion, security, mobile all affect best practices
  bestPractices += calculateCategoryImpact(
    categories.userExperience,
    impactWeights
  );
  bestPractices += calculateCategoryImpact(
    categories.conversion,
    impactWeights
  );
  bestPractices += calculateCategoryImpact(categories.security, impactWeights);

  // Technical issues can affect both SEO and performance
  const technicalImpact = calculateCategoryImpact(
    categories.technical,
    impactWeights
  );
  seo += technicalImpact / 2;
  performance += technicalImpact / 2;

  // Content affects SEO
  seo += calculateCategoryImpact(categories.content, impactWeights);

  // Mobile affects both best practices and SEO
  const mobileImpact = calculateCategoryImpact(
    categories.mobile,
    impactWeights
  );
  bestPractices += mobileImpact / 2;
  seo += mobileImpact / 2;

  // Adjust based on metadata factors
  adjustScoresBasedOnMetadata(analysis.metadata, {
    seo,
    performance,
    accessibility,
    bestPractices,
  });

  return {
    seo: clampScore(seo),
    performance: clampScore(performance),
    accessibility: clampScore(accessibility),
    bestPractices: clampScore(bestPractices),
  };
}

/**
 * Categorize recommendations by their type
 */
function categorizeRecommendations(recommendations: Recommendation[]) {
  const categories = {
    seo: [] as Recommendation[],
    performance: [] as Recommendation[],
    accessibility: [] as Recommendation[],
    userExperience: [] as Recommendation[],
    conversion: [] as Recommendation[],
    security: [] as Recommendation[],
    mobile: [] as Recommendation[],
    content: [] as Recommendation[],
    technical: [] as Recommendation[],
    other: [] as Recommendation[],
  };

  // Categorize each recommendation
  for (const rec of recommendations) {
    const category = rec.category.toLowerCase();

    if (category.includes("seo")) {
      categories.seo.push(rec);
    } else if (
      category.includes("performance") ||
      category.includes("speed") ||
      category.includes("load")
    ) {
      categories.performance.push(rec);
    } else if (
      category.includes("accessibility") ||
      category.includes("a11y")
    ) {
      categories.accessibility.push(rec);
    } else if (
      category.includes("user_experience") ||
      category.includes("ux") ||
      category.includes("navigation")
    ) {
      categories.userExperience.push(rec);
    } else if (category.includes("conversion") || category.includes("cta")) {
      categories.conversion.push(rec);
    } else if (category.includes("security") || category.includes("privacy")) {
      categories.security.push(rec);
    } else if (category.includes("mobile") || category.includes("responsive")) {
      categories.mobile.push(rec);
    } else if (category.includes("content")) {
      categories.content.push(rec);
    } else if (category.includes("technical")) {
      categories.technical.push(rec);
    } else {
      categories.other.push(rec);
    }
  }

  return categories;
}

/**
 * Calculate impact score for a category
 */
function calculateCategoryImpact(
  recs: Recommendation[],
  impactWeights: Record<string, number>
) {
  if (recs.length === 0) return 0;

  return recs.reduce((total, rec) => {
    return total + (impactWeights[rec.impact] || -3); // Default to -3 if impact not found
  }, 0);
}

/**
 * Adjust scores based on metadata factors
 */
function adjustScoresBasedOnMetadata(
  metadata: Metadata,
  scores: Record<string, number>
) {
  // Title evaluation
  if (!metadata.title || metadata.title.trim() === "") {
    scores.seo -= 15; // Missing title is a major SEO issue
  } else if (metadata.title && metadata.title.length < 10) {
    scores.seo -= 5; // Too short title
  } else if (metadata.title && metadata.title.length > 60) {
    scores.seo -= 3; // Too long title
  }

  // Description evaluation
  if (!metadata.description || metadata.description.trim() === "") {
    scores.seo -= 10; // Missing description
  } else if (metadata.description && metadata.description.length < 50) {
    scores.seo -= 5; // Too short description
  } else if (metadata.description && metadata.description.length > 160) {
    scores.seo -= 3; // Too long description
  }

  // Performance factors
  if (metadata.page_size !== null) {
    if (metadata.page_size > 5000000) {
      // > 5MB
      scores.performance -= 15;
    } else if (metadata.page_size > 2000000) {
      // > 2MB
      scores.performance -= 10;
    } else if (metadata.page_size > 1000000) {
      // > 1MB
      scores.performance -= 5;
    }
  }

  if (metadata.load_time !== null) {
    if (metadata.load_time < 1) {
      scores.performance += 10; // Excellent load time
    } else if (metadata.load_time < 2) {
      scores.performance += 5; // Good load time
    } else if (metadata.load_time > 4) {
      scores.performance -= 15; // Poor load time
    } else if (metadata.load_time > 3) {
      scores.performance -= 10; // Slow load time
    }
  }

  // Meta tags
  if (metadata.meta_tags) {
    if (metadata.meta_tags.viewport) {
      scores.bestPractices += 5; // Has responsive meta tag
      scores.accessibility += 3;
    }

    if (metadata.meta_tags.robots) {
      scores.seo += 5; // Has robots meta tag
    }

    // Check for social media tags
    const hasSocialTags = Object.keys(metadata.meta_tags).some(
      (key) => key.includes("og:") || key.includes("twitter:")
    );

    if (hasSocialTags) {
      scores.seo += 3; // Has social media tags
    }
  }
}

/**
 * Ensure score is within 0-100 range
 */
function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}
