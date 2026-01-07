# Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment (optional):**
   Create `.env.local` file:
   ```
   OPENAI_API_KEY=your_key_here
   ```
   *Note: System works without API key using fallback responses*

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - User Dashboard: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Testing the Application

### User Dashboard Test Flow:
1. Go to http://localhost:3000
2. Select a star rating (1-5)
3. Optionally write a review
4. Click "Submit Review"
5. Verify AI response appears
6. Check success message

### Admin Dashboard Test Flow:
1. Go to http://localhost:3000/admin
2. View analytics (should show 0 initially)
3. Submit a review from User Dashboard
4. Return to Admin Dashboard
5. Verify the review appears in the list
6. Test auto-refresh (wait 10 seconds or click "Refresh Now")
7. Test rating filter
8. Verify AI summary and recommended actions are displayed

## Build for Production

```bash
npm run build
npm start
```

## Common Issues

**Issue**: `Module not found` errors
**Solution**: Run `npm install` again

**Issue**: Port 3000 already in use
**Solution**: Kill the process or use `npm run dev -- -p 3001`

**Issue**: TypeScript errors
**Solution**: Ensure Node.js 18+ is installed

## Next Steps

- See [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
