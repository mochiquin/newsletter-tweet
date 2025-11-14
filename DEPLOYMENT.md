# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest and best way to deploy Next.js applications. It's free for hobby projects and scales automatically.

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   cd /Users/silin/Repo/ideas_getting/newsletter-tweet
   git add .
   git commit -m "Initial MVP release"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `newsletter-tweet` repository

3. **Configure Environment Variables**
   - In the Vercel project settings
   - Go to "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your-actual-api-key`
   - Important: Add it for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app is live! 🎉

5. **Get Your URL**
   - Vercel will give you a URL like: `newsletter-tweet.vercel.app`
   - You can add a custom domain later

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /Users/silin/Repo/ideas_getting/newsletter-tweet
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: newsletter-tweet
# - Directory: ./
# - Override settings? No

# Add environment variable
vercel env add OPENAI_API_KEY production

# Paste your API key when prompted

# Deploy to production
vercel --prod
```

## Alternative: Deploy to Other Platforms

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

### Railway

1. Connect GitHub repository
2. Add environment variable: `OPENAI_API_KEY`
3. Railway auto-detects Next.js
4. Deploy

### Self-Hosted (VPS)

```bash
# On your server
git clone your-repo
cd newsletter-tweet
npm install
npm run build

# Add .env.local with your API key
echo "OPENAI_API_KEY=your-key" > .env.local

# Start with PM2
npm install -g pm2
pm2 start npm --name "newsletter-tweet" -- start
pm2 save
pm2 startup
```

## Post-Deployment Checklist

- [ ] App loads correctly at production URL
- [ ] Test with a real Newsletter URL
- [ ] Tweets generate successfully
- [ ] Copy button works
- [ ] Mobile responsive on real devices
- [ ] No console errors
- [ ] Check Vercel/hosting logs for errors
- [ ] Set up custom domain (optional)
- [ ] Add to Google Search Console (optional)
- [ ] Set up analytics (Google Analytics, Plausible, etc.)

## Environment Variables

Make sure these are set in production:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

## Custom Domain Setup (Vercel)

1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `newslettertweet.com`)
4. Add DNS records as Vercel instructs
5. Wait for DNS propagation (~5-10 minutes)
6. SSL certificate is automatically provisioned

## Monitoring & Analytics

### Vercel Analytics (Built-in)
- Go to your project → Analytics tab
- See page views, performance metrics
- Free for hobby tier

### Error Monitoring
Consider adding:
- Sentry (error tracking)
- LogRocket (session replay)
- PostHog (product analytics)

## Scaling Considerations

### Current Setup (Free Tier)
- Vercel: 100GB bandwidth/month
- Serverless functions: 100 hours/month
- OpenAI: Pay as you go

### When to Upgrade
- **1,000 users/month**: Still free tier
- **10,000 users/month**: Consider Vercel Pro ($20/month)
- **100,000 users/month**: Need to optimize costs

### Cost Projections

**Scenario: 1,000 generations/month**
- OpenAI: $0.40/month
- Vercel: $0 (free tier)
- **Total: $0.40/month**

**Scenario: 10,000 generations/month**
- OpenAI: $4/month
- Vercel: $20/month (Pro plan)
- **Total: $24/month**

**Scenario: 100,000 generations/month**
- OpenAI: $40/month
- Vercel: $20/month (Pro plan)
- **Total: $60/month**

Even at scale, costs are very reasonable!

## CI/CD Setup

Vercel automatically deploys:
- **Main branch** → Production
- **Other branches** → Preview deployments

Every commit gets a unique URL for testing!

## Rollback

If something breaks:
```bash
# Via CLI
vercel rollback

# Or in Vercel Dashboard
# Deployments → Previous deployment → Promote to Production
```

## Performance Optimization

### Edge Functions
Already optimized! Next.js API routes run on Vercel Edge Network.

### Caching
Consider adding:
```typescript
// In route.ts
export const runtime = 'edge' // Use edge runtime
export const revalidate = 0    // No caching (for dynamic content)
```

### Image Optimization
Next.js automatically optimizes images via Vercel.

## Security

### Current Security Measures
✅ API key in environment variables (not in code)  
✅ HTTPS enforced by Vercel  
✅ No authentication (MVP - no user data to protect)  
✅ Rate limiting via Vercel (automatic)  

### Future Security (When Adding Auth)
- [ ] Add CORS policies
- [ ] Add rate limiting per user
- [ ] Add request validation
- [ ] Add API key rotation
- [ ] Add security headers

## Troubleshooting

### "API Key not found" in Production
- Check environment variable is set in Vercel
- Redeploy after adding env var
- Check spelling: `OPENAI_API_KEY`

### "Function timeout" Errors
- OpenAI sometimes takes >10 seconds
- Vercel free tier: 10s timeout
- Vercel Pro: 60s timeout
- Consider upgrading if this happens often

### High OpenAI Costs
- Check usage: https://platform.openai.com/usage
- Add rate limiting
- Consider caching common articles
- Switch to cheaper model if needed

## Launch Checklist

Before publicly launching:
- [ ] Deployed to production
- [ ] Custom domain set up (optional)
- [ ] Tested with 10+ different URLs
- [ ] Mobile tested on real devices
- [ ] Error handling tested
- [ ] Performance is acceptable (<15s)
- [ ] Analytics set up
- [ ] Landing page copy is compelling
- [ ] Screenshot/demo ready for Product Hunt
- [ ] Twitter account ready to announce
- [ ] Support email/contact method ready

## Going Live Strategy

### Week 1: Soft Launch
1. Deploy to production
2. Test thoroughly
3. Share with 5-10 friends
4. Fix any critical bugs

### Week 2: Community Launch
1. Post on Twitter with demo video
2. Share in relevant communities:
   - r/SideProject
   - r/Substack
   - Indie Hackers
3. Collect feedback

### Week 3: Product Hunt
1. Prepare Product Hunt submission
2. Line up supporters
3. Launch on Tuesday/Wednesday
4. Engage with comments all day

### Ongoing
1. Monitor analytics
2. Respond to feedback
3. Iterate on features
4. Build in public on Twitter

---

Ready to deploy? Start with **Method 1** above! 🚀

