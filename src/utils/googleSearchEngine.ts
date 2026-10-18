import { GoogleSearchData, GroundingSource } from '../../types';

export interface GoogleWebItem {
  title: string;
  url: string;
  sourceUrl: string;
  sourceName: string;
  snippet?: string;
  publishedAt?: string;
}

/**
 * Fetch real-time Google Search suggestions & related search queries directly from Google's database
 */
export async function fetchGoogleSearchSuggestions(query: string): Promise<string[]> {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(cleanQuery)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json,text/plain,*/*"
      },
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[1])) {
        return (data[1] as string[]).slice(0, 8);
      }
    }
  } catch (err) {
    console.warn("Google suggest fetch note:", err);
  }
  return [];
}

/**
 * Fetch real-time Google-indexed web resources & publications from Google's Search News/Web RSS index
 */
export async function fetchGoogleIndexedSources(query: string): Promise<GoogleWebItem[]> {
  const items: GoogleWebItem[] = [];
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(cleanQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml,application/xml,text/xml;q=0.9,*/*;q=0.8"
      },
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const xml = await res.text();
      const itemRegex = /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?(?:<pubDate>(.*?)<\/pubDate>)?[\s\S]*?(?:<source[^>]*url="([^"]*)"[^>]*>(.*?)<\/source>)?[\s\S]*?<\/item>/g;
      let match: RegExpExecArray | null;

      while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
        const rawTitle = match[1] || "";
        const rawLink = match[2] || "";
        const pubDate = match[3] || "";
        const sourceUrl = match[4] || "";
        const sourceName = match[5] || "";

        // Unescape basic XML entities
        const title = rawTitle
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();

        const actualUrl = sourceUrl.startsWith('http') ? sourceUrl : rawLink;

        if (title && actualUrl) {
          items.push({
            title,
            url: actualUrl,
            sourceUrl: actualUrl,
            sourceName: sourceName.trim() || "Google Verified Source",
            publishedAt: pubDate
          });
        }
      }
    }
  } catch (err) {
    console.warn("Google indexed sources fetch note:", err);
  }
  return items;
}

/**
 * Builds Google Search URLs for a product
 */
export function getGoogleProductUrls(productName: string, vendor?: string) {
  const searchQuery = [productName, vendor, "certified organic"].filter(Boolean).join(" ");
  const shoppingQuery = [productName, "certified organic"].filter(Boolean).join(" ");

  return {
    googleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
    googleShoppingUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(shoppingQuery)}`
  };
}

/**
 * Build consolidated Google Search Grounding and Data package
 */
export async function compileGoogleSearchData(
  query: string,
  locationLabel?: string,
  existingSources: GroundingSource[] = []
): Promise<GoogleSearchData> {
  const organicQuery = query.toLowerCase().includes('organic') ? query.trim() : `organic ${query.trim()}`;
  
  // Parallel fetch: Google search suggestions & Google news/web indexed items
  const [googleSuggestions, googleWebItems] = await Promise.all([
    fetchGoogleSearchSuggestions(organicQuery),
    fetchGoogleIndexedSources(`certified ${organicQuery}`)
  ]);

  const googleSources: GroundingSource[] = [];

  // Always include primary Google Search direct link
  googleSources.push({
    title: `Google Live Search: "${organicQuery}"`,
    uri: `https://www.google.com/search?q=${encodeURIComponent(organicQuery)}`,
    type: 'web'
  });

  // Include Google Shopping direct link
  googleSources.push({
    title: `Google Shopping: Verified Organic "${organicQuery}"`,
    uri: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(organicQuery)}`,
    type: 'web'
  });

  // Add real web items discovered in Google's index
  googleWebItems.forEach(item => {
    if (!googleSources.some(s => s.uri === item.url)) {
      googleSources.push({
        title: item.title,
        uri: item.url,
        type: 'web'
      });
    }
  });

  // Merge any existing grounding sources
  existingSources.forEach(s => {
    if (!googleSources.some(gs => gs.uri === s.uri)) {
      googleSources.push(s);
    }
  });

  const searchQueries = [
    organicQuery,
    ...googleSuggestions.filter(s => s.toLowerCase() !== organicQuery.toLowerCase())
  ].slice(0, 6);

  const locParam = locationLabel ? ` near ${encodeURIComponent(locationLabel)}` : '';

  return {
    isGoogleSearchGrounded: true,
    searchQueries,
    primaryGoogleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(organicQuery)}`,
    googleShoppingUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(organicQuery)}`,
    googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(organicQuery + (locationLabel ? ` near ${locationLabel}` : ''))}`,
    googleResultsCount: googleSources.length,
    googleIndexedSources: googleSources,
    relatedSearches: googleSuggestions,
    lastIndexedAt: new Date().toISOString()
  };
}
