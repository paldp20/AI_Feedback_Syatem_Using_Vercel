import type { NextApiRequest, NextApiResponse } from 'next';
import { getAnalytics } from '@/lib/storage';
import { Analytics } from '@/types';

interface AnalyticsResponse {
  success: boolean;
  data?: Analytics;
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const analytics = getAnalytics();
    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
    });
  }
}
