'use client'

import { useState } from 'react'
import { copyToClipboard, isValidUrl } from '@/lib/utils'

interface Tweet {
  text: string
  copied: boolean
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [articleTitle, setArticleTitle] = useState('')

  const generateTweets = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }
    
    setLoading(true)
    setError('')
    setTweets([])
    setArticleTitle('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate tweets')
      }
      
      setTweets(data.tweets.map((text: string) => ({ text, copied: false })))
      setArticleTitle(data.title || '')
    } catch (err: any) {
      setError(err.message || 'Failed to generate tweets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (index: number) => {
    try {
      await copyToClipboard(tweets[index].text)
      
      // Update copied state
      const newTweets = [...tweets]
      newTweets[index].copied = true
      setTweets(newTweets)
      
      // Reset after 2 seconds
      setTimeout(() => {
        const resetTweets = [...newTweets]
        resetTweets[index].copied = false
        setTweets(resetTweets)
      }, 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      generateTweets()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Newsletter → Tweet
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Turn your Newsletter articles into Twitter-ready tweets
            </p>
            <p className="text-sm text-gray-500">
              Powered by AI • Takes ~10 seconds
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              Newsletter Article URL
            </label>
            <input
              id="url-input"
              type="url"
              placeholder="https://yourname.substack.com/p/your-article..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            
            <button
              onClick={generateTweets}
              disabled={loading || !url.trim()}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating tweets...
                </span>
              ) : (
                <span>Generate Tweets 🚀</span>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Article Title */}
          {articleTitle && (
            <div className="mb-4 px-4">
              <p className="text-sm text-gray-500">Article:</p>
              <p className="text-lg font-medium text-gray-800">{articleTitle}</p>
            </div>
          )}

          {/* Results Section */}
          {tweets.length > 0 && (
            <div className="space-y-4">
              {tweets.map((tweet, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Tweet {index + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {tweet.text.length} chars
                    </span>
                  </div>
                  
                  <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                    {tweet.text}
                  </p>
                  
                  <button
                    onClick={() => handleCopy(index)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all transform active:scale-95 ${
                      tweet.copied
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {tweet.copied ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to Clipboard
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Built with Next.js, OpenAI, and ❤️
            </p>
            <p className="mt-2">
              Cost per generation: ~$0.0004 • Works with Substack, Beehiiv, Medium, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
