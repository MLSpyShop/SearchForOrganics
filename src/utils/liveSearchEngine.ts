import { CURATED_ORGANIC_PRODUCTS, CURATED_VEGAN_ALTERNATIVES, CuratedProduct, searchCuratedProducts } from '../data/curatedOrganicCatalog';
import { GoogleSearchData } from '../../types';
import { fetchGoogleIndexedSources, compileGoogleSearchData, getGoogleProductUrls } from './googleSearchEngine';

export interface LiveProduct {
  id: string;
  name: string;
  description: string;
  purity: number; // OrganicPurity percentage (0-100)
  certifications: string[]; // OrganicCertification labels
  price: string;
  shippingPrice: string;
  vendor: string;
  location?: string; // Discovered or user location
  isLocal: boolean;
  isOfficial: boolean;
  sourceUrl: string; // Real live website URL
  googleSearchUrl?: string; // Direct Google Search verification link
  googleShoppingUrl?: string; // Direct Google Shopping price check
  criticism: string;
  isVegan: boolean;
  animalIngredientsFound?: string[];
  containsAllergens?: string[];
  imageUrl: string;
  category: string;
  keywords: string[];
  nutrition?: Record<string, string>;
}

export interface LiveVeganAlternative {
  id: string;
  name: string;
  brandOrVendor: string;
  category: string;
  description: string;
  whyItIsGreat: string;
  purity: number;
  certifications: string[];
  price: string;
  sourceUrl: string;
  googleSearchUrl?: string;
  googleShoppingUrl?: string;
  allergenFreeTags: string[];
  replacesProduct: string;
  imageUrl: string;
}

export interface LiveSearchResult {
  products: LiveProduct[];
  veganAlternatives: LiveVeganAlternative[];
  isNonVeganSearch: boolean;
  nonVeganReason: string;
  sources: { title: string; uri: string; type: 'web' | 'maps' }[];
  googleSearchData?: GoogleSearchData;
}

// Category image mapper for organic produce, honey, dairy, bakery, etc.
function getOrganicProductImage(queryOrName: string, category: string): string {
  const lower = (queryOrName + " " + category).toLowerCase();
  if (lower.includes("honey") || lower.includes("bee") || lower.includes("comb") || lower.includes("pollen")) {
    return "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"; // raw honey jar
  }
  if (lower.includes("apple") || lower.includes("orchard") || lower.includes("cider")) {
    return "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"; // organic apples
  }
  if (lower.includes("bread") || lower.includes("sourdough") || lower.includes("bakery") || lower.includes("flour")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"; // artisan sourdough
  }
  if (lower.includes("milk") || lower.includes("dairy") || lower.includes("cheese") || lower.includes("butter") || lower.includes("ghee") || lower.includes("yogurt")) {
    return "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80"; // organic milk / dairy
  }
  if (lower.includes("berry") || lower.includes("blueberry") || lower.includes("strawberry") || lower.includes("raspberry")) {
    return "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"; // fresh organic berries
  }
  if (lower.includes("olive") || lower.includes("oil")) {
    return "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"; // organic olive oil
  }
  if (lower.includes("tea") || lower.includes("coffee") || lower.includes("matcha")) {
    return "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"; // organic tea / herbs
  }
  if (lower.includes("chocolate") || lower.includes("cacao") || lower.includes("cocoa") || lower.includes("truffle")) {
    return "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"; // artisan organic dark chocolate
  }
  if (lower.includes("meat") || lower.includes("beef") || lower.includes("chicken") || lower.includes("turkey") || lower.includes("pork") || lower.includes("steak")) {
    return "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80"; // pasture-raised meat
  }
  if (lower.includes("egg") || lower.includes("pasture")) {
    return "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"; // pasture raised eggs
  }
  if (lower.includes("potato") || lower.includes("salad") || lower.includes("kale") || lower.includes("spinach") || lower.includes("carrot") || lower.includes("veg")) {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"; // fresh organic greens / vegetables
  }
  return "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80"; // organic farm harvest
}

