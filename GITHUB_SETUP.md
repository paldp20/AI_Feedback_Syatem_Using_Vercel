# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `ai_feedback_system_using_vercel`
3. Description: "AI Feedback System deployed on Vercel"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "C:\Users\HP\Documents\ai_feedback_system_using_vercel"
git remote add origin https://github.com/YOUR_USERNAME/ai_feedback_system_using_vercel.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Alternative: Using SSH

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/ai_feedback_system_using_vercel.git
git branch -M main
git push -u origin main
```

## Verification

After pushing, visit:
https://github.com/YOUR_USERNAME/ai_feedback_system_using_vercel

You should see:
- `task 2/` folder containing all project files
- `README.md` in the root
