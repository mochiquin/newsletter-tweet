import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import * as cheerio from 'cheerio'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'Please provide a URL' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Please provide a valid URL' },
        { status: 400 }
      )
    }

    // 1. Fetch the article content
    const articleResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsletterTweetBot/1.0)'
      }
    })
    
    if (!articleResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch the article. Please check the URL.' },
        { status: 400 }
      )
    }

    const html = await articleResponse.text()
    
    // 2. Parse HTML and extract text content using cheerio
    const $ = cheerio.load(html)
    
    // Remove script, style, and nav elements
    $('script, style, nav, header, footer, iframe').remove()
    
    // Try to find the main content area
    let mainContent = ''
    
    // Common article containers
    const contentSelectors = [
      'article',
      '[role="article"]',
      '.post-content',
      '.article-content',
      '.entry-content',
      'main',
      '.content'
    ]
    
    for (const selector of contentSelectors) {
      const element = $(selector).first()
      if (element.length) {
        mainContent = element.text()
        break
      }
    }
    
    // Fallback to body if no specific content area found
    if (!mainContent) {
      mainContent = $('body').text()
    }
    
    // Clean up the text
    const cleanedText = mainContent
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 12000) // Limit to ~12000 chars to stay within token limits
    
    if (cleanedText.length < 100) {
      return NextResponse.json(
        { error: 'Could not extract enough content from the article. Please check the URL.' },
        { status: 400 }
      )
    }

    // Extract title if possible
    const title = $('title').first().text() || $('h1').first().text() || ''

    // 3. Generate tweets using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert Twitter copywriter specializing in helping Newsletter creators promote their content.

Your task: Create 3-5 engaging tweets to promote a Newsletter article.

Rules:
- Each tweet must be under 280 characters
- Generate exactly 3 tweets with different angles
- Tweet 1: An attention-grabbing hook that creates curiosity
- Tweet 2: Core value summary - what readers will learn
- Tweet 3: Call-to-action encouraging readers to check it out
- Use emojis strategically (1-2 per tweet max)
- Be conversational and engaging
- NO hashtags unless they're highly relevant to the content
- Each tweet should work as a standalone post
- Include the article title or main topic in at least one tweet

Format: Return ONLY the tweets, separated by "---" with no additional text or numbering.`
        },
        {
          role: "user",
          content: `Article Title: ${title}

Article Content:
${cleanedText.slice(0, 6000)}

Generate 3 promotional tweets for this Newsletter article.`
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    })

    const result = completion.choices[0].message.content || ''
    
    // Split tweets and clean them up
    let tweets = result
      .split('---')
      .map(t => t.trim())
      .filter(t => t.length > 0 && t.length <= 280)
    
    // Ensure we have at least 3 tweets
    if (tweets.length < 3) {
      // If parsing failed, try line-by-line splitting as fallback
      tweets = result
        .split('\n')
        .map(t => t.trim())
        .filter(t => t.length > 10 && t.length <= 280)
        .slice(0, 5)
    }

    if (tweets.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate tweets. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      tweets,
      title 
    })

  } catch (error: any) {
    console.error('Error generating tweets:', error)
    
    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { error: 'Could not connect to the URL. Please check if it\'s accessible.' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate tweets. Please try again.' },
      { status: 500 }
    )
  }
}

