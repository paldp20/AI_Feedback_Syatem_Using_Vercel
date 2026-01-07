import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Review, Analytics } from '@/types';

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const [reviewsRes, analyticsRes] = await Promise.all([
        fetch('/api/reviews/all'),
        fetch('/api/analytics'),
      ]);

      const reviewsData = await reviewsRes.json();
      const analyticsData = await analyticsRes.json();

      if (reviewsData.success) {
        setReviews(reviewsData.data || []);
      }

      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }

      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Auto-refresh every 10 seconds if enabled
    let interval: NodeJS.Timeout | undefined;
    if (autoRefresh) {
      interval = setInterval(fetchData, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchData]);

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#28a745';
    if (rating === 3) return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Admin Dashboard - Feedback System</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Feedback System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Monitor all feedback submissions</p>
        </div>

        {error && (
          <div className="card">
            <div className="alert alert-error">{error}</div>
          </div>
        )}

        {/* Analytics Card */}
        {analytics && (
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Analytics Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                  {analytics.totalReviews}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>Total Reviews</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                  {analytics.averageRating.toFixed(1)}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>Average Rating</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                  {analytics.recentCount}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>Last 24 Hours</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Rating Distribution</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div
                    key={star}
                    style={{
                      flex: '1',
                      minWidth: '120px',
                      padding: '1rem',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getRatingColor(star) }}>
                      {analytics.ratingDistribution[star] || 0}
                    </div>
                    <div style={{ color: '#666', marginTop: '0.5rem' }}>
                      {star} ★ {star > 1 ? 'stars' : 'star'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontWeight: 600 }}>Filter by Rating:</label>
              <select
                className="input"
                style={{ width: 'auto', minWidth: '150px' }}
                value={filterRating || ''}
                onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span>Auto-refresh (10s)</span>
              </label>
              <button className="btn btn-primary" onClick={fetchData} style={{ width: 'auto' }}>
                Refresh Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
            All Submissions ({filteredReviews.length})
          </h2>

          {filteredReviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              No reviews found{filterRating ? ` with ${filterRating} stars` : ''}.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    background: '#f8f9fa',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getRatingColor(review.rating) }}>
                          {review.rating} ★
                        </span>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          {formatDate(review.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {review.review && (
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: '#333' }}>User Review:</strong>
                      <p style={{ marginTop: '0.5rem', color: '#555', lineHeight: '1.6' }}>{review.review}</p>
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem', padding: '1rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
                    <strong style={{ color: '#667eea' }}>AI Summary:</strong>
                    <p style={{ marginTop: '0.5rem', color: '#555', lineHeight: '1.6' }}>{review.aiSummary}</p>
                  </div>

                  <div style={{ padding: '1rem', background: 'white', borderRadius: '6px', borderLeft: '3px solid #28a745' }}>
                    <strong style={{ color: '#28a745' }}>Recommended Actions:</strong>
                    <p style={{ marginTop: '0.5rem', color: '#555', lineHeight: '1.6' }}>{review.recommendedActions}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'underline', opacity: 0.9 }}>
            ← Back to User Dashboard
          </a>
        </div>
      </div>
    </>
  );
}
