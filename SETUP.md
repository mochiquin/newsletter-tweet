# Setup Guide

## Prerequisites

- Node.js 18+ installed
- OpenAI API key

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The project needs your OpenAI API key to function. Here's how to set it up:

#### Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

#### Set Up .env.local

The `.env.local` file has already been created with a placeholder. You need to replace it with your actual API key:

```bash
# Open .env.local in your editor and replace the placeholder
# Or use this command:
echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env.local
```

**Important:** Replace `sk-your-actual-key-here` with your actual OpenAI API key.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

### 4. Test the Application

Try these test URLs:

**Substack Examples:**
- https://www.platformer.news/ (any recent article)
- https://www.technologyreview.com/ (any article)

**Medium Examples:**
- Any Medium article URL

**Other Newsletter Platforms:**
- Beehiiv articles
- Ghost blog posts
- Any blog with clear article structure

### 5. Usage

1. Paste a Newsletter article URL
2. Click "Generate Tweets"
3. Wait ~5-10 seconds
4. Copy the generated tweets
5. Paste them on Twitter/X

## Troubleshooting

### "Please provide a valid URL"
- Make sure the URL is complete (includes https://)
- Check that the URL is accessible in your browser

### "Failed to fetch the article"
- The website might be blocking automated requests
- Try a different article URL
- Some websites have rate limiting

### "Could not extract enough content"
- The article might be behind a paywall
- The website structure might not be recognized
- Try a different article

### OpenAI API Errors
- Check that your API key is correct in `.env.local`
- Ensure you have credits in your OpenAI account
- Check https://platform.openai.com/usage for usage

## Cost Information

Each tweet generation costs approximately:
- **$0.0004** (less than 1 cent) using GPT-4o-mini
- 100 generations = ~$0.04
- 1000 generations = ~$0.40

Very affordable for an MVP!

## Next Steps

After validating the MVP:
1. Add user authentication
2. Implement Stripe for payments
3. Add tweet scheduling
4. Build analytics dashboard
5. Add more customization options

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal where `npm run dev` is running
3. Verify your .env.local file has the correct API key
4. Try with a different article URL

