/// <reference types="vite/client" />

export interface NutritionInfo {
  [key: string]: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
  type: 'web' | 'maps';
}

export interface IngredientInfo {
  name: string;
  purityScore: number;
  description: string;
  isGreenwash: boolean;
  greenwashReason?: string;
  organicAlternative: string;
  safetyLevel: 'safe' | 'caution' | 'danger';
}

export interface BrandLineage {
  brandName: string;
  ownerCompany: string;
  isIndependent: boolean;
  transparencyIndex: number;
  ethicalAlignment: string;
  historicalNotes: string;
  bobVerdict: string;
}

export interface IndustrialROIReport {
  financialSavings: string;
  carbonSavings: string;
  performanceUplift: string;
  paybackPeriod: string;
  technicalSpecs: string[];
}

export interface MarketingTask {
  id: string;
  day: number;
  task: string;
  completed: boolean;
  bobTip: string;
}

export interface VeganAlternative {
  id: string;
  name: string;
  brandOrVendor: string;
  category: string; // e.g. "Plant-Based Dairy Swap", "Meat Alternative", "Egg Substitute", "Botanical Wax"
  description: string;
  whyItIsGreat: string; // e.g. "100% organic cultured cashew fermentation reproducing buttery mouthfeel with 0 animal inputs"
  purity: number; // e.g. 98%
  certifications: string[]; // e.g. ["USDA Organic", "Certified Vegan", "ROC Bronze"]
  price?: string;
  sourceUrl?: string;
  imageUrl?: string;
  allergenFreeTags?: string[]; // e.g. ["Dairy-Free", "Gluten-Free", "Soy-Free", "Nut-Free"]
  replacesProduct?: string; // what non-vegan item it replaces
}

export interface Product {
  id: string;
  name: string;
  description: string;
  purity: number;
  certifications: string[];
  price: string;
  shippingPrice: string;
  vendor: string;
  location?: string;
  isLocal: boolean;
  isOfficial?: boolean;
  imageUrl?: string; 
  sourceUrl?: string;
  nutrition?: NutritionInfo;
  criticism?: string;
  isVegan?: boolean;
  animalIngredientsFound?: string[]; // e.g. ["Dairy / Whey", "Tallow", "Gelatin", "Beeswax", "Egg White"]
  containsAllergens?: string[]; // e.g. ["Dairy", "Gluten", "Soy", "Peanuts", "Eggs"]
}

