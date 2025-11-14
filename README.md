# Newsletter to Tweet 🐦

Convert your Newsletter articles into Twitter-ready tweets using AI in seconds.

## ✨ Features

- 🤖 **AI-Powered**: Uses GPT-4o-mini to generate engaging tweets
- ⚡ **Fast**: Generates 3-5 tweets in ~10 seconds
- 📋 **One-Click Copy**: Copy tweets to clipboard instantly
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 💰 **Cost-Effective**: ~$0.0004 per generation
- 🎯 **Simple**: Just paste URL and get tweets

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your OpenAI API Key

Get your API key from https://platform.openai.com/api-keys

Then add it to `.env.local`:

```bash
# Edit .env.local and replace the placeholder
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test It Out!

Try pasting any Newsletter article URL:
- Substack articles
- Medium articles
- Beehiiv newsletters
- Any blog post with clear structure

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - Complete testing guide

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **HTML Parsing**: Cheerio
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
newsletter-tweet/
├── app/
│   ├── page.tsx              # Main UI component
│   ├── layout.tsx            # App layout & metadata
│   ├── globals.css           # Global styles
│   └── api/
│       └── generate/
│           └── route.ts      # Tweet generation API
├── lib/
│   └── utils.ts              # Helper functions
├── .env.local                # Environment variables (you need to add your key)
├── .env.example              # Environment template
└── README.md                 # This file
```

## 💡 How It Works

1. **User inputs URL** → Frontend validates and sends to API
2. **API fetches article** → Retrieves HTML content
3. **Parse content** → Cheerio extracts main text
4. **AI generation** → OpenAI creates 3 engaging tweets
5. **Display results** → User can copy tweets instantly

## 💰 Cost Breakdown

Using GPT-4o-mini:
- Per generation: **$0.0004** (~0.04 cents)
- 100 generations: **$0.04**
- 1,000 generations: **$0.40**
- 10,000 generations: **$4.00**

Extremely affordable for an MVP!

## 🧪 Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for the complete testing guide.

Quick test:
1. Add your OpenAI API key to `.env.local`
2. Run `npm run dev`
3. Paste any Newsletter URL
4. Click "Generate Tweets"
5. Copy and use the tweets!

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

## 🎯 MVP Success Criteria

✅ User can paste Newsletter URL  
✅ System generates 3 quality tweets in <15 seconds  
✅ Each tweet is <280 characters  
✅ Copy button works on all browsers  
✅ Mobile responsive  
✅ Clear error messages  

## 📊 What's Next?

After validating this MVP with users:

### Phase 1: User Management
- [ ] Add user authentication (Clerk)
- [ ] Save generation history
- [ ] User dashboard

### Phase 2: Monetization
- [ ] Integrate Stripe
- [ ] Free tier: 10 generations/month
- [ ] Paid tier: Unlimited ($9-19/month)

### Phase 3: Advanced Features
- [ ] RSS feed integration (auto-detect new articles)
- [ ] Tweet scheduling
- [ ] Twitter API integration (auto-post)
- [ ] Analytics dashboard
- [ ] Custom tweet styles/templates
- [ ] A/B testing for tweets

### Phase 4: Growth
- [ ] SEO optimization
- [ ] Content marketing
- [ ] Product Hunt launch
- [ ] Twitter/LinkedIn promotion

## 🐛 Known Limitations (Expected for MVP)

- Some websites block web scraping
- Paywalled content cannot be accessed
- Non-standard website structures might fail
- No user accounts or history (yet)
- Manual copy-paste to Twitter (no auto-post yet)

These are intentional trade-offs for a fast MVP!

## 🤝 Contributing

This is an MVP project. Contributions welcome after initial validation!

## 📝 License

MIT

## 🙋 Support

- Check browser console for frontend errors
- Check terminal for backend errors
- Verify OpenAI API key is correct
- Ensure you have credits in OpenAI account
- Check https://platform.openai.com/usage

## 🎉 Built With

- Next.js
- OpenAI
- Tailwind CSS
- TypeScript
- Love ❤️

---

**Ready to launch?** Follow the [SETUP.md](./SETUP.md) guide to get started!
