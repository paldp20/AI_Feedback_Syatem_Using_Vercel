import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitReviewRequest, SubmitReviewResponse } from '@/types';
import { saveReview } from '@/lib/storage';
import { generateUserResponse, generateSummary, generateRecommendedActions } from '@/lib/llm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitReviewResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Validate request body
    const body: SubmitReviewRequest = req.body;
    
    // Validate rating
    if (!body.rating || typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be a number between 1 and 5',
      });
    }

    // Validate review (allow empty but must be string)
    if (body.review === undefined || typeof body.review !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Review must be a string',
      });
    }

    // Handle long reviews (truncate to 5000 characters)
    const review = body.review.length > 5000 ? body.review.substring(0, 5000) : body.review;
    const rating = Math.round(body.rating);

    // Generate AI responses (all server-side)
    const [aiResponse, aiSummary, recommendedActions] = await Promise.all([
      generateUserResponse(rating, review),
      generateSummary(rating, review),
      generateRecommendedActions(rating, review),
    ]);

    // Create review object
    const reviewData = {
      id: `review-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      rating,
      review: review.trim(),
      aiResponse,
      aiSummary,
      recommendedActions,
      timestamp: new Date().toISOString(),
    };

    // Save to storage
    try {
      saveReview(reviewData);
    } catch (storageError) {
      console.error('Storage error:', storageError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save review. Please try again.',
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Review submitted successfully',
      data: reviewData,
    });
  } catch (error) {
    console.error('Error processing review:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
}