export interface SearchResponse {
  products: Product[];
  sources: GroundingSource[];
  isNonVeganSearch?: boolean;
  nonVeganReason?: string;
  veganAlternatives?: VeganAlternative[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface LabelAnalysis {
  productName: string;
  brand: string;
  purityScore: number;
  isGreenwashed: boolean;
  ingredientsAnalysis: {
    name: string;
    hazardLevel: 'low' | 'medium' | 'high';
    isOrganic: boolean;
    note: string;
  }[];
  verdict: string;
  recommendedAlternatives?: string[];
}

export interface BusinessAudit {
  businessName: string;
  currentAuthorityScore: number;
  seoHealth: {
    title: string;
    score: number;
    description: string;
  }[];
  certificationSignals: string[];
  growthOpportunities: string[];
  actionPlan: string[];
}

export interface SustainabilityReport {
  materialName: string;
  carbonOffsetKg: number;
  durabilityRating: number;
  petroleumComparison: string;
  technicalBenefits: string[];
  environmentalImpact: string;
}

export interface MarketingMilestone {
  day: number;
  task: string;
  objective: string;
  bobTip: string;
}

export interface MarketingPlan {
  businessName: string;
  strategy: string;
  milestones: MarketingMilestone[];
  attractionMarketingFocus: string;
}

export interface RouteStop {
  name: string;
  location: { lat: number; lng: number };
  description: string;
  freshnessScore: number;
  specialty: string;
}

export interface RoutePlan {
  totalDistance: string;
  totalFreshnessScore: number;
  stops: RouteStop[];
  mapsUrl: string;
}

export interface BusinessPlan {
  businessName: string;
  vision: string;
  targetMarket: string;
  revenueModel: string;
  supplyChainStrategy: string;
  purityCommitment: string;
  marketingApproach: string;
  financialProjections: string;
  riskMitigation: string;
  nextSteps: string[];
}

export interface MarketingMaterials {
  businessName: string;
  brandStory: string;
  toneOfVoice: string;
  colorPalette: string[];
  adCopy: {
    headlines: string[];
    bodyText: string[];
    taglines: string[];
  };
  imagePrompts: {
    logo: string;
    banner: string;
    socialProfile: string;
    creative: string;
  };
}

export interface SEOReport {
  businessName: string;
  url: string;
  overallScore: number;
  metadata: {
    titleTag: { current: string; suggested: string; score: number };
    metaDescription: { current: string; suggested: string; score: number };
    h1Tags: { current: string; suggested: string; score: number };
  };
  keywordAnalysis: {
    keyword: string;
    relevance: number;
    volume?: string;
    difficulty?: string;
  }[];
  contentGaps: string[];
  localSEOStrategy: string[];
  technicalTrustSignals: {
    signal: string;
    status: 'good' | 'improvement' | 'critical';
    recommendation: string;
  }[];
  bobInsight: string;
}

export interface DirectoryEntry {
  name: string;
  category: string;
  description: string;
  purityScore: number;
  locationType: 'local' | 'state-national' | 'international';
  website?: string;
}

export interface TieredDirectory {
  location: string;
  tier1: DirectoryEntry[]; // City Level
  tier2: DirectoryEntry[]; // State/National Level
  tier3: DirectoryEntry[]; // International Imports
  bobInsight: string;
}

// --- Barcode & NOP Scanner Entity ---
export interface BarcodeScanResult {
  barcode: string;
  productName: string;
  brand: string;
  purityScore: number;
  certifications: string[];
  status: 'certified_organic' | 'partially_organic' | 'conventional' | 'flagged_greenwash';
  ingredients: {
    name: string;
    isOrganic: boolean;
    isAdditive: boolean;
    eNumber?: string;
    hazardLevel: 'safe' | 'caution' | 'danger';
    notes?: string;
  }[];
  heavyMetalRisk: 'very_low' | 'low' | 'moderate' | 'high';
  isVegan: boolean;
  usdaNopStatus: 'Verified Active' | 'Pending Verification' | 'Not Registered' | 'Suspended';
  verdict: string;
  cleanAlternatives: string[];
}

// --- Grocery Basket Optimizer Entities ---
export interface BasketItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export interface BasketVendorQuote {
  vendorId: 'thrive' | 'wholefoods' | 'azure' | 'coop';
  vendorName: string;
  logo: string;
  itemPrices: { [itemId: string]: number };
  missingItems: string[];
  subtotal: number;
  shipping: number;
  membershipFeeDiscount: number;
  totalCost: number;
  estimatedDeliveryDays: string;
  carbonEmissionsKg: number;
  affiliateUrl: string;
}

export interface BasketOptimizationResult {
  items: BasketItem[];
  vendorQuotes: BasketVendorQuote[];
  cheapestSingleVendor: BasketVendorQuote;
  optimalSplitStrategy: {
    vendorQuotes: { vendorName: string; itemsBought: string[]; total: number; affiliateUrl: string }[];
    combinedTotal: number;
    savingsVsWorstSingle: number;
  };
}

// --- Microbiome & Soil-to-Gut Entities ---
export interface MicrobiomeCropProfile {
  cropName: string;
  botanicalFamily: string;
  polyphenolMultiplier: number; // e.g. 1.45 (+45% higher)
  antioxidantOracValue: number; // e.g. 9400 ORAC units
  heavyMetalReductionPct: number; // e.g. -48%
  pesticideResidueReductionPct: number; // e.g. 99.4%
  gutDiversityScore: number; // 0-100
  keyBeneficialPhytochemicals: string[];
  soilMicrobiomeCfug: string; // e.g. "1.2 x 10^9 CFU/g"
  peerReviewedCitation: string;
  healthSummary: string;
}

// --- USDA Integrity & Farm Batch Trace Entities ---
export interface USDACertificateRecord {
  certNumber: string;
  operationName: string;
  certifier: string;
  status: 'Active / Certified' | 'Suspended' | 'Revoked' | 'Surrendered';
  effectiveDate: string;
  certifiedScopes: string[];
  physicalAddress: string;
  contactPerson: string;
}

export interface FarmBatchRecord {
  batchId: string;
  farmName: string;
  cropName: string;
  harvestDate: string;
  fieldPlotNumber: string;
  gpsCoordinates: { lat: number; lng: number };
  soilAssayOrganicMatterPct: number;
  pesticideScreenResult: 'ND (<0.01 ppm)' | 'Passed Comprehensive Screening';
  labReportPdfUrl?: string;
  certifierLogo: string;
}

// --- CSA Farm Share & Subscription Entities ---
export interface CSAPackageOption {
  id: string;
  title: string;
  farmName: string;
  location: string;
  distanceMiles: number;
  weeklyPrice: number;
  biWeeklyPrice: number;
  seasonWeeks: number;
  boxSize: 'Solo / Couple (5-7 items)' | 'Family Share (10-12 items)' | 'Feast Bounty (15+ items)';
  typicalContents: string[];
  pickupLocations: string[];
  doorstepDeliveryAvailable: boolean;
  certifications: string[];
  spotsRemaining: number;
  imageUrl: string;
}

// --- Carbon Credit Estimator Entities ---
export interface CarbonEstimateResult {
  acres: number;
  annualCo2eSequesteredTons: number;
  fiveYearCo2eTotalTons: number;
  soilOrganicMatterIncreasePct: number;
  waterRetentionIncreaseGallons: number;
  estimatedCarbonCreditGrossUsd: number;
  netFarmerPayoutUsd: number;
  verraGoldStandardEligibility: boolean;
  breakdownByPractice: {
    practice: string;
    tonsPerYear: number;
    revenueUsd: number;
  }[];
}

// --- Wholesale B2B Entities ---
export interface WholesaleProduct {
  id: string;
  name: string;
  farmName: string;
  location: string;
  category: string;
  unitType: '50lb Crate' | 'Pallet (40 Crates)' | 'Bushel Box' | '55-Gal Drum';
  pricePerUnit: number;
  moq: number; // Minimum Order Quantity
  availableUnits: number;
  harvestWindow: string;
  certifications: string[];
  freightTier: 'Refrigerated Freight' | 'Standard Dry Freight' | 'Local Farm Delivery';
  imageUrl: string;
}

// --- Produce & Seed Swap Entity ---
export interface ProduceSwapListing {
  id: string;
  title: string;
  gardenerName: string;
  location: string;
  distanceMiles: number;
  type: 'Surplus Produce' | 'Heirloom Seeds' | 'Live Seedlings' | 'Fermentation Starter';
  organicGrowingMethod: string;
  description: string;
  lookingInExchange: string;
  postedDate: string;
  imageUrl?: string;
  contactEmail: string;
}

// --- Live OSINT Search Intelligence Report Entity ---
export interface OsintReport {
  title: string;
  timestamp: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'GUARDED';
  executiveSummary: string;
  macroMetrics: {
    globalOrganicFarmlandMha: string;
    marketValuationBillion: string;
    greenwashRiskScore: number;
    usdaSoeComplianceRate: string;
  };
  keyFindings: Array<{
    category: string;
    headline: string;
    threatSeverity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'POSITIVE';
    osintAnalysis: string;
    verifiedSources: string[];
  }>;
  fraudAlerts: Array<{
    sector: string;
    modusOperandi: string;
    detectedRegions: string;
    riskVector: string;
  }>;
  emergingContaminantsBrief: {
    pfasInBiosolids: string;
    microplasticsInHydroponics: string;
    syntheticBiologyEnzymes: string;
  };
  consumerDefenseDirectives: string[];
  growerActionPlan: string[];
  groundingSources?: Array<{
    title: string;
    url: string;
  }>;
}

export * from './src/types/community';

