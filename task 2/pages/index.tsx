import { useState } from 'react';
import Head from 'next/head';
import { SubmitReviewRequest, SubmitReviewResponse } from '@/types';

export default function UserDashboard() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setAiResponse('');

    // Validate rating
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody: SubmitReviewRequest = {
        rating,
        review: review.trim(),
      };

      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: SubmitReviewResponse = await response.json();

      if (data.success && data.data) {
        setAiResponse(data.data.aiResponse);
        setSuccess(true);
        // Reset form
        setRating(0);
        setReview('');
      } else {
        setError(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Feedback System - Submit Your Review</title>
        <meta name="description" content="Submit your feedback and get AI-powered responses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Share Your Feedback</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>We value your opinion</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                How would you rate your experience?
              </label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${rating >= star ? 'active' : ''}`}
                    onClick={() => handleStarClick(star)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStarClick(star);
                      }
                    }}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <label htmlFor="review" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                Your Review (Optional)
              </label>
              <textarea
                id="review"
                className="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                maxLength={5000}
              />
              <div style={{ textAlign: 'right', marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                {review.length}/5000 characters
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                Thank you! Your review has been submitted successfully.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || rating === 0}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {aiResponse && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
              <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>AI Response:</h3>
              <p style={{ lineHeight: '1.6', color: '#333' }}>{aiResponse}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/admin" style={{ color: 'white', textDecoration: 'underline', opacity: 0.9 }}>
            Admin Dashboard →
          </a>
        </div>
      </div>
    </>
  );
}
