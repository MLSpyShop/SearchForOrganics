import { SearchResponse, UserLocation, IngredientInfo, BrandLineage, IndustrialROIReport, MarketingMaterials, SEOReport, OsintReport } from '../types';
import { DEFAULT_OSINT_REPORT_2026 } from '../src/data/defaultOsintReport';

function getValidHeaders(apiKey?: string): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey && typeof apiKey === 'string') {
    const trimmed = apiKey.trim();
    if (trimmed && trimmed !== 'undefined' && trimmed !== 'null' && trimmed !== 'your_gemini_api_key_here' && trimmed.length >= 8) {
      headers["x-gemini-key"] = trimmed;
    }
  }
  return headers;
}

export const searchOrganicProducts = async (
  query: string, 
  location: UserLocation | null, 
  apiKey?: string,
  userPreferences?: { userAllergies?: string[]; isVeganUser?: boolean }
): Promise<SearchResponse> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/search", {
    method: "POST",
    headers,
    body: JSON.stringify({ 
      query, 
      location,
      userAllergies: userPreferences?.userAllergies,
      isVeganUser: userPreferences?.isVeganUser
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Search failed");
  }
  
  return response.json();
};

export const geocodeLocation = async (locationName: string, apiKey?: string): Promise<{ lat: number, lng: number, name: string }> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/geocode", {
    method: "POST",
    headers,
    body: JSON.stringify({ locationName }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Geocoding failed");
  }
  
  return response.json();
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const getBobAssistantResponse = async (messages: ChatMessage[], apiKey?: string): Promise<{ text: string }> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/chat", {
    method: "POST",
    headers,
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Chat failed");
  }

  return response.json();
};

export const lookupIngredient = async (ingredientName: string, apiKey?: string): Promise<IngredientInfo> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/lexicon", {
    method: "POST",
    headers,
    body: JSON.stringify({ ingredientName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Lexicon lookup failed");
  }

  return response.json();
};

export const traceBrand = async (brandName: string, apiKey?: string): Promise<BrandLineage> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/tracer", {
    method: "POST",
    headers,
    body: JSON.stringify({ brandName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Brand tracing failed");
  }

  return response.json();
};

export const generateBusinessPlan = async (businessInfo: any, apiKey?: string): Promise<any> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/business-plan", {
    method: "POST",
    headers,
    body: JSON.stringify({ businessInfo }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Business plan generation failed");
  }

  return response.json();
};

export const getOrganicDirectory = async (locationName: string, coords: UserLocation | null, apiKey?: string): Promise<any> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/directory", {
    method: "POST",
    headers,
    body: JSON.stringify({ locationName, coords }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Directory generation failed");
  }

  return response.json();
};

export const analyzeMarketingKit = async (businessUrl: string, apiKey?: string): Promise<MarketingMaterials> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/marketing-kit/analyze", {
    method: "POST",
    headers,
    body: JSON.stringify({ businessUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Marketing analysis failed");
  }

  return response.json();
};

export const generateMarketingImage = async (prompt: string, aspectRatio: string, apiKey?: string): Promise<{ image: string }> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/marketing-kit/generate-image", {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt, aspectRatio }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Image generation failed");
  }

  return response.json();
};

export const generateSEOReport = async (businessUrl: string, apiKey?: string): Promise<SEOReport> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/seo-report", {
    method: "POST",
    headers,
    body: JSON.stringify({ businessUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "SEO report generation failed");
  }

  return response.json();
};

export const calculateIndustrialROI = async (projectData: any, apiKey?: string): Promise<IndustrialROIReport> => {
  const headers = getValidHeaders(apiKey);

  const response = await fetch("/api/industrial-roi", {
    method: "POST",
    headers,
    body: JSON.stringify({ projectData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "ROI calculation failed");
  }

  return response.json();
};

export const fetchOsintReport = async (apiKey?: string, forceLiveRescan: boolean = false): Promise<OsintReport> => {
  const headers = getValidHeaders(apiKey);

  try {
    const response = await fetch("/api/osint-report", {
      method: "POST",
      headers,
      body: JSON.stringify({ forceRescan: forceLiveRescan }),
    });

    if (!response.ok) {
      console.warn("OSINT API returned error, serving verified baseline intelligence dossier.");
      return DEFAULT_OSINT_REPORT_2026;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn("OSINT network failure, serving verified baseline intelligence dossier:", err);
    return DEFAULT_OSINT_REPORT_2026;
  }
};
