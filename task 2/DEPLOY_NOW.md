# Quick Deployment Guide

## Option 1: Deploy via Vercel CLI (Current Method)

### Step 1: Login to Vercel
```bash
vercel login
```
This will open a browser window. Complete the authentication.

### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for first deployment)
- **Project name?** → Press Enter (uses default) or enter a custom name
- **Directory?** → Press Enter (uses current directory)
- **Override settings?** → No

### Step 3: Add Environment Variable (Optional)
After deployment, add your OpenAI API key:
```bash
vercel env add OPENAI_API_KEY
```
Or add it via Vercel Dashboard:
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your key value

### Step 4: Redeploy (if you added env var)
```bash
vercel --prod
```

## Option 2: Deploy via Vercel Dashboard (Easier)

### Step 1: Push to GitHub
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Import in Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
5. Add Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key (optional)
6. Click "Deploy"

## After Deployment

Your dashboards will be available at:
- **User Dashboard**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`

## Important Notes

1. **Data Persistence**: File system storage on Vercel is ephemeral. For production, consider upgrading to a database (Vercel Postgres, MongoDB Atlas, etc.)

2. **OpenAI API Key**: Optional - the system works with fallback responses if not provided

3. **Custom Domain**: You can add a custom domain in Vercel project settings