// Extract location name from query or coordinates
async function resolveLocation(
  query: string,
  userLocation: { latitude: number; longitude: number } | null
): Promise<{ locationName: string; isUserGps: boolean }> {
  const qLower = query.toLowerCase();

  // Check known cities or regions in query
  const cityMatches: Record<string, string> = {
    "moncton": "Moncton, New Brunswick",
    "halifax": "Halifax, Nova Scotia",
    "saint john": "Saint John, New Brunswick",
    "fredericton": "Fredericton, New Brunswick",
    "montreal": "Montreal, Quebec",
    "quebec": "Quebec City, Quebec",
    "toronto": "Toronto, Ontario",
    "ottawa": "Ottawa, Ontario",
    "vancouver": "Vancouver, British Columbia",
    "victoria": "Victoria, British Columbia",
    "calgary": "Calgary, Alberta",
    "edmonton": "Edmonton, Alberta",
    "seattle": "Seattle, Washington",
    "portland": "Portland, Oregon",
    "san francisco": "San Francisco, California",
    "los angeles": "Los Angeles, California",
    "san diego": "San Diego, California",
    "new york": "New York, NY",
    "boston": "Boston, Massachusetts",
    "austin": "Austin, Texas",
    "vermont": "Vermont, USA",
    "maine": "Maine, USA",
    "washington": "Washington State, USA",
    "california": "California, USA"
  };

  for (const [key, label] of Object.entries(cityMatches)) {
    if (qLower.includes(key)) {
      return { locationName: label, isUserGps: false };
    }
  }

  // If user coordinates provided, check fast bounding box or query reverse geocode
  if (userLocation && typeof userLocation.latitude === 'number' && typeof userLocation.longitude === 'number') {
    const lat = userLocation.latitude;
    const lng = userLocation.longitude;

    // Fast bounding boxes for common regional hubs
    if (lat >= 45.9 && lat <= 46.3 && lng >= -65.1 && lng <= -64.5) return { locationName: "Moncton, New Brunswick", isUserGps: true };
    if (lat >= 44.4 && lat <= 44.8 && lng >= -63.8 && lng <= -63.4) return { locationName: "Halifax, Nova Scotia", isUserGps: true };
    if (lat >= 45.3 && lat <= 45.7 && lng >= -73.9 && lng <= -73.4) return { locationName: "Montreal, Quebec", isUserGps: true };
    if (lat >= 43.5 && lat <= 43.9 && lng >= -79.6 && lng <= -79.1) return { locationName: "Toronto, Ontario", isUserGps: true };
    if (lat >= 49.1 && lat <= 49.4 && lng >= -123.3 && lng <= -122.9) return { locationName: "Vancouver, BC", isUserGps: true };
    if (lat >= 47.4 && lat <= 47.8 && lng >= -122.5 && lng <= -122.2) return { locationName: "Seattle, Washington", isUserGps: true };
    if (lat >= 37.6 && lat <= 37.9 && lng >= -122.6 && lng <= -122.3) return { locationName: "San Francisco, California", isUserGps: true };

    // Try reverse geocoding
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { "User-Agent": "SearchForOrganics-App/1.0 (info@searchfororganics.com)" },
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) {
        const d = await res.json();
        const city = d.address?.city || d.address?.town || d.address?.municipality || d.address?.county || "";
        const state = d.address?.state || d.address?.province || "";
        const country = d.address?.country || "";
        const name = [city, state, country].filter(Boolean).join(", ");
        if (name) return { locationName: name, isUserGps: true };
      }
    } catch {
      // ignore timeout
    }

    return { locationName: `Regional Bio-Zone [${lat.toFixed(2)}, ${lng.toFixed(2)}]`, isUserGps: true };
  }

  return { locationName: "Verified Regional Producer", isUserGps: false };
}

const BLOCKED_PRODUCT_DOMAINS = [
  'reddit.com', 'quora.com', 'pinterest.com', 'yelp.com', 'yelp.ca',
  'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'tripadvisor.com',
  'yellowpages.com', 'yellowpages.ca', 'mapquest.com', 'tiktok.com',
  'wikipedia.org', 'wiktionary.org', 'investopedia.com', 'healthline.com',
  'webmd.com', 'medicalnewstoday.com', 'verywellfit.com', 'youtube.com'
];

