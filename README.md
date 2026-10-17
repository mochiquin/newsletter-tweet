# Newsletter to Tweet

Paste the URL of a newsletter or blog article and get a few tweet-ready summaries
of it, each under 280 characters, with one-click copy.

## How it works

1. The page sends the article URL to `app/api/generate/route.ts`.
2. The API route fetches the page and extracts the main text with Cheerio.
3. The cleaned text is sent to OpenAI `gpt-4o-mini` with a prompt that asks for short, standalone tweets.
4. The response is split into tweets, anything over 280 characters is dropped, and the rest are returned to the page.

## Tech stack

| Layer | Tools |
| --- | --- |
| App | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Parsing | Cheerio |
| AI | OpenAI API (`gpt-4o-mini`) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your OpenAI API key
npm run dev
```

Open http://localhost:3000 and paste an article URL (Substack, Medium, Beehiiv or
any blog post with a clear article body).

## Known limitations

- Sites that block scraping, and paywalled articles, cannot be read.
- Pages with unusual layouts may extract poorly.
- No accounts or history; tweets are copied and posted by hand.

## License

MIT
