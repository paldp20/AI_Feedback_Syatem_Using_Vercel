import type { NextApiRequest, NextApiResponse } from 'next';
import { GetAllReviewsResponse } from '@/types';
import { getAllReviews } from '@/lib/storage';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAllReviewsResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const reviews = getAllReviews();
    
    // Sort by timestamp (newest first)
    const sortedReviews = reviews.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return res.status(200).json({
      success: true,
      data: sortedReviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
    });
  }
}
