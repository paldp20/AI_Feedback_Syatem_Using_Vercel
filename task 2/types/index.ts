// Request and Response schemas for API endpoints

export interface SubmitReviewRequest {
  rating: number; // 1-5
  review: string; // User's review text
}

export interface SubmitReviewResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    rating: number;
    review: string;
    aiResponse: string;
    aiSummary: string;
    recommendedActions: string;
    timestamp: string;
  };
  error?: string;
}

export interface Review {
  id: string;
  rating: number;
  review: string;
  aiResponse: string;
  aiSummary: string;
  recommendedActions: string;
  timestamp: string;
}

export interface GetAllReviewsResponse {
  success: boolean;
  data?: Review[];
  error?: string;
}

export interface Analytics {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: number]: number;
  };
  recentCount: number; // Reviews in last 24 hours
}
