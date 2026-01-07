# AI Feedback System - Two-Dashboard Web Application

A production-ready web application with two dashboards: a public-facing user dashboard for submitting feedback and an admin dashboard for monitoring all submissions with AI-powered insights.

## Features

### User Dashboard (Public)
- ⭐ Star rating selector (1-5 stars)
- 📝 Review text input (optional, max 5000 characters)
- 🤖 AI-generated personalized response
- ✅ Clear success/error states
- 💾 Automatic data persistence

### Admin Dashboard (Internal)
- 📊 Real-time analytics (total reviews, average rating, distribution)
- 🔄 Auto-refreshing submissions list (every 10 seconds)
- 🔍 Filter reviews by rating
- 📋 View all submissions with:
  - User rating
  - User review text
  - AI-generated summary
  - AI-suggested recommended actions
- 📈 Trend analysis (reviews in last 24 hours)

## Technical Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Backend**: Next.js API Routes
- **LLM Integration**: OpenAI GPT-3.5-turbo (server-side only)
- **Data Storage**: JSON file-based persistence (can be upgraded to database)
- **Deployment**: Vercel-ready configuration

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key (optional - fallback responses available if not provided)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Fynd_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: If you don't provide an OpenAI API key, the system will use intelligent fallback responses based on the rating.

4. Run the development server:
```bash
npm run dev
```

5. Open your browser:
- User Dashboard: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `OPENAI_API_KEY` with your API key

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Import the project in Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable `OPENAI_API_KEY`
   - Deploy

### Option 3: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Connect your Git repository or upload the project
4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variable `OPENAI_API_KEY`
6. Deploy

## API Endpoints

### POST `/api/reviews/submit`
Submit a new review.

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great service!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "id": "review-1234567890-abc123",
    "rating": 5,
    "review": "Great service!",
    "aiResponse": "Thank you for your positive feedback!...",
    "aiSummary": "5-star review praising the service",
    "recommendedActions": "Consider reaching out to thank the customer...",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### GET `/api/reviews/all`
Get all submitted reviews.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "review-1234567890-abc123",
      "rating": 5,
      "review": "Great service!",
      "aiResponse": "...",
      "aiSummary": "...",
      "recommendedActions": "...",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### GET `/api/analytics`
Get analytics data.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalReviews": 10,
    "averageRating": 4.2,
    "ratingDistribution": {
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 3,
      "5": 4
    },
    "recentCount": 3
  }
}
```

## Error Handling

The system gracefully handles:
- ✅ Empty reviews (allowed)
- ✅ Long reviews (truncated to 5000 characters)
- ✅ LLM API failures (fallback responses)
- ✅ Storage errors (user-friendly error messages)
- ✅ Network errors (clear error states)

## Data Persistence

Reviews are stored in `data/reviews.json`. This file is automatically created on first submission.

### Important Note for Vercel Deployment

**File system writes on Vercel are ephemeral** - data will persist during the function's lifetime but may be lost between deployments or after inactivity. For production deployments on Vercel, consider:

1. **Vercel Postgres** (Recommended - Free tier available)
2. **Vercel KV (Redis)** (Free tier available)
3. **MongoDB Atlas** (Free tier available)
4. **Supabase** (Free tier available)

The current implementation works perfectly for:
- Local development
- Short-term demos
- Testing purposes

To upgrade to a database, simply replace the functions in `lib/storage.ts` with database calls.

## Project Structure

```
├── pages/
│   ├── api/
│   │   ├── reviews/
│   │   │   ├── submit.ts      # Submit review endpoint
│   │   │   └── all.ts          # Get all reviews endpoint
│   │   └── analytics.ts        # Analytics endpoint
│   ├── _app.tsx               # App wrapper
│   ├── index.tsx              # User Dashboard
│   └── admin.tsx              # Admin Dashboard
├── lib/
│   ├── storage.ts             # Data persistence
│   └── llm.ts                 # LLM integration
├── types/
│   └── index.ts               # TypeScript types
├── styles/
│   └── globals.css            # Global styles
├── data/                      # Data storage (auto-created)
├── package.json
├── tsconfig.json
├── next.config.js
└── vercel.json                # Vercel configuration
```

## Security Notes

- All LLM calls are server-side only (no client-side API keys)
- Input validation on all API endpoints
- Request/response schemas enforced via TypeScript
- Error messages don't expose sensitive information

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
