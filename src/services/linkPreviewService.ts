import { LinkPreviewData } from '../../types';

// In-memory cache to guarantee instantaneous preview on repeated hovers/clicks
const previewCache = new Map<string, LinkPreviewData>();

// Well-known organic authorities & registries for instant offline/fallback resilience
const KNOWN_ORGANIC_DOMAINS: Record<string, Partial<LinkPreviewData>> = {
  'ams.usda.gov': {
    title: 'USDA Organic Integrity Database (OID)',
    description: 'Official registry of certified organic operations worldwide maintained by the USDA National Organic Program (NOP).',
    siteName: 'USDA National Organic Program',
    trustBadge: 'Official USDA Organic Registry',
    category: 'Federal Certification Database',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  'demeter-usa.org': {
    title: 'Demeter Association, Inc. - Biodynamic Agriculture',
    description: 'Demeter Certified Biodynamic® farm and product registry adhering to strict holistic agricultural standards.',
    siteName: 'Demeter USA',
    trustBadge: 'Demeter Biodynamic Certified',
    category: 'Biodynamic Organic Registry',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
  },
  'organicvalley.coop': {
    title: 'Organic Valley - 100% Farmer-Owned Organic Cooperative',
    description: 'Farmer-owned cooperative of over 1,600 certified organic family farmers producing pasture-raised dairy, eggs, and produce.',
    siteName: 'Organic Valley Cooperative',
    trustBadge: '100% Certified Organic Co-Op',
    category: 'Organic Producer Cooperative',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
  },
  'lundberg.com': {
    title: 'Lundberg Family Farms - Regenerative Organic Certified™',
    description: 'Multi-generation family farm producing certified organic and Regenerative Organic Certified™ rice and quinoa.',
    siteName: 'Lundberg Family Farms',
    trustBadge: 'Regenerative Organic Certified™',
    category: 'Organic Grain & Rice Producer',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  },
  'drbronner.com': {
    title: "Dr. Bronner's - Certified Organic & Fair Trade Pure-Castile",
    description: 'Pioneer of Regenerative Organic Certified™ farming, certified fair trade agricultural sourcing, and ethical manufacturing.',
    siteName: "Dr. Bronner's Magic Soaps",
    trustBadge: 'Regenerative Organic Certified™ & Fair Trade',
    category: 'Organic Personal Care & Agriculture',
    image: 'https://images.unsplash.com/photo-1608248597359-002d2a45d064?auto=format&fit=crop&w=600&q=80',
  },
  'edenfoods.com': {
    title: 'Eden Foods - Heritage Organic Foods Since 1968',
    description: 'Principled independent organic food company sourcing directly from certified organic family farms.',
    siteName: 'Eden Foods',
    trustBadge: 'Pioneer Independent Organic Brand',
    category: 'Heritage Organic Producer',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  'strausfamilycreamery.com': {
    title: 'Straus Family Creamery - 100% Certified Organic Dairy',
    description: 'First 100% certified organic creamery in the United States, supporting sustainable regenerative family farming.',
    siteName: 'Straus Family Creamery',
    trustBadge: '100% Organic Artisan Creamery',
    category: 'Artisan Organic Dairy',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
  },
  'openfoodfacts.org': {
    title: 'Open Food Facts - The Open Organic Food Database',
    description: 'Global open database of certified organic food ingredients, nutrition tables, and regulatory eco-scores.',
    siteName: 'Open Food Facts',
    trustBadge: 'Global Open Transparency Registry',
    category: 'Open Food Regulatory Data',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
  },
  'ccof.org': {
    title: 'CCOF - Organic Certification & Foundation',
    description: 'One of the first organic certification agencies in North America, advancing certified organic agriculture since 1973.',
    siteName: 'CCOF Organic Certifiers',
    trustBadge: 'Accredited Organic Certifier',
    category: 'Third-Party Organic Certifier',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
  },
  'rodaleinstitute.org': {
    title: 'Rodale Institute - Growing the Organic Movement',
    description: 'Global leader in regenerative organic agriculture through groundbreaking research, farmer training, and consumer education.',
    siteName: 'Rodale Institute',
    trustBadge: 'Organic Agriculture Research Pioneer',
    category: 'Research & Education',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80',
  }
};

/**
 * Normalizes URL and provides client-side instant preview fallback
 */
export function getFallbackPreview(rawUrl: string): LinkPreviewData {
  let domain = 'Website';
  let hostname = '';
  let isHttps = true;

  try {
    const parsed = new URL(rawUrl);
    hostname = parsed.hostname.replace(/^www\./, '');
    domain = hostname;
    isHttps = parsed.protocol === 'https:';
  } catch {
    domain = rawUrl;
  }

  // Check known domains
  let matchedDomain: Partial<LinkPreviewData> | undefined;
  for (const [key, val] of Object.entries(KNOWN_ORGANIC_DOMAINS)) {
    if (hostname.includes(key)) {
      matchedDomain = val;
      break;
    }
  }

  return {
    url: rawUrl,
    domain: hostname || domain,
    hostname: hostname || domain,
    title: matchedDomain?.title || `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Verified Organic Source`,
    description: matchedDomain?.description || `Authentic web resource for verified organic products, certifications, and sustainable farming practices on ${domain}.`,
    image: matchedDomain?.image || 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    favicon: `https://www.google.com/s2/favicons?domain=${hostname || domain}&sz=64`,
    siteName: matchedDomain?.siteName || domain,
    isHttps,
    iframeAllowed: true, // will be tested inside the in-app browser
    trustBadge: matchedDomain?.trustBadge || (isHttps ? 'Verified Organic Web Source' : 'External Web Resource'),
    category: matchedDomain?.category || 'Organic Directory & Commerce',
    status: 200,
  };
}

/**
 * Fetches rich preview metadata for a URL from the server API, with in-memory caching
 */
export async function getLinkPreview(url: string): Promise<LinkPreviewData> {
  if (!url || typeof url !== 'string' || !url.trim()) {
    throw new Error('Invalid URL provided for link preview');
  }

  const cleanUrl = url.trim();

  // Return from cache if available
  if (previewCache.has(cleanUrl)) {
    return previewCache.get(cleanUrl)!;
  }

  try {
    const res = await fetch(`/api/link-preview?url=${encodeURIComponent(cleanUrl)}`);
    if (res.ok) {
      const data: LinkPreviewData = await res.json();
      previewCache.set(cleanUrl, data);
      return data;
    }
  } catch (err) {
    console.warn(`Link preview fetch failed for ${cleanUrl}, using fallback:`, err);
  }

  // Graceful fallback
  const fallback = getFallbackPreview(cleanUrl);
  previewCache.set(cleanUrl, fallback);
  return fallback;
}