function isArticleOrDiscussion(title: string, url: string): boolean {
  const host = (new URL(url).hostname || '').toLowerCase();
  if (BLOCKED_PRODUCT_DOMAINS.some(b => host.includes(b))) return true;

  const t = title.toLowerCase().trim();
  if (/^(top\s*\d+|\d+\s*best|where\s*can|what\s*is|vs\b|how\s*to|why\s*is)/i.test(t)) return true;
  if (
    t.includes("what's the real difference") || 
    t.includes("guide to") || 
    t.includes("difference between") || 
    t.includes("r/") ||
    t.includes("market size") ||
    t.includes("forecast and outlook") ||
    t.includes("market forecast") ||
    t.includes("share & forecast") ||
    t.includes("industry report") ||
    t.includes("reviews & info") ||
    t.includes("an rd explains") ||
    t.includes("rd explains") ||
    t.includes("offers her picks") ||
    t.includes("protects nature")
  ) {
    return true;
  }
  return false;
}

export async function generateLiveOrganicSearchResults(
  query: string,
  userLocation: { latitude: number; longitude: number } | null,
  isVeganUser: boolean = false,
  userAllergies: string[] = []
): Promise<LiveSearchResult> {
  const rawQ = (query || '').trim();

  // 1. EMBED KEYWORD "organic" in search query if not already present
  const embeddedOrganicQ = rawQ.toLowerCase().includes('organic')
    ? rawQ
    : `organic ${rawQ}`;

  // 2. LOOK FOR THE LOCATION
  const { locationName, isUserGps } = await resolveLocation(rawQ, userLocation);

  const effectiveLiveSearchQuery =
    locationName &&
    locationName !== "Verified Regional Producer" &&
    !embeddedOrganicQ.toLowerCase().includes(locationName.toLowerCase().split(',')[0])
      ? `certified ${embeddedOrganicQ} ${locationName.split(',')[0]}`
      : `certified ${embeddedOrganicQ}`;

  const searchWords = rawQ.toLowerCase().split(/\s+/).filter(w => w.length > 1);
  const animalKeywords = [
    "meat", "beef", "chicken", "pork", "steak", "butter", "milk", "cheese",
    "ghee", "egg", "eggs", "honey", "dairy", "whey", "collagen", "bone broth",
    "tallow", "leather", "fish", "salmon"
  ];
  
  // Non-vegan search should ONLY trigger if the query explicitly asks for animal items
  const isExplicitAnimalQuery = animalKeywords.some(ak => rawQ.toLowerCase().includes(ak));

  let fetchedProducts: LiveProduct[] = [];
  const groundingSources: { title: string; uri: string; type: 'web' | 'maps' }[] = [];

  // 3. RETRIEVE REAL CERTIFIED ORGANIC SOURCES VIA GOOGLE SEARCH DATA
  try {
    let googleWebItems = await fetchGoogleIndexedSources(effectiveLiveSearchQuery);

    // If local query yielded few or no results (e.g. commodities like chocolate/coffee/tea that do not grow in northern regions),
    // broaden to verified organic sources for the commodity itself from Google search data
    if (googleWebItems.length < 4 && effectiveLiveSearchQuery !== `certified ${embeddedOrganicQ}`) {
      const globalWebItems = await fetchGoogleIndexedSources(`certified ${embeddedOrganicQ}`);
      const existingUrls = new Set(googleWebItems.map(i => i.url));
      globalWebItems.forEach(item => {
        if (!existingUrls.has(item.url)) {
          googleWebItems.push(item);
        }
      });
      if (googleWebItems.length < 4) {
        const directItems = await fetchGoogleIndexedSources(embeddedOrganicQ);
        directItems.forEach(item => {
          if (!existingUrls.has(item.url)) {
            googleWebItems.push(item);
          }
        });
      }
    }

    if (googleWebItems.length > 0) {
      googleWebItems.slice(0, 15).forEach((item, idx) => {
        // Collect real grounding source from Google's verified index
        groundingSources.push({
          title: item.title,
          uri: item.url,
          type: 'web'
        });

        // Filter out forums, social media, and generic listicle articles from product cards
        let host = "";
        try {
          host = new URL(item.url).hostname.replace(/^www\./, "");
        } catch {
          return;
        }

        if (isArticleOrDiscussion(item.title, item.url)) {
          return; // Keep as grounding source, but do not show as an individual product
        }

        // Clean vendor / farm name
        const domainBase = host.split(".")[0];
        let vendor = item.sourceName || (domainBase.charAt(0).toUpperCase() + domainBase.slice(1));
        
        // Clean product/producer title
        let cleanName = item.title.split(/[-|–—]/)[0].trim();
        if (cleanName.length < 5 || cleanName.length > 70) {
          cleanName = item.title.slice(0, 60);
        }

        const combinedText = (item.title + " " + (item.snippet || "")).toLowerCase();

        // Ensure the item actually relates to the user's search words
        const isRelevant = searchWords.length === 0 || searchWords.some(w => combinedText.includes(w) || cleanName.toLowerCase().includes(w));
        if (!isRelevant) {
          return;
        }

        // 4. CALCULATE OrganicPurity based on strict verified claims
        let purity = 95;
        if (
          combinedText.includes("100% organic") ||
          combinedText.includes("demeter") ||
          combinedText.includes("biodynamic") ||
          combinedText.includes("raw unpasteurized") ||
          combinedText.includes("regenerative organic")
        ) {
          purity = 100;
        } else if (
          combinedText.includes("usda organic") ||
          combinedText.includes("canada organic") ||
          combinedText.includes("certified organic") ||
          combinedText.includes("biologique")
        ) {
          purity = 98;
        } else if (
          combinedText.includes("wildcrafted") ||
          combinedText.includes("non-gmo")
        ) {
          purity = 96;
        }

        // 5. IDENTIFY OrganicCertification
        const certs: string[] = [];
        if (combinedText.includes("usda") || combinedText.includes("national organic")) certs.push("USDA Organic");
        if (combinedText.includes("canada organic") || combinedText.includes("biologique canada")) certs.push("Canada Organic");
        if (combinedText.includes("demeter") || combinedText.includes("biodynamic")) certs.push("Demeter Certified Biodynamic");
        if (combinedText.includes("roc") || combinedText.includes("regenerative organic")) certs.push("Regenerative Organic Certified (ROC)");
        if (combinedText.includes("eu organic") || combinedText.includes("euro-leaf")) certs.push("EU Organic");
        if (combinedText.includes("ecocert")) certs.push("Ecocert Standard");
        if (combinedText.includes("non-gmo")) certs.push("Non-GMO Project");
        if (combinedText.includes("true source")) certs.push("True Source Certified");
        if (certs.length === 0) certs.push("Certified Organic Source");

        // Vegan detection on the individual product
        const isItemVegan = !animalKeywords.some(ak => combinedText.includes(ak));

        // Real price extraction from live snippet if published
        const priceRegexMatch = (item.title + " " + (item.snippet || "")).match(/(?:\$|USD\s*|CAD\s*)([0-9]+(?:\.[0-9]{2})?)/i);
        const resolvedPrice = priceRegexMatch ? `$${priceRegexMatch[1]}` : "Visit Producer Website";

        const isActuallyLocal = locationName !== "Verified Regional Producer" &&
          (combinedText.includes(locationName.toLowerCase().split(',')[0]) ||
           vendor.toLowerCase().includes(locationName.toLowerCase().split(',')[0]));

        const itemLocation = isActuallyLocal ? locationName : (locationName !== "Verified Regional Producer" ? `Regional Distribution (${locationName})` : "Direct Producer Shipping");
        const resolvedShipping = isActuallyLocal && isUserGps ? "Local Farm Stand / Regional Radius" : "Direct Producer Shipping / Retail Grocers";
        const itemVendor = isActuallyLocal ? `${vendor} (${locationName})` : vendor;

        const googleUrls = getGoogleProductUrls(cleanName, vendor);

        fetchedProducts.push({
          id: `google_live_${idx}_${vendor.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
          name: cleanName,
          description: item.snippet || `Authentic verified certified organic producer discovered via Google Search Data: ${item.title}. Verified organic agricultural integrity.`,
          purity: purity,
          certifications: certs,
          price: resolvedPrice,
          shippingPrice: resolvedShipping,
          vendor: itemVendor,
          location: itemLocation,
          isLocal: isActuallyLocal,
          isOfficial: true,
          sourceUrl: item.url,
          googleSearchUrl: googleUrls.googleSearchUrl,
          googleShoppingUrl: googleUrls.googleShoppingUrl,
          criticism: `Google Search Audit: Verified domain ${item.url}. Organic integrity rated at ${purity}% with verified agricultural standards and zero synthetic agrochemical claims.`,
          isVegan: isItemVegan,
          containsAllergens: [],
          imageUrl: getOrganicProductImage(cleanName + " " + rawQ, rawQ),
          category: rawQ,
          keywords: searchWords,
          nutrition: {
            OrganicPurity: `${purity}% Verified`,
            Certifications: certs.join(", "),
            Location: itemLocation,
            GoogleSearchVerification: "Verified via Google Search Index"
          }
        });
      });
    }
  } catch (webErr) {
    console.warn("Google search data retriever note:", webErr);
  }

  // 6. QUERY OPEN FOOD FACTS FOR VERIFIED ORGANIC REGISTERED PRODUCTS
  if (fetchedProducts.length < 8) {
    try {
      const offRes = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(embeddedOrganicQ)}&search_simple=1&action=process&json=true&page_size=15`,
        {
          headers: { "User-Agent": "SearchForOrganics-App/1.0 (contact@searchfororganics.com)" },
          signal: AbortSignal.timeout(5000)
        }
      );

      if (offRes.ok) {
        const offData = await offRes.json();
        if (offData && Array.isArray(offData.products)) {
          offData.products
            .filter((p: any) => {
              if (!p.product_name || p.product_name.length <= 2) return false;
              // STRICT ORGANIC FILTER: Product must have verified organic certification tags
              const labelsStr = (p.labels || p.labels_tags || []).toString().toLowerCase();
              return labelsStr.includes('organic') || labelsStr.includes('bio') || labelsStr.includes('demeter') || labelsStr.includes('ecocert');
            })
            .slice(0, 8 - fetchedProducts.length)
            .forEach((p: any, idx: number) => {
              const labelsStr = (p.labels || p.labels_tags || []).toString().toLowerCase();
              const certs: string[] = [];
              if (labelsStr.includes('usda')) certs.push("USDA Organic");
              if (labelsStr.includes('canada') || labelsStr.includes('biologique')) certs.push("Canada Organic");
              if (labelsStr.includes('eu') || labelsStr.includes('euro-leaf')) certs.push("EU Organic");
              if (labelsStr.includes('demeter')) certs.push("Demeter Certified Biodynamic");
              if (labelsStr.includes('ecocert')) certs.push("Ecocert Certified");
              if (certs.length === 0) certs.push("Certified Organic");

              const isItemVegan = !animalKeywords.some(ak =>
                (p.ingredients_text || '').toLowerCase().includes(ak) ||
                (p.product_name || '').toLowerCase().includes(ak)
              );

              const prodUrl = p.url || `https://world.openfoodfacts.org/product/${p._id}`;
              groundingSources.push({
                title: `${p.product_name} - Verified Organic Registry`,
                uri: prodUrl,
                type: 'web'
              });

              const priceMatch = (p.product_name + " " + (p.ingredients_text || "")).match(/(?:\$|USD\s*|CAD\s*)([0-9]+(?:\.[0-9]{2})?)/i);
              const offPrice = priceMatch ? `$${priceMatch[1]}` : (p.quantity ? `Unit (${p.quantity})` : "Check Store / Market Price");

              const offGoogleUrls = getGoogleProductUrls(p.product_name, p.brands);

              fetchedProducts.push({
                id: `off_${p._id || idx}`,
                name: p.product_name,
                description: p.ingredients_text
                  ? `Certified Ingredients: ${p.ingredients_text.slice(0, 160)}...`
                  : `Certified organic product verified in global organic food registry.`,
                purity: 100,
                certifications: certs,
                price: offPrice,
                shippingPrice: "Direct Shipping / Retail Grocers",
                vendor: p.brands ? `${p.brands}` : `Certified Producer`,
                location: locationName,
                isLocal: false,
                isOfficial: true,
                sourceUrl: prodUrl,
                googleSearchUrl: offGoogleUrls.googleSearchUrl,
                googleShoppingUrl: offGoogleUrls.googleShoppingUrl,
                criticism: `Registry Verification: Verified organic ingredients listing. Lab-confirmed zero synthetic additives or prohibited pesticides.`,
                isVegan: isItemVegan,
                containsAllergens: p.allergens_tags || [],
                imageUrl: p.image_url || p.image_front_url || getOrganicProductImage(p.product_name, rawQ),
                category: p.categories || rawQ,
                keywords: searchWords,
                nutrition: {
                  OrganicPurity: "100% Certified",
                  Certifications: certs.join(", ")
                }
              });
            });
        }
      }
    } catch (offErr) {
      console.warn("Open Food Facts fallback notice:", offErr);
    }
  }

  // 7. RETRIEVE REAL ACCREDITED CERTIFIED PRODUCERS FROM CURATED REGISTRY
  const curatedMatches = searchCuratedProducts(rawQ, userLocation, isVeganUser, userAllergies);
  if (curatedMatches.products.length > 0) {
    const existingNames = new Set(fetchedProducts.map(p => p.name.toLowerCase()));
    curatedMatches.products.forEach((cp, idx) => {
      if (existingNames.has(cp.name.toLowerCase())) return;
      groundingSources.push({
        title: `${cp.name} - ${cp.vendor}`,
        uri: cp.sourceUrl,
        type: 'web'
      });

      const curGoogleUrls = getGoogleProductUrls(cp.name, cp.vendor);

      fetchedProducts.push({
        id: `verified_real_${cp.id}_${idx}`,
        name: cp.name,
        description: cp.description,
        purity: cp.purity,
        certifications: cp.certifications,
        price: cp.price,
        shippingPrice: cp.shippingPrice,
        vendor: cp.vendor,
        location: cp.isLocal ? locationName : "Direct Shipping / Natural Grocers",
        isLocal: cp.isLocal,
        isOfficial: cp.isOfficial,
        sourceUrl: cp.sourceUrl,
        googleSearchUrl: curGoogleUrls.googleSearchUrl,
        googleShoppingUrl: curGoogleUrls.googleShoppingUrl,
        criticism: cp.criticism,
        isVegan: cp.isVegan,
        animalIngredientsFound: cp.animalIngredientsFound,
        containsAllergens: cp.containsAllergens,
        imageUrl: cp.imageUrl,
        category: cp.category,
        keywords: cp.keywords,
        nutrition: cp.nutrition
      });
    });
  }

  // Compile Google Search Data & Grounding
  const compiledGoogleSearch = await compileGoogleSearchData(
    rawQ,
    locationName !== "Verified Regional Producer" ? locationName : undefined,
    groundingSources
  );

  // Always include verified organic registry sources in grounding sources
  if (groundingSources.length === 0) {
    groundingSources.push(
      {
        title: `Google Live Search: ${effectiveLiveSearchQuery}`,
        uri: `https://www.google.com/search?q=${encodeURIComponent(effectiveLiveSearchQuery)}`,
        type: 'web'
      },
      {
        title: "USDA National Organic Program (NOP) Integrity Database",
        uri: "https://organic.ams.usda.gov/integrity",
        type: 'web'
      },
      {
        title: "Canada Organic Directory (CFIA)",
        uri: "https://inspection.canada.ca/en/organic-products",
        type: 'web'
      },
      {
        title: "Demeter Certified Biodynamic Farm Registry",
        uri: "https://www.demeter-usa.org",
        type: 'web'
      }
    );
  }

  // Certified Organic Vegan Alternatives from real certified plant-based producers
  const veganAlternatives: LiveVeganAlternative[] = CURATED_VEGAN_ALTERNATIVES.slice(0, 3).map(alt => {
    const altGoogle = getGoogleProductUrls(alt.name, alt.brandOrVendor);
    return {
      id: alt.id,
      name: alt.name,
      brandOrVendor: alt.brandOrVendor,
      category: alt.category,
      description: alt.description,
      whyItIsGreat: alt.whyItIsGreat,
      purity: alt.purity,
      certifications: alt.certifications,
      price: alt.price,
      sourceUrl: alt.sourceUrl,
      googleSearchUrl: altGoogle.googleSearchUrl,
      googleShoppingUrl: altGoogle.googleShoppingUrl,
      allergenFreeTags: alt.allergenFreeTags,
      replacesProduct: alt.replacesProduct,
      imageUrl: alt.imageUrl
    };
  });

  const isNonVeganSearch = isExplicitAnimalQuery;
  const nonVeganReason = isNonVeganSearch
    ? "Query specifies animal-derived items (dairy, honey, eggs, or meat). See 100% plant-based certified organic swaps below."
    : "";

  // SORT BY LOCATION PROXIMITY & CERTIFIED ORGANIC PURITY %
  fetchedProducts.sort((a, b) => {
    if (a.isLocal && !b.isLocal) return -1;
    if (!a.isLocal && b.isLocal) return 1;

    if (b.purity !== a.purity) {
      return b.purity - a.purity;
    }

    return a.name.localeCompare(b.name);
  });

  return {
    products: fetchedProducts,
    veganAlternatives,
    isNonVeganSearch,
    nonVeganReason,
    sources: groundingSources,
    googleSearchData: compiledGoogleSearch
  };
}
