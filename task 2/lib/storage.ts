import fs from 'fs';
import path from 'path';
import { Review } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read all reviews from storage
export function getAllReviews(): Review[] {
  ensureDataDir();
  
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const reviews = JSON.parse(data);
    
    // Validate that it's an array
    if (!Array.isArray(reviews)) {
      console.error('Invalid data format: expected array');
      return [];
    }
    
    // Validate each review has required fields
    return reviews.filter((review: any) => {
      return (
        review &&
        typeof review === 'object' &&
        typeof review.id === 'string' &&
        typeof review.rating === 'number' &&
        typeof review.review === 'string' &&
        typeof review.timestamp === 'string'
      );
    });
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

// Save a new review
export function saveReview(review: Review): void {
  ensureDataDir();
  
  const reviews = getAllReviews();
  reviews.push(review);
  
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
  } catch (error) {
    console.error('Error saving review:', error);
    throw new Error('Failed to save review');
  }
}

// Get analytics
export function getAnalytics(): {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
  recentCount: number;
} {
  const reviews = getAllReviews();
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  
  const totalReviews = reviews.length;
  const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;
  let recentCount = 0;
  
  reviews.forEach(review => {
    ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1;
    totalRating += review.rating;
    
    const reviewTime = new Date(review.timestamp).getTime();
    if (reviewTime >= oneDayAgo) {
      recentCount++;
    }
  });
  
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
  
  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
    recentCount
  };
}
