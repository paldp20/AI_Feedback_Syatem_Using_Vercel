# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Code

1. Ensure all files are committed to a Git repository (GitHub, GitLab, or Bitbucket)

### Step 2: Deploy via Vercel Dashboard

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in
3. Click **"New Project"**
4. Import your Git repository
5. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Add Environment Variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - (Optional - system works with fallback responses if not provided)
7. Click **"Deploy"**

### Step 3: Access Your Dashboards

After deployment, Vercel will provide you with:
- **User Dashboard**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`

### Step 4: (Optional) Add Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain

## Alternative: Deploy to Render

### Step 1: Prepare for Render

1. Ensure your `package.json` has a `start` script (already included)
2. Create a `render.yaml` file (optional, for easier setup)

### Step 2: Deploy

1. Go to [https://render.com](https://render.com)
2. Sign up or log in
3. Click **"New +"** → **"Web Service"**
4. Connect your Git repository
5. Configure:
   - **Name**: Your project name
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Add Environment Variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
7. Click **"Create Web Service"**

## Environment Variables

Required (optional):
- `OPENAI_API_KEY`: Your OpenAI API key for LLM features
  - If not provided, the system uses intelligent fallback responses
  - Get your key from: https://platform.openai.com/api-keys

## Post-Deployment Checklist

- [ ] Verify User Dashboard loads at root URL
- [ ] Verify Admin Dashboard loads at `/admin`
- [ ] Test submitting a review
- [ ] Verify AI response appears
- [ ] Check Admin Dashboard shows the submission
- [ ] Test auto-refresh on Admin Dashboard
- [ ] Verify analytics display correctly
- [ ] Test filtering by rating

## Troubleshooting

### Issue: Data not persisting on Vercel

**Solution**: File system writes on Vercel are ephemeral. For production, upgrade to a database:
- Use Vercel Postgres (recommended)
- Or use Vercel KV (Redis)
- Or use MongoDB Atlas

### Issue: Build fails

**Solution**: 
- Check Node.js version (requires 18+)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Issue: API routes return 500 errors

**Solution**:
- Check server logs in Vercel dashboard
- Verify environment variables are set
- Ensure data directory permissions (for local dev)

### Issue: LLM calls failing

**Solution**:
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI API quota/limits
- System will use fallback responses if API fails

## Production Recommendations

1. **Use a Database**: Replace file system storage with a proper database
2. **Add Authentication**: Protect the Admin Dashboard with authentication
3. **Rate Limiting**: Add rate limiting to API endpoints
4. **Monitoring**: Set up error monitoring (Sentry, etc.)
5. **Backup**: Regular backups of review data
6. **SSL**: Ensure HTTPS is enabled (automatic on Vercel)
