import React, { useState, useEffect, useCallback, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, MapPin, Globe, Map as MapIcon, ShieldCheck, X, ExternalLink, 
    Settings, Navigation, Info, ArrowRight, Star, Leaf, CheckCircle2, Lock,
    MessageSquare, Users, Mail, Sparkles, Atom, BookOpen, HelpCircle, Download, FileText, ClipboardList, Megaphone, BarChart3,
    ChevronDown, Database, Barcode, ShoppingCart, Dna, Package, Building2, Code, CloudRain, Activity, ScanLine,
    Radio, Flame, ShieldAlert, AlertTriangle
} from 'lucide-react';
import { Product, UserLocation, GroundingSource, TieredDirectory } from './types';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { searchOrganicProducts, geocodeLocation, getOrganicDirectory } from './services/geminiService';
import { useAuth } from './src/context/AuthContext';
import { signInWithGoogle, logout, saveSearchToMemory, getSearchMemory } from './src/lib/firebase';
import { BobAssistant } from './components/BobAssistant';
import { OrganicCertifications } from './components/OrganicCertifications';
import { OrganicOrganizations } from './components/OrganicOrganizations';
import { OrganicCommunityGroups } from './components/OrganicCommunityGroups';
import { OrganicManifesto } from './components/OrganicManifesto';
import { OrganicBusinessPlan } from './src/components/OrganicBusinessPlan';
import { OrganicDirectory } from './src/components/OrganicDirectory';
import { MarketingKitGenerator } from './src/components/MarketingKitGenerator';
import { SEOReportGenerator } from './src/components/SEOReportGenerator';
import { PrivacyPolicy, OwnershipInfo, AffiliateDisclosure, SalesPage, TermsOfService, Sitemap } from './src/components/CompliancePages';
import { AboutPage, ContactPage, CertificationPage, PartnershipPage } from './src/components/InfoPages';
import { Intelligence } from './src/components/Intelligence';
import { FeaturedOrganicInsight } from './components/FeaturedOrganicInsight';
import { Guide } from './components/Guide';
import { cn } from './src/lib/utils';
import { Scanner } from './src/components/Scanner';
import { BusinessAudit } from './src/components/BusinessAudit';
import { EcoCalc } from './src/components/EcoCalc';
import { MarketingPlan } from './src/components/MarketingPlan';
import { FarmRoute } from './src/components/FarmRoute';
import { WhatIsOrganic } from './src/components/WhatIsOrganic';
import { FAQ } from './src/components/FAQ';
import { CommunityHub } from './src/components/community/CommunityHub';
import { UserProfileModal } from './src/components/community/UserProfileModal';
import { BookmarkButton } from './src/components/community/BookmarkButton';
import { VeganAlternativesSection } from './src/components/VeganAlternativesSection';
import { DietarySettingsModal } from './src/components/DietarySettingsModal';
import { VeganAlternative } from './types';

// New Advanced Agricultural & Consumer Modules
import { BarcodeScannerModal } from './src/components/BarcodeScannerModal';
import { BasketOptimizer } from './src/components/BasketOptimizer';
import { MicrobiomeInsights } from './src/components/MicrobiomeInsights';
import { USDAIntegritySync } from './src/components/USDAIntegritySync';
import { CSAPortal } from './src/components/CSAPortal';
import { CarbonCreditEstimator } from './src/components/CarbonCreditEstimator';
import { WholesaleB2B } from './src/components/WholesaleB2B';
import { ProduceSwap } from './src/components/ProduceSwap';
import { DeveloperApi } from './src/components/DeveloperApi';
import { OsintReportModal } from './src/components/OsintReportModal';
import { OrganicTips } from './src/components/OrganicTips';

type TabType = 'search' | 'stateOfOrganics' | 'community' | 'scanner' | 'basket' | 'microbiome' | 'usda' | 'csa' | 'carbon' | 'wholesale' | 'swap' | 'devApi' | 'audit' | 'calc' | 'workshops' | 'route' | 'businessPlan' | 'marketingKit' | 'seoReport' | 'intelligence' | 'info' | 'faq' | 'chat' | 'privacy' | 'ownership' | 'sales' | 'affiliate' | 'terms' | 'sitemap' | 'about' | 'contact' | 'certification' | 'partnership' | 'tips';

const Logo: FC<{ className?: string }> = ({ className }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <img src="https://i.postimg.cc/5N79zr9x/IMG-6083-Original.jpg" alt="Search for Organics Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
    </div>
);

const SUGGESTED_TAGS = [
    "Organic Avocados", "Heirloom Tomatoes", "Wild Blueberries", "Organic Kale", "Honeycrisp Apples",
    "Microgreens", "Organic Garlic", "Seedless Grapes", "Organic Spinach", "Baby Carrots",
    "Raw Manuka Honey", "Extra Virgin Olive Oil", "Organic Quinoa", "Coconut Aminos", "Pink Himalayan Salt",
    "Organic Maple Syrup", "Chia Seeds", "Hemp Hearts", "Hemp Protein", "Hemp Foods", "Apple Cider Vinegar", "Organic Rolled Oats",
    "Grass-Fed Butter", "Raw Milk", "Oat Milk", "Almond Butter", "Organic Greek Yogurt",
    "Goat Cheese", "Cashew Milk", "A2 Milk", "Organic Eggs", "Coconut Yogurt",
    "Grass-Fed Beef", "Pasture-Raised Chicken", "Wild-Caught Salmon", "Organic Tempeh", "Sprouted Tofu",
    "Bison Meat", "Free-Range Turkey", "Organic Lentils", "Chickpeas", "Seitan",
    "Organic Matcha", "Cold Brew Coffee", "Kombucha", "Herbal Tea", "Coconut Water",
    "Tart Cherry Juice", "Organic Wine", "Yerba Mate", "Oat Latte", "Green Juice",
    "Organic Lavender Oil", "Natural Sunscreen", "Fluoride-Free Toothpaste", "Organic Shampoo", "Shea Butter",
    "Castor Oil", "Magnesium Oil", "Bamboo Toothbrush", "Organic Cotton Pads", "Mineral Makeup",
    "Organic Farm Box", "CSA Subscription", "Permaculture Design", "Organic Lawn Care", "Holistic Nutritionist",
    "Hemp Seed Oil", "Hemp Milk", "Hemp Fiber",
    "Organic Farming", "Regenerative Agriculture", "Sustainable Gardening", "Compostable", "Biodynamic", 
    "Eco-friendly", "Soil Health", "Carbon Sequestration", "Farm-to-Table", "Heirloom Seeds", "Organic Certification"
];

const SEARCH_EXAMPLES = [
    "potato + moncton",
    "chocolate + canada",
    "blueberries + nova scotia",
    "apples + washington",
    "honey",
    "skincare",
    "textiles",
    "avocados + mexico",
    "coffee + ethiopia"
];

const COMPLIANCE_LINKS: { id: TabType, label: string }[] = [
    { id: 'privacy', label: 'Privacy' },
    { id: 'ownership', label: 'Ownership' },
    { id: 'sales', label: 'Growth Suite' },
    { id: 'affiliate', label: 'Affiliate' },
    { id: 'terms', label: 'Terms' },
    { id: 'sitemap', label: 'Sitemap' },
    { id: 'about', label: 'About Mission' },
    { id: 'contact', label: 'Contact Lab' },
    { id: 'certification', label: 'Certification' },
    { id: 'partnership', label: 'Partnerships' }
];

const TABS: { id: TabType, label: string, icon: any }[] = [
    { id: 'search', label: 'Organic Search', icon: Search },
    { id: 'stateOfOrganics', label: 'State of Organics 2026', icon: ShieldAlert },
    { id: 'tips', label: 'Organic Tips', icon: BookOpen },
    { id: 'businessPlan', label: 'Organic Business Plan', icon: ClipboardList },
    { id: 'scanner', label: 'Greenwash Scanner', icon: ScanLine },
    { id: 'basket', label: 'Basket Optimizer', icon: ShoppingCart },
    { id: 'microbiome', label: 'Microbiome Health', icon: Dna },
    { id: 'usda', label: 'USDA Traceability', icon: Database },
    { id: 'csa', label: 'CSA Farm Shares', icon: Package },
    { id: 'carbon', label: 'Soil Carbon', icon: Leaf },
    { id: 'wholesale', label: 'B2B Wholesale', icon: Building2 },
    { id: 'swap', label: 'Produce Swap', icon: Users },
    { id: 'devApi', label: 'Developer API', icon: Code },
    { id: 'community', label: 'Community Hub', icon: Users },
    { id: 'audit', label: 'Authority Audit', icon: Globe },
    { id: 'calc', label: 'Hempoxies™ Hub', icon: Atom },
    { id: 'workshops', label: 'Workshops', icon: Sparkles },
    { id: 'route', label: 'Farm Route', icon: Navigation },
    { id: 'marketingKit', label: 'Brand Kit', icon: Megaphone },
    { id: 'intelligence', label: 'Purity Hub', icon: Database },
    { id: 'seoReport', label: 'SEO Audit', icon: BarChart3 },
    { id: 'info', label: 'What is Organic?', icon: BookOpen },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'chat', label: 'Bob', icon: MessageSquare },
    { id: 'about', label: 'About', icon: Leaf },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'certification', label: 'Certification', icon: ShieldCheck },
];

// --- UI Components ---
const UserMenu: FC = () => {
  const { user, profile, loading, openProfileModal, openPrivateSettingsModal, privateSettings } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) return <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />;

  if (!user) {
    return (
      <button 
        onClick={signInWithGoogle}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-xs font-black uppercase tracking-wider text-gray-600 hover:text-organic-green hover:border-organic-green"
      >
        <Lock className="w-4 h-4" />
        Log In for Memory & Community
      </button>
    );
  }

  const handleNavCommunity = (subtab?: string) => {
    setShowDropdown(false);
    window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'community' }));
    if (subtab) {
      window.dispatchEvent(new CustomEvent('switch-community-subtab', { detail: subtab }));
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 bg-white hover:bg-gray-50/80 p-1.5 pl-3.5 pr-2.5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
      >
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">
            {profile?.username ? `@${profile.username}` : 'Authenticated Member'}
          </span>
          <span className="text-xs font-black text-gray-900 line-clamp-1 max-w-[120px]">
            {profile?.displayName || user.displayName || 'Organic Member'}
          </span>
        </div>
        <div className="relative">
          <img 
            src={profile?.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=059669&color=fff`} 
            alt="Profile" 
            className="w-10 h-10 rounded-xl border border-emerald-500/20 object-cover shadow-sm"
            referrerPolicy="no-referrer"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", showDropdown && "rotate-180")} />
      </div>

      {/* User Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 text-left"
            >
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100/50 mb-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  {profile?.role || 'Verified Organic Member'}
                </p>
                <p className="text-sm font-black text-gray-900 truncate">
                  {profile?.displayName || user.displayName}
                </p>
                <p className="text-[11px] font-bold text-gray-400">
                  @{profile?.username || 'member'}
                </p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    openProfileModal(user.uid);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  Edit Profile & Username
                </button>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    openPrivateSettingsModal();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-black text-amber-900 bg-amber-50/60 hover:bg-amber-100/80 rounded-xl transition-colors border border-amber-200/60"
                >
                  <span className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-600" />
                    Private Allergies & Diet
                  </span>
                  {privateSettings?.isVegan && (
                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">VEGAN</span>
                  )}
                </button>

                <button
                  onClick={() => handleNavCommunity('forums')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  User Forums
                </button>

                <button
                  onClick={() => handleNavCommunity('groups')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <Users className="w-4 h-4 text-teal-600" />
                  User Groups & Chat
                </button>

                <button
                  onClick={() => handleNavCommunity('dms')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 text-indigo-600" />
                  Direct Messages
                </button>

                <button
                  onClick={() => handleNavCommunity('companies')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Company Profiles
                </button>

                <button
                  onClick={() => handleNavCommunity('bookmarks')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  Saved Results & Folders
                </button>

                <button
                  onClick={() => handleNavCommunity('memory')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Search Memory History
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  query: string;
  setQuery: (q: string) => void;
  locationActive: boolean;
  onOpenSettings: () => void;
  onOpenApiSettings: () => void;
  onOpenDietarySettings?: () => void;
  isVeganUser?: boolean;
  allergyCount?: number;
  apiKeyActive: boolean;
  localSearchEnabled: boolean;
  onToggleLocalSearch: () => void;
  locationLabel?: string;
  locationStatus?: 'idle' | 'locating' | 'error' | 'success';
  locationErrorMsg?: string | null;
}

const SearchBar: FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  query, 
  setQuery, 
  locationActive, 
  onOpenSettings,
  onOpenApiSettings,
  onOpenDietarySettings,
  isVeganUser,
  allergyCount,
  apiKeyActive,
  locationLabel,
  locationStatus,
  locationErrorMsg,
  localSearchEnabled,
  onToggleLocalSearch
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      <div className="flex flex-col items-center gap-3">
         <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
            <button 
                onClick={onOpenSettings}
                className={`group flex items-center px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm active:scale-95 ${locationActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-500 border-gray-100 hover:border-organic-green hover:text-organic-green'}`}
                title="Location Settings"
            >
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                {!localSearchEnabled ? 'Local Search OFF' : (locationActive ? (locationLabel || 'Location Active') : 'Location')}
            </button>

            {onOpenDietarySettings && (
              <button 
                  onClick={onOpenDietarySettings}
                  className={`group flex items-center px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm active:scale-95 ${
                    isVeganUser || (allergyCount && allergyCount > 0)
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-emerald-500/10'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-emerald-500 hover:text-emerald-700'
                  }`}
                  title="Private Dietary & Allergy Settings"
              >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {isVeganUser ? '🌱 Vegan Guard' : (allergyCount && allergyCount > 0 ? `🛡️ ${allergyCount} Allergens` : 'Allergies & Vegan')}
              </button>
            )}

            <button 
                onClick={onOpenApiSettings}
                className={`group flex items-center px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm active:scale-95 ${apiKeyActive ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-600 hover:text-blue-600'}`}
                title="Gemini API Settings"
            >
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                {apiKeyActive ? 'API Active' : 'API Key'}
            </button>
         </div>

         {locationErrorMsg && !locationActive && (
             <div className="flex items-center gap-2 text-[10px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200 animate-in slide-in-from-top-2 duration-300">
                <X className="w-3.5 h-3.5" />
                <span>{locationErrorMsg}</span>
                <button onClick={onOpenSettings} className="ml-2 px-2 py-0.5 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors underline font-black text-amber-900">Fix Settings</button>
             </div>
         )}
      </div>

      <form onSubmit={handleSubmit} role="search" className="relative">
        <label htmlFor="organic-search-input" className="sr-only">Search for organic products</label>
        <input
          id="organic-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locationActive ? "Organic honey, farms, milk near you..." : "Organic brands, products, groceries..."}
          className="w-full pl-7 pr-16 py-4.5 border-2 border-organic-green-light/40 focus:border-organic-green-dark focus:ring-4 focus:ring-organic-green/5 rounded-3xl shadow-xl transition-all duration-300 text-lg placeholder:text-gray-300 bg-white"
          disabled={isLoading}
          aria-busy={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Submit Search"
          className="absolute inset-y-1.5 right-1.5 flex items-center justify-center px-4 text-white bg-organic-green hover:bg-organic-green-dark rounded-2xl disabled:bg-gray-300 shadow-md transition-all active:scale-95 text-[10px] font-black uppercase tracking-wider gap-1.5"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Organic Search</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const ProductDetailModal: FC<{ product: Product, onClose: () => void }> = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-organic-green-dark/60 backdrop-blur-lg flex items-center justify-center z-[110] p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto" onClick={onClose}>
            <div className="bg-cream rounded-[2.5rem] shadow-3xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col lg:flex-row max-h-[90vh]">
                    {/* Visual Side */}
                    <div className="lg:w-2/5 relative h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-gray-100">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                         {product.isOfficial && (
                                <div className="bg-organic-green text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4" />
                                    OFFICIAL SOURCE
                                </div>
                            )}
                            {product.isLocal && (
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5 w-fit">
                                    <MapPin className="w-3.5 h-3.5" />
                                    LOCAL VENDOR
                                </div>
                            )}
                            {product.criticism && (
                                <div className="bg-amber-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5 w-fit">
                                    <Globe className="w-3.5 h-3.5" />
                                    AI-Generated critique based on search information
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Facts Side */}
                    <div className="lg:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-4xl font-black text-organic-green-dark leading-none tracking-tighter mb-2">{product.name}</h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    {product.sourceUrl ? (
                                        <a 
                                            href={product.sourceUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm font-black text-gray-500 uppercase tracking-widest hover:text-organic-green transition-colors flex items-center gap-1.5"
                                        >
                                            {product.vendor}
                                            <ExternalLink className="w-3.5 h-3.5 text-organic-green" />
                                        </a>
                                    ) : (
                                        <p className="text-sm font-black text-gray-500 uppercase tracking-widest">{product.vendor}</p>
                                    )}
                                    {product.location && (
                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                                            <MapPin className="w-3 h-3 text-blue-600" />
                                            {product.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button onClick={onClose} className="p-3 bg-white hover:bg-gray-100 rounded-2xl transition-colors shadow-sm"><X className="w-6 h-6 text-gray-400" /></button>
                        </div>

                        {/* The Info Box / Fact Sheet */}
                        <div className="bg-white border-4 border-black p-6 md:p-8 space-y-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] mb-8">
                            <div className="border-b-8 border-black pb-4 mb-4 flex justify-between items-end">
                                <div>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Organic Facts</h3>
                                    {product.location && (
                                        <p className="text-xs font-bold text-gray-600 mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-blue-600" />
                                            Location: {product.location}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-800">Organic Purity</p>
                                    <p className="text-2xl font-black text-organic-green">{product.purity}%</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                <div className="space-y-4">
                                    <div className="border-b border-black pb-2 flex justify-between font-black uppercase tracking-wider">
                                        <span>Organic Certifications</span>
                                        <span>Verified</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {product.certifications.map((cert, i) => (
                                            <li key={i} className="flex items-center gap-2 font-bold text-gray-800 bg-emerald-50/70 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs">
                                                <ShieldCheck className="w-4 h-4 text-organic-green shrink-0" />
                                                {cert}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-b border-black pb-2 flex justify-between font-black uppercase tracking-wider">
                                        <span>Dietary & Allergens</span>
                                        <span className={product.isVegan ? "text-emerald-700 font-black" : "text-gray-500"}>
                                            {product.isVegan ? "VEGAN" : "NON-VEGAN"}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 font-bold uppercase text-[10px]">Vegan Status</span>
                                            <span className={`font-black px-2 py-0.5 rounded text-[10px] ${product.isVegan ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                                                {product.isVegan ? '🌱 100% Vegan' : 'Non-Vegan Origin'}
                                            </span>
                                        </div>
                                        {product.containsAllergens && product.containsAllergens.length > 0 ? (
                                            <div className="pt-1">
                                                <p className="text-[10px] font-black uppercase tracking-wider text-amber-700 mb-1">Contains Allergens:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {product.containsAllergens.map((alg, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded font-bold text-[10px]">
                                                            {alg}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-emerald-700 font-bold">✓ No major priority allergens flagged</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expert Critique */}
                            {product.criticism && (
                                <div className="pt-8 border-t-4 border-black">
                                    <h4 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-amber-700">
                                        <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                                        AI-Generated critique based on search information
                                    </h4>
                                    <div className="bg-amber-50/50 p-6 rounded-2xl border-2 border-amber-100 italic text-sm text-gray-700 leading-relaxed font-medium">
                                        "{product.criticism}"
                                        <div className="mt-4 flex items-center gap-2 not-italic">
                                            <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-[10px] text-white font-black">AI</div>
                                            <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">AI-Generated critique based on search information</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Nutrition / Analysis */}
                            {product.nutrition && Object.keys(product.nutrition).length > 0 && (
                                <div className="pt-8 border-t-4 border-black">
                                    <h4 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        Nutritional Analysis
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(product.nutrition).map(([key, value]) => (
                                            <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{key}</p>
                                                <p className="font-black text-gray-800">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-[10px] leading-relaxed font-bold text-gray-400 uppercase italic">
                                Information grounded via real-time search of official certification databases. Purity is calculated based on ingredient transparency and certification tier.
                            </p>
                        </div>

                        <div className="mt-auto pt-6 flex flex-col md:flex-row gap-4">
                             <BookmarkButton product={product} variant="button" className="flex-1" />
                             {product.sourceUrl ? (
                                <a 
                                    href={product.sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-organic-green-dark text-white font-black text-center py-5 rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                                >
                                    ORDER FROM VENDOR
                                    <ShieldCheck className="w-4 h-4" />
                                </a>
                             ) : (
                                <button 
                                    disabled
                                    className="flex-1 bg-gray-200 text-gray-400 font-black text-center py-5 rounded-2xl cursor-not-allowed uppercase tracking-widest text-xs"
                                >
                                    VENDOR LINK UNAVAILABLE
                                </button>
                             )}
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-white text-gray-400 font-black border border-gray-200 py-5 rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
                            >
                                CLOSE ANALYSIS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductCard: FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => (
    <article 
        onClick={onClick}
        className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full overflow-hidden group cursor-pointer active:scale-[0.98]"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" referrerPolicy="no-referrer" />
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-black text-organic-green shadow-sm flex items-center gap-2 border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-organic-green animate-pulse"></span>
            ORGANIC PURITY: {product.purity}%
        </div>

        {product.isOfficial && (
            <div className="absolute top-4 left-4 bg-organic-green text-white px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                OFFICIAL SOURCE
            </div>
        )}

        {product.isLocal && !product.isOfficial && (
            <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5 animate-in slide-in-from-left-2 duration-500">
                <MapPin className="w-3 h-3" />
                {product.location ? product.location : "Local Vendor"}
            </div>
        )}
        
        {product.criticism && (
            <div className="absolute bottom-4 right-4 bg-amber-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5 animate-in slide-in-from-right-2 duration-500">
                <Globe className="w-3 h-3" />
                AI-Generated critique based on search information
            </div>
        )}
      </div>
      
      <div className="p-7 flex flex-col flex-grow">
        <div className="mb-3">
            <h3 className="text-xl font-black text-organic-green-dark line-clamp-1 group-hover:text-organic-green transition-colors leading-tight">{product.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.08em]">{product.vendor}</span>
                {product.location && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                        <MapPin className="w-2.5 h-2.5 text-blue-600" />
                        {product.location}
                    </span>
                )}
                {product.isOfficial && <span className="text-[10px] text-organic-green font-black">● VERIFIED SOURCE</span>}
                {product.isLocal && !product.isOfficial && !product.location && <span className="text-[10px] text-blue-500 font-bold">● LOCAL</span>}
            </div>
        </div>
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed font-medium">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {product.isVegan && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-[9px] font-black text-emerald-900 uppercase tracking-wider border border-emerald-300">
              <Leaf className="w-2.5 h-2.5 text-emerald-700" />
              100% Vegan
            </span>
          )}
          {product.containsAllergens && product.containsAllergens.length > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-amber-50 text-[9px] font-black text-amber-800 uppercase tracking-wider border border-amber-200">
              ⚠️ {product.containsAllergens.slice(0, 2).join(', ')}
            </span>
          )}
          {product.certifications.slice(0, 3).map((cert, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-organic-green-light/10 text-[9px] font-black text-organic-green uppercase tracking-wider border border-organic-green/20">
              <ShieldCheck className="w-2.5 h-2.5 text-organic-green shrink-0" />
              {cert}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-end">
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-organic-green-dark">{product.price}</span>
                    {product.sourceUrl && (
                        <a 
                            href={product.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-organic-green rounded-xl hover:bg-organic-green hover:text-white transition-all text-[10px] font-black uppercase tracking-wider border border-emerald-200 group/link"
                            title="Open Real Producer Website"
                        >
                            <Globe className="w-3 h-3 group-hover/link:animate-spin-once" />
                            Live Link
                        </a>
                    )}
                </div>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{product.shippingPrice}</p>
            </div>
            <div className="flex items-center gap-2">
                <BookmarkButton product={product} variant="icon" />
                <button className="bg-organic-green group-hover:bg-organic-green-dark text-white text-xs font-black py-3 px-6 rounded-2xl transition-all shadow-lg">
                    DETAILS
                </button>
            </div>
        </div>
      </div>
    </article>
);

const LocationSettingsModal: FC<{ 
  onClose: () => void; 
  onSet: (lat: number, lng: number, label: string) => void;
  onRequestGPS: () => void;
  locationStatus: 'idle' | 'locating' | 'error' | 'success';
  locationActive: boolean;
  localSearchEnabled: boolean;
  onToggleLocalSearch: () => void;
  apiKey: string;
}> = ({ onClose, onSet, onRequestGPS, locationStatus, locationActive, localSearchEnabled, onToggleLocalSearch, apiKey }) => {
    const [inputValue, setInputValue] = useState('');
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeocode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isGeocoding) return;

        setIsGeocoding(true);
        setError(null);
        try {
            const result = await geocodeLocation(inputValue, apiKey);
            onSet(result.lat, result.lng, result.name);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to find location");
        } finally {
            setIsGeocoding(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-organic-green-dark/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-organic-green-dark">Location Settings</h2>
                        <p className="text-sm text-gray-400 font-bold mt-1">Configure how we find local organics</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                </div>
                
                <div className="space-y-8">
                    {/* Toggle Local Search */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <span className="text-sm font-black text-gray-700">Enable Local Search</span>
                        <button 
                            onClick={onToggleLocalSearch}
                            className={`w-14 h-8 rounded-full transition-colors flex items-center p-1 ${localSearchEnabled ? 'bg-organic-green' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${localSearchEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {localSearchEnabled && (
                        <>
                            {/* GPS Section */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Automatic Detection</h3>
                                <button 
                                    onClick={onRequestGPS}
                                    disabled={locationStatus === 'locating'}
                                    className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-[1.5rem] border-2 transition-all font-black text-sm active:scale-95 ${locationActive ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-100 hover:border-organic-green text-gray-700'}`}
                                >
                                    <MapPin className={`w-5 h-5 ${locationStatus === 'locating' ? 'animate-bounce text-organic-green' : ''}`} />
                                    {locationStatus === 'locating' ? 'Locating...' : (locationActive ? 'GPS Location Active' : 'Use My Current GPS')}
                                </button>
                            </div>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">OR</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            {/* Manual Section */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Manual Override</h3>
                                <form onSubmit={handleGeocode} className="space-y-4">
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Enter City, State or Region"
                                            className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-100 focus:border-organic-green focus:ring-4 focus:ring-organic-green/5 transition-all text-sm font-black bg-gray-50/50 outline-none"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-xs font-black text-red-500 uppercase tracking-widest px-2">{error}</p>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={isGeocoding || !inputValue.trim()}
                                        className="w-full bg-white border-2 border-gray-100 text-gray-700 font-black py-5 rounded-[1.5rem] hover:border-organic-green hover:text-organic-green transition-all flex items-center justify-center gap-3 disabled:bg-gray-50 disabled:text-gray-300"
                                    >
                                        {isGeocoding ? (
                                            <div className="w-5 h-5 border-2 border-organic-green border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Globe className="w-5 h-5" />
                                                SET MANUAL LOCATION
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const RankOrganicallyBanner: FC = () => (
    <section className="container mx-auto px-6 mt-32 max-w-6xl">
        <div className="relative overflow-hidden bg-gradient-to-br from-organic-green-dark to-black rounded-[3rem] md:rounded-[4rem] p-8 sm:p-12 md:p-20 shadow-2xl group border border-white/10">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-organic-green/20 blur-[120px] rounded-full -mr-48 -mt-48 group-hover:bg-organic-green/30 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-organic-green/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black text-organic-green-light uppercase tracking-[0.4em]">
                            #1 Affiliate Partner
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase break-words">
                            Rank <span className="text-organic-green italic">Organically</span>
                        </h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl font-black text-gray-300 leading-tight tracking-tight">
                            Dominate the Search Results with Premium SEO Services.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "White-Hat Link Building",
                                "High-Quality Content",
                                "Managed SEO Campaigns",
                                "Local SEO Domination"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center text-xs font-black text-organic-green-light uppercase tracking-widest opacity-80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-organic-green mr-3 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4">
                        <a 
                            href="https://rankorganically.blogspot.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-10 py-5 rounded-3xl bg-organic-green text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-organic-green-dark transition-all shadow-2xl hover:shadow-organic-green/40 active:scale-95 group/btn"
                        >
                            Get More Traffic Now
                            <Search className="w-5 h-5 ml-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="hidden lg:block relative">
                    <div className="bg-white/5 backdrop-blur-sm rounded-[3rem] p-10 border border-white/10 shadow-inner">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-organic-green uppercase tracking-widest">Organic Growth</p>
                                    <p className="text-2xl font-black text-white">+420% Traffic</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-organic-green/20 flex items-center justify-center">
                                    <Search className="w-6 h-6 text-organic-green" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                                    "Stop guessing and start ranking. We build managed SEO campaigns that deliver real, measurable results through high-authority link building and expert content strategy."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-organic-green to-emerald-500"></div>
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-widest">SEO Experts</p>
                                        <p className="text-[9px] font-black text-organic-green uppercase tracking-widest">Rank Organically Team</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const RankOrganicallySalesLetter: FC = () => (
    <section className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-organic-green/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-organic-green/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
            
            <div className="relative space-y-12">
                <div className="text-center space-y-6">
                    <span className="text-[10px] font-black text-organic-green uppercase tracking-[0.5em]">A Message from Rank Organically</span>
                    <h2 className="text-4xl md:text-6xl font-black text-organic-green-dark tracking-tighter leading-tight uppercase">
                        Stop Guessing. <br/>
                        <span className="italic">Start Ranking.</span>
                    </h2>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-8">
                    <p className="text-xl text-gray-800 font-black leading-snug">
                        Dear Business Owner,
                    </p>
                    
                    <p>
                        Are you tired of watching your competitors dominate the search results while your website sits on page 2, 3, or worse? You know you have a superior product or service, but if your customers can't find you, it doesn't matter.
                    </p>

                    <div className="bg-cream/50 p-8 rounded-3xl border-l-8 border-organic-green italic">
                        "SEO isn't about tricking Google. It's about convincing Google that you are the most authoritative, relevant answer to a user's question."
                    </div>

                    <p>
                        Most SEO agencies will promise you the world and deliver nothing but "technical audits" and "keyword research" that never actually moves the needle. They focus on vanity metrics while your revenue stays flat.
                    </p>

                    <p className="font-black text-organic-green-dark text-2xl tracking-tight">
                        We do things differently.
                    </p>

                    <p>
                        At <span className="font-black text-organic-green">Rank Organically</span>, we focus on the only two things that actually matter for ranking in 2026: <strong>High-Authority Backlinks</strong> and <strong>Expert Content Strategy</strong>.
                    </p>

                    <ul className="space-y-4 list-none pl-0">
                        {[
                            "Managed SEO Campaigns that run on autopilot.",
                            "Bespoke Link Building from real, high-traffic websites.",
                            "Content that doesn't just rank, but actually converts visitors into customers.",
                            "Transparent reporting that shows you exactly where your money is going."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1.5 w-5 h-5 rounded-full bg-organic-green flex items-center justify-center shrink-0">
                                    <Search className="w-3 h-3 text-white" />
                                </div>
                                <span className="font-bold text-gray-800">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <p>
                        We don't take on every client. We only work with businesses we know we can help dominate their niche. If you're ready to stop guessing and start seeing real, organic growth, let's talk.
                    </p>

                    <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2">
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">To your success,</p>
                            <p className="text-3xl font-black text-organic-green-dark italic tracking-tighter">The Rank Organically Team</p>
                        </div>
                        
                        <a 
                            href="https://rankorganically.blogspot.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-12 py-6 rounded-3xl bg-organic-green text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl hover:shadow-organic-green/40 active:scale-95 group/btn"
                        >
                            Start Your Campaign
                            <Search className="w-5 h-5 ml-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const AffiliateLogo: FC<{ affiliate: { name: string, domain: string } }> = ({ affiliate }) => {
    // Generative logic to create a unique logo for each affiliate based on their name
    const getHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const seed = getHash(affiliate.name);
    
    // Warm Organic Palettes from Recipe 6
    const palettes = [
        { bg: '#f5f5f0', ink: '#5A5A40', accent: '#8A9A5B' }, // Olive / Sage
        { bg: '#fdfcf0', ink: '#7B3F00', accent: '#C19A6B' }, // Earth / Clay
        { bg: '#f0f4f0', ink: '#2D4B2D', accent: '#4A5D23' }, // Forest / Moss
        { bg: '#fffaf0', ink: '#8B4513', accent: '#D2B48C' }, // Wood / Tan
        { bg: '#f0f4f8', ink: '#1A365D', accent: '#4A5568' }, // Slate / Navy
    ];
    
    const palette = palettes[seed % palettes.length];
    
    // Abstract Organic Shapes (Blobs)
    const blobs = [
        "M30,-30C40,-20,50,-10,50,0C50,10,40,20,30,30C20,40,10,50,0,50C-10,50,-20,40,-30,30C-40,20,-50,10,-50,0C-50,-10,-40,-20,-30,-30C-20,-40,-10,-50,0,-50C10,-50,20,-40,30,-30Z",
        "M35,-35C45,-25,55,-15,55,0C55,15,45,25,35,35C25,45,15,55,0,55C-15,55,-25,45,-35,35C-45,25,-55,15,-55,0C-55,-15,-45,-25,-35,-35C-25,-45,-15,-55,0,-55C15,-55,25,-45,35,-35Z",
        "M25,-40C35,-30,45,-20,45,0C45,20,35,30,25,40C15,50,5,60,0,60C-5,60,-15,50,-25,40C-35,30,-45,20,-45,0C-45,-20,-35,-30,-25,-40C-15,-50,-5,-60,0,-60C5,-60,15,-50,25,-40Z",
    ];
    
    const blob = blobs[seed % blobs.length];
    const rotation = (seed % 360);
    const initial = affiliate.name.charAt(0).toUpperCase();

    return (
        <div 
            className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-xl"
            style={{ backgroundColor: palette.bg }}
        >
            {/* Background Blob */}
            <svg viewBox="-60 -60 120 120" className="absolute w-[120%] h-[120%] opacity-20" style={{ transform: `rotate(${rotation}deg)` }}>
                <path d={blob} fill={palette.accent} />
            </svg>
            
            {/* Central Brand Mark */}
            <div className="relative z-10 flex flex-col items-center">
                <span className="text-3xl font-black italic tracking-tighter" style={{ color: palette.ink }}>
                    {initial}
                </span>
                <div className="h-0.5 w-4 mt-0.5" style={{ backgroundColor: palette.accent }}></div>
            </div>
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
        </div>
    );
};

const ShopOurAffiliates: FC = () => {
    const affiliates = [
        { name: "American Hemp Oil", desc: "Sourcing sustainable, full-spectrum hemp products to promote well-being and natural health.", link: "https://wild.link/americanhempoil/ALzC-wI", domain: "americanhempoil.com" },
        { name: "Appalachian Organics", desc: "A leader in certified organic food products, Appalachian Organics delivers fresh, clean, and healthy goods from farm to table.", link: "https://wild.link/aporganics/AO7D-wI", domain: "aporganics.com" },
        { name: "Be Natural Organics", desc: "Offering a range of organic skincare solutions, Be Natural Organics uses plant-based ingredients to nourish the skin naturally.", link: "http://www.shareasale.com/r.cfm?B=627043&U=688687&M=54202&urllink=", domain: "benaturalorganics.com" },
        { name: "Beaumont Organic", desc: "Pioneering ethical fashion, Beaumont Organic creates stylish, sustainable clothing from eco-friendly and organic fabrics.", link: "http://beaumont-o.myshopify.com/?rfsn=791323.79b154", domain: "beaumontorganic.com" },
        { name: "Bella Vita Organics", desc: "Dedicated to providing high-quality organic lifestyle products, Bella Vita Organics promotes a holistic approach to wellness.", link: "https://wild.link/bellavitaorganic/AMu--wI", domain: "bellavitaorganic.com" },
        { name: "Binoid", desc: "Binoid offers a variety of vegan-friendly CBD and hemp-derived products, all tested for purity and potency.", link: "https://www.binoidcbd.com/?ref=7iNjXKWW", domain: "binoidcbd.com" },
        { name: "Braga Organic Farms", desc: "Braga Organic Farms cultivates certified organic produce with a focus on sustainable agricultural practices.", link: "https://shareasale.com/r.cfm?b=245074&u=688687&m=28490&urllink=&afftrack=", domain: "bragaorganicfarms.com" },
        { name: "Canada Grow Supplies", desc: "Canada Grow Supplies provides a wide range of organic and vegan-friendly gardening and growing products.", link: "https://wild.link/canadagrowsupplies/AOjC-wI", domain: "canadagrowsupplies.com" },
        { name: "CannaHemp", desc: "Focusing on hemp-based wellness, CannaHemp offers ethical and clean products for natural relief and balance.", link: "https://wild.link/cannahemp/AMfC-wI", domain: "cannahemp.com" },
        { name: "Doorstep Organics", desc: "Making certified organic groceries accessible, Doorstep Organics delivers fresh, seasonal produce and pantry staples directly to your home.", link: "https://wild.link/doorsteporganics/APnD-wI", domain: "doorsteporganics.com.au" },
        { name: "Dr Lily Ros Organics", desc: "Dr. Lily Ros Organics specializes in natural and organic personal care products.", link: "https://wild.link/drlilyros/APrD-wI", domain: "drlilyros.com" },
        { name: "Earth Elements Organics", desc: "Providing a curated selection of home and wellness goods, Earth Elements Organics focuses on products that are both beautiful and beneficial.", link: "https://wild.link/earthelementsorganics/APzD-wI", domain: "earthelementsorganics.com" },
        { name: "EcoFlow", desc: "EcoFlow is a leader in portable power solutions and renewable energy.", link: "https://www.shareasale.com/r.cfm?b=1537905&u=688687&m=97298", domain: "ecoflow.com" },
        { name: "Epic Water Filters", desc: "Epic Water Filters offers a sustainable alternative to single-use plastic bottles.", link: "https://wild.link/epicwaterfilters/AJjn-wI", domain: "epicwaterfilters.com" },
        { name: "Free The Ocean", desc: "Every click on their website helps fund the removal of plastic from the ocean.", link: "https://www.shareasale.com/r.cfm?b=1734893&u=688687&m=108076", domain: "freetheocean.com" },
        { name: "Gear Hugger", desc: "Gear Hugger creates biodegradable lubricants and cleaning products for a wide range of applications.", link: "https://www.shareasale.com/r.cfm?b=1916895&u=688687&m=119276", domain: "gearhugger.com" },
        { name: "Georganics", desc: "A leader in plastic-free oral care, Georganics offers a full range of zero-waste dental products.", link: "https://wild.link/georganics/AIPE-wI", domain: "georganics.com" },
        { name: "GoSUN Stove", desc: "GoSUN Stove revolutionizes cooking with solar-powered technology.", link: "https://shareasale.com/r.cfm?b=576342&u=688687&m=52143&urllink=&afftrack=", domain: "gosun.co" },
        { name: "Green Goddess Supplies", desc: "Green Goddess Supplies offers high-quality, organic, and ethically sourced goods for a natural lifestyle.", link: "https://www.shareasale.com/r.cfm?b=893212&u=688687&m=67002", domain: "greengoddesssupplies.com" },
    ];

    return (
        <section className="container mx-auto px-6 py-32 max-w-6xl">
            <div className="text-center mb-20 space-y-4">
                <span className="text-xs font-black text-organic-green uppercase tracking-[0.4em] opacity-60">Curated Partnerships</span>
                <h2 className="text-5xl md:text-7xl font-black text-organic-green-dark tracking-tighter leading-none uppercase">Shop Our Affiliates</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto leading-loose">
                    Our Trusted Partners: Innovating for a Sustainable Future. We believe in partnering with the best to bring you transparency and authenticity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {affiliates.map((affiliate, idx) => (
                    <a 
                        key={idx}
                        href={affiliate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-organic-green transition-all duration-500 flex flex-col h-full active:scale-[0.98]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center p-3 group-hover:bg-white transition-colors duration-500 overflow-hidden border border-transparent group-hover:border-organic-green/10">
                                <AffiliateLogo affiliate={affiliate} />
                            </div>
                            <div className="px-3 py-1 rounded-full bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:bg-organic-green/10 group-hover:text-organic-green transition-colors">
                                Affiliate Partner
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-organic-green-dark mb-3 group-hover:text-organic-green transition-colors">{affiliate.name}</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 flex-grow">
                            {affiliate.desc}
                        </p>
                        <div className="flex items-center text-[9px] font-black text-organic-green uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                            Shop Now
                            <Search className="w-3.5 h-3.5 ml-2" />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

const ApiKeyModal: FC<{
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}> = ({ onClose, onSave, currentKey }) => {
  const [value, setValue] = useState(currentKey);

  const trimmed = value.trim();
  const isAiStudioKey = trimmed.startsWith("AIzaSy") || trimmed.startsWith("AIza");
  const isInvalidToken = trimmed.startsWith("AQ.") || trimmed.startsWith("ya29.");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-start justify-center z-[100] p-4 animate-in fade-in duration-300 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-8 md:p-10 animate-in zoom-in-95 duration-300 my-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900">AI Access Settings</h2>
            <p className="text-xs text-stone-500 font-bold mt-1">Configure your Google Gemini API connection</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-stone-100 rounded-2xl transition-colors"><X className="w-6 h-6 text-stone-400" /></button>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest block">
              Google Gemini API Key (starts with AIzaSy)
            </label>
            <input 
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-5 py-4 rounded-2xl border-2 border-stone-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 transition-all text-sm font-mono bg-stone-50 outline-none"
            />
            
            {trimmed.length > 0 && isAiStudioKey && (
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Valid Google AI Studio key format detected.
              </p>
            )}

            {trimmed.length > 0 && isInvalidToken && (
              <p className="text-[11px] font-bold text-amber-700 flex items-center gap-1.5 pt-1 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Tokens starting with "AQ." or "ya29." are internal/OAuth credentials, not Gemini API keys. Please copy an API key from Google AI Studio.
              </p>
            )}

            <p className="text-[11px] text-stone-500 pt-1">
              Need a free key? Generate one at{" "}
              <a 
                href="https://aistudio.google.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-0.5"
              >
                aistudio.google.com/api-keys
                <ExternalLink className="w-3 h-3 ml-0.5 inline" />
              </a>
            </p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60">
             <p className="text-[11px] font-bold text-emerald-950 leading-relaxed">
               ✨ The platform runs built-in certified organic catalogs and algorithms by default. Supplying your personal Gemini key unlocks live web grounding and continuous AI synthesis.
             </p>
          </div>

          <div className="flex gap-3 pt-2">
            {currentKey && (
              <button 
                onClick={() => {
                  setValue('');
                  onSave('');
                }}
                className="px-4 py-4 rounded-2xl border border-stone-300 text-stone-700 font-black text-xs uppercase tracking-wider hover:bg-stone-100 transition-all"
              >
                Clear
              </button>
            )}
            <button 
              onClick={() => onSave(value)}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg text-xs uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4" />
              Save Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('search');
  const [menuFilter, setMenuFilter] = useState<'all' | 'core' | 'farms' | 'verification' | 'business' | 'resources'>('all');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  useEffect(() => {
    const handleSwitchTab = (e: any) => {
        if (e.detail) {
            setCurrentTab(e.detail as TabType);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    window.addEventListener('switch-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-tab', handleSwitchTab);
  }, []);
  const { user, profile, privateSettings, isPrivateSettingsModalOpen, openPrivateSettingsModal, closePrivateSettingsModal } = useAuth();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLabel, setLocationLabel] = useState<string>('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'error' | 'success'>('idle');
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [veganAlternatives, setVeganAlternatives] = useState<VeganAlternative[]>([]);
  const [isNonVeganSearch, setIsNonVeganSearch] = useState(false);
  const [nonVeganReason, setNonVeganReason] = useState('');
  const [memory, setMemory] = useState<any[]>([]);
  const [directoryResult, setDirectoryResult] = useState<TieredDirectory | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState({
    minPurity: 0,
    showOnlyLocal: false,
    showOnlyOfficial: false,
    sortByPrice: 'none' as 'none' | 'asc' | 'desc'
  });

  const parsePrice = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numeric) ? Infinity : numeric;
  };

  const filteredProducts = searchResults
    .filter(p => p.purity >= filter.minPurity)
    .filter(p => !filter.showOnlyLocal || p.isLocal)
    .filter(p => !filter.showOnlyOfficial || !!p.isOfficial)
    .sort((a, b) => {
        if (filter.sortByPrice === 'asc') return parsePrice(a.price) - parsePrice(b.price);
        if (filter.sortByPrice === 'desc') return parsePrice(b.price) - parsePrice(a.price);
        return 0;
    });
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [localSearchEnabled, setLocalSearchEnabled] = useState(true);
  const [showApiModal, setShowApiModal] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isOsintModalOpen, setIsOsintModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getSearchMemory(user.uid).then(data => {
        if (data) setMemory(data);
      });
    } else {
      setMemory([]);
    }
  }, [user]);

  const toggleLocalSearch = () => setLocalSearchEnabled(!localSearchEnabled);


  useEffect(() => {
    localStorage.setItem('gemini_api_key', geminiApiKey);
  }, [geminiApiKey]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
        setLocationErrorMsg("GPS NOT SUPPORTED");
        setLocationStatus('error');
        return;
    }
    
    setLocationStatus('locating');
    setLocationErrorMsg(null);
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            setLocationLabel('NEARBY SEARCH ACTIVE');
            setLocationStatus('success');
            setLocationErrorMsg(null);
        },
        (err) => {
            console.warn("Location error:", err);
            let msg = "GPS ACCESS DENIED";
            if (err.code === 1) msg = "GPS BLOCKED IN SETTINGS";
            if (err.code === 2) msg = "SIGNAL LOST";
            if (err.code === 3) msg = "REQUEST TIMEOUT";
            
            setLocationErrorMsg(msg);
            setLocationStatus('error');
            setUserLocation(null);
        },
        options
    );
  }, []);

  useEffect(() => {
    // Attempt to get location automatically on load
    requestLocation();

    // Monitor for permission changes if supported
    if ('permissions' in navigator && typeof navigator.permissions?.query === 'function') {
        try {
            navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
                const handlePermissionChange = () => {
                    if (result.state === 'granted') {
                        requestLocation();
                    } else if (result.state === 'denied') {
                        setLocationStatus('error');
                        setLocationErrorMsg("GPS ACCESS BLOCKED");
                    }
                };
                result.addEventListener('change', handlePermissionChange);
            }).catch((e) => {
                console.warn("Geolocation permissions query notice:", e);
            });
        } catch (e) {
            console.warn("Permissions query catch:", e);
        }
    }
  }, [requestLocation]);

  const handleManualLocationSet = async (lat: number, lng: number, label: string) => {
      setUserLocation({ latitude: lat, longitude: lng });
      setLocationLabel(label.toUpperCase());
      setShowManualLocation(false);
      setLocationStatus('success');
      setLocationErrorMsg(null);
  };

  const handleGPSRequest = () => {
      requestLocation();
  };

  // Close modal on success
  useEffect(() => {
      if (locationStatus === 'success' && showManualLocation) {
          setShowManualLocation(false);
      }
  }, [locationStatus, showManualLocation]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setGlobalError(null);
    setInitialSearchDone(true);
    setSearchQuery(query);
    setSearchResults([]);
    setVeganAlternatives([]);
    setIsNonVeganSearch(false);
    setNonVeganReason('');
    setDirectoryResult(null);

    try {
      const lowerQuery = query.toLowerCase().trim();
      const isExplicitDirectory = 
        lowerQuery.startsWith("directory") || 
        lowerQuery.startsWith("farms in") || 
        lowerQuery.includes("organic directory") || 
        lowerQuery.includes("business directory");

      if (isExplicitDirectory) {
        try {
          const dir = await getOrganicDirectory(query, localSearchEnabled ? userLocation : null, geminiApiKey);
          if (dir && (dir.tier1?.length > 0 || dir.tier2?.length > 0 || dir.tier3?.length > 0)) {
            setDirectoryResult(dir);
            setIsLoading(false);
            return;
          }
        } catch (dirErr) {
          console.warn("Directory fetch failed, falling back to product search:", dirErr);
        }
      }

      const activeAllergens = [
        ...(privateSettings?.allergies || []),
        ...(privateSettings?.customAllergens || [])
      ];

      const response = await searchOrganicProducts(
        query, 
        localSearchEnabled ? userLocation : null, 
        geminiApiKey,
        {
          userAllergies: activeAllergens,
          isVeganUser: privateSettings?.isVegan ?? false
        }
      );
      setSearchResults(response.products || []);
      setGroundingSources(response.sources || []);
      setVeganAlternatives(response.veganAlternatives || []);
      setIsNonVeganSearch(response.isNonVeganSearch || false);
      setNonVeganReason(response.nonVeganReason || '');

      if (user) {
        await saveSearchToMemory(user.uid, query, (response.products || []).length);
        const updatedMemory = await getSearchMemory(user.uid);
        if (updatedMemory) setMemory(updatedMemory);
      }
    } catch (err: any) {
      const errorMsg = err instanceof Error ? err.message : "Search request failed";
      setGlobalError(errorMsg);
      setSearchResults([]);
      setVeganAlternatives([]);
      if (errorMsg.toLowerCase().includes("api key") || errorMsg.toLowerCase().includes("missing or invalid")) {
        setShowApiModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userLocation, localSearchEnabled, geminiApiKey, user, privateSettings]);

  useEffect(() => {
    const handleRerunSearch = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        setCurrentTab('search');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        handleSearch(e.detail);
      }
    };
    window.addEventListener('rerun-search', handleRerunSearch);
    return () => window.removeEventListener('rerun-search', handleRerunSearch);
  }, [handleSearch]);

  const exportSearchResultsPDF = (products: Product[]) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Organic Search Results", 14, 22);
    doc.setFontSize(11);
    doc.text("Generated by SearchForOrganics.com", 14, 30);
    
    const tableData = products.map(p => [
      p.name,
      p.vendor,
      p.price,
      p.purity + "%",
      p.certifications.join(", ")
    ]);

    (doc as any).autoTable({
      startY: 40,
      head: [['Product', 'Vendor', 'Price', 'Purity', 'Certifications']],
      body: tableData,
    });

    doc.save(`Search_Results_${new Date().getTime()}.pdf`);
  };

  const exportSearchResultsHTML = (products: Product[]) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Organic Search Results - SearchForOrganics.com</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 1000px; margin: 0 auto; padding: 40px; }
          h1 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
          th { background-color: #f9fafb; font-weight: bold; }
          .purity { color: #059669; font-weight: bold; }
          .footer { margin-top: 60px; font-size: 0.8em; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Organic Search Results</h1>
        <p>Found ${products.length} verified organic sources.</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Purity</th>
              <th>Certifications</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.vendor}</td>
                <td>${p.price}</td>
                <td class="purity">${p.purity}%</td>
                <td>${p.certifications.join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          &copy; ${new Date().getFullYear()} SearchForOrganics.com - Purity in Search.
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Search_Results_${new Date().getTime()}.html`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-cream text-gray-800 font-sans selection:bg-organic-green/20 pb-24">
      {/* Top Utility Nav */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-2">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center max-w-6xl">
          <div className="flex items-center gap-4">
            <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Landry Industries presents</span>
          </div>
          <div className="flex justify-center relative col-span-1 md:col-start-2">
            <button 
                id="main-nav-dropdown-btn"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-emerald-50 bg-white border border-gray-200 hover:border-emerald-500 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-700 hover:text-emerald-700 transition-all shadow-xs active:scale-95"
            >
                <Leaf className="w-3.5 h-3.5 text-organic-green" />
                <span>Menu</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform text-gray-500", showDropdown && "rotate-180")} />
            </button>
            <AnimatePresence>
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs" onClick={() => setShowDropdown(false)} />
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-10 w-[94vw] max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 md:p-6 z-50 max-h-[85vh] overflow-y-auto"
                        >
                            {/* Search Filter Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Leaf className="w-4 h-4 text-emerald-600" />
                                        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-gray-900">Platform Navigation Menu</h3>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Explore certified tools, reports, and governance</p>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={moduleSearchQuery}
                                        onChange={(e) => setModuleSearchQuery(e.target.value)}
                                        placeholder="Filter menu items..." 
                                        className="w-full sm:w-56 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold uppercase tracking-wider focus:outline-none focus:border-organic-green"
                                    />
                                    {moduleSearchQuery && (
                                        <button 
                                            onClick={() => setModuleSearchQuery('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* All Platform Modules */}
                            <div className="mb-6">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">All Platform Modules ({TABS.length})</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {TABS.filter(tab => 
                                        tab.label.toLowerCase().includes(moduleSearchQuery.toLowerCase()) || 
                                        tab.id.toLowerCase().includes(moduleSearchQuery.toLowerCase())
                                    ).map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setCurrentTab(tab.id);
                                                setShowDropdown(false);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={cn(
                                                "p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 group",
                                                currentTab === tab.id 
                                                    ? "bg-organic-green text-white border-organic-green shadow-xs font-black" 
                                                    : "bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border-gray-100 hover:border-emerald-200"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                                                currentTab === tab.id ? "bg-white/20 text-white" : "bg-white text-emerald-600 border border-gray-100 group-hover:bg-emerald-600 group-hover:text-white"
                                            )}>
                                                <tab.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider truncate flex-1">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Company & Compliance Links */}
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Company & Governance</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {COMPLIANCE_LINKS.filter(link => 
                                        link.label.toLowerCase().includes(moduleSearchQuery.toLowerCase()) || 
                                        link.id.toLowerCase().includes(moduleSearchQuery.toLowerCase())
                                    ).map(link => (
                                        <button
                                            key={link.id}
                                            onClick={() => {
                                                setCurrentTab(link.id);
                                                setShowDropdown(false);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all",
                                                currentTab === link.id
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700"
                                            )}
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
          </div>
          <div className="flex justify-end">
            {/* Space reserved for floating logo */}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 md:py-20 max-w-6xl">
        <header className="text-center mb-4 md:mb-6 space-y-3 md:space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex flex-col items-center space-y-3">
              <div className="flex justify-between items-start w-full max-w-4xl px-4">
                <div className="w-12 h-12 invisible" /> {/* Spacer */}
                <div className="relative group">
                  <div className="absolute -inset-6 bg-organic-green/5 rounded-full blur-2xl group-hover:bg-organic-green/10 transition-all duration-700"></div>
                  <Logo className="w-28 h-28 md:w-36 md:h-36 relative z-10" />
                </div>
                <UserMenu />
              </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-organic-green-dark tracking-tighter leading-none">Search For Organics</h1>
          <p className="text-xs md:text-base text-organic-green font-black max-w-2xl mx-auto uppercase tracking-widest opacity-80 mb-6">Certified Organic Search Engine</p>

          {/* Global Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
              <SearchBar 
                  query={searchQuery} 
                  setQuery={setSearchQuery} 
                  onSearch={handleSearch} 
                  isLoading={isLoading} 
                  locationActive={localSearchEnabled && !!userLocation}
                  onOpenSettings={() => setShowManualLocation(true)}
                  onOpenApiSettings={() => setShowApiModal(true)}
                  onOpenDietarySettings={openPrivateSettingsModal}
                  isVeganUser={privateSettings?.isVegan}
                  allergyCount={(privateSettings?.allergies?.length || 0) + (privateSettings?.customAllergens?.length || 0)}
                  apiKeyActive={!!geminiApiKey}
                  localSearchEnabled={localSearchEnabled}
                  onToggleLocalSearch={toggleLocalSearch}
                  locationLabel={locationLabel}
                  locationStatus={locationStatus}
                  locationErrorMsg={locationErrorMsg}
              />

              {/* Search Global Error Banner */}
              {globalError && (
                <div className="mt-4 p-4 bg-amber-50/90 border-2 border-amber-200 rounded-2xl max-w-2xl mx-auto text-left shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-wide text-amber-900">Search Notice</p>
                    <p className="text-xs text-amber-800 mt-0.5">{globalError}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleSearch(searchQuery || 'Organic')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                    >
                      Retry
                    </button>
                    <button
                      onClick={() => setShowApiModal(true)}
                      className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                    >
                      API Key
                    </button>
                  </div>
                </div>
              )}


          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/50 border border-organic-green/10 text-[9px] font-black text-organic-green uppercase tracking-widest shadow-sm">
              Powered by Google
            </span>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a 
                href="https://discord.gg/sQgy7kktS2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100 hover:border-indigo-200 text-[9px] font-bold uppercase tracking-wider text-indigo-600 transition-all shadow-sm hover:shadow active:scale-95"
                title="Join our Discord Server"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Discord</span>
              </a>
              <a 
                href="https://groups.google.com/g/search-for-organics" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 text-[9px] font-bold uppercase tracking-wider text-emerald-700 transition-all shadow-sm hover:shadow active:scale-95"
                title="Subscribe to Google Group mailing list"
              >
                <Mail className="w-3 h-3" />
                <span>Google Group</span>
              </a>
              <a 
                href="https://www.facebook.com/share/g/19n1cCpKhp/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50/60 hover:bg-sky-50 border border-sky-100 hover:border-sky-200 text-[9px] font-bold uppercase tracking-wider text-sky-600 transition-all shadow-sm hover:shadow active:scale-95"
                title="Join our Facebook Group"
              >
                <Users className="w-3 h-3" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.linkedin.com/groups/13054615" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/60 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 text-[9px] font-bold uppercase tracking-wider text-blue-700 transition-all shadow-sm hover:shadow active:scale-95"
                title="Join our LinkedIn Professional Guild"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/MLSpyShop/Search-For-Organics" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50/60 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-[9px] font-bold uppercase tracking-wider text-slate-700 transition-all shadow-sm hover:shadow active:scale-95"
                title="View on GitHub"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.901-.014 3.293 0 .32.217.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>





        {/* Tab Content */}
        <div className="min-h-[60vh]">
            {currentTab === 'search' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    {/* Active Loading State */}
                    {isLoading && (
                        <div className="p-12 text-center bg-white/70 backdrop-blur-sm rounded-[3rem] border border-emerald-100 shadow-sm max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
                            <div className="inline-flex p-4 bg-emerald-50 rounded-3xl text-organic-green animate-bounce">
                                <Search className="w-8 h-8 animate-spin" />
                            </div>
                            <h3 className="text-xl font-black text-organic-green-dark uppercase tracking-tight">
                                Searching Certified Organic Database...
                            </h3>
                            <p className="text-xs text-gray-500 font-medium max-w-md mx-auto">
                                Querying organic certificates, regional co-ops, and Google Search Grounding for "{searchQuery}".
                            </p>
                        </div>
                    )}

                    {/* Empty Search Results After Search */}
                    {initialSearchDone && !isLoading && searchResults.length === 0 && !directoryResult && !globalError && (
                        <div className="p-12 text-center bg-white/70 backdrop-blur-sm rounded-[3rem] border border-stone-200 shadow-sm max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
                            <div className="inline-flex p-4 bg-stone-100 rounded-3xl text-stone-600">
                                <Search className="w-8 h-8 text-stone-400" />
                            </div>
                            <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight">
                                No Verified Results for "{searchQuery}"
                            </h3>
                            <p className="text-xs text-stone-600 font-medium max-w-md mx-auto">
                                Try searching for specific items, certified brands, or explore our popular organic categories:
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {['Organic Honey', 'Pasture-Raised Eggs', 'Raw Milk', 'Demeter Olive Oil', 'Heirloom Seeds'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleSearch(tag)}
                                        className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {searchResults.length === 0 && !directoryResult && !isLoading && !initialSearchDone && (
                        <>
                            <FeaturedOrganicInsight />
                            {/* Memory Section */}
                            {user && memory.length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-16 p-8 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-gray-100 shadow-sm"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                  <div className="flex items-center gap-4">
                                    <div className="p-3 bg-organic-green text-white rounded-2xl shadow-lg shadow-organic-green/20">
                                      <Database className="w-6 h-6" />
                                    </div>
                                    <div>
                                      <h3 className="text-2xl font-black tracking-tighter uppercase text-organic-green-dark">Molecular Memory</h3>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recall your certified organic history</p>
                                    </div>
                                  </div>
                                  <div className="h-px flex-1 bg-gray-100 hidden md:block mx-8" />
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Cloud Persistent Index</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                  {memory.map((item: any) => (
                                    <button
                                      key={item.id}
                                      onClick={() => handleSearch(item.query)}
                                      className="group p-5 bg-white border-2 border-gray-50 rounded-[2rem] hover:border-organic-green hover:shadow-xl hover:shadow-organic-green/5 transition-all text-left relative overflow-hidden"
                                    >
                                      <div className="absolute top-0 right-0 w-16 h-16 bg-organic-green/5 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:bg-organic-green/10 transition-colors" />
                                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-2">
                                        {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}
                                      </p>
                                      <p className="text-sm font-black text-black group-hover:text-organic-green line-clamp-1 break-all mb-3 pr-4 relative z-10">
                                        {item.query}
                                      </p>
                                      <div className="flex items-center gap-2 text-[8px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 group-hover:bg-organic-green/5 px-2 py-1 rounded-lg w-fit transition-colors">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-organic-green" />
                                        <span>{item.resultsCount} Verified</span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                        </>
                    )}

                    {directoryResult && !isLoading && (
                        <OrganicDirectory directory={directoryResult} />
                    )}

                     {searchResults.length > 0 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                                <div>
                                    <h2 className="text-3xl font-black text-organic-green-dark tracking-tighter uppercase">Market Results</h2>
                                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mt-1">Found {searchResults.length} verified organic sources</p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => exportSearchResultsPDF(filteredProducts)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-organic-green hover:text-organic-green transition-all shadow-sm"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Export PDF
                                    </button>
                                    <button 
                                        onClick={() => exportSearchResultsHTML(filteredProducts)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-organic-green hover:text-organic-green transition-all shadow-sm"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Export HTML
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onClick={() => setSelectedProduct(product)} 
                                    />
                                ))}
                            </div>

                            {/* 3 Vegan Alternatives Section for Non-Vegan Search (Placed after organic search results) */}
                            {veganAlternatives.length > 0 && (
                                <VeganAlternativesSection 
                                    alternatives={veganAlternatives}
                                    query={searchQuery}
                                    isNonVeganSearch={isNonVeganSearch}
                                    nonVeganReason={nonVeganReason}
                                    onSearchAlternative={(altName) => handleSearch(altName)}
                                />
                            )}

                            {groundingSources.length > 0 && (
                                <div className="mt-16 p-10 bg-white rounded-[3rem] border border-gray-50 shadow-xl space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-gray-100 flex-1"></div>
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] px-4">Research Grounding Sources</h3>
                                        <div className="h-px bg-gray-100 flex-1"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {groundingSources.map((source, i) => (
                                            <a 
                                                key={i} 
                                                href={source.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="group p-5 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-organic-green/20 transition-all flex items-start gap-4 shadow-sm hover:shadow-lg"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-organic-green group-hover:text-white transition-colors flex-shrink-0">
                                                    {source.type === 'maps' ? <MapPin className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{source.type}</p>
                                                    <p className="text-xs font-black text-gray-800 line-clamp-2 leading-snug group-hover:text-organic-green transition-colors">{source.title}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            )}

            {currentTab === 'stateOfOrganics' && (
                <div className="max-w-4xl mx-auto py-8">
                    <OsintReportModal isOpen={true} onClose={() => setCurrentTab('search')} apiKey={geminiApiKey} />
                </div>
            )}
            {currentTab === 'community' && <CommunityHub />}
            {currentTab === 'scanner' && <Scanner apiKey={geminiApiKey} />}
            {currentTab === 'basket' && <BasketOptimizer />}
            {currentTab === 'microbiome' && <MicrobiomeInsights />}
            {currentTab === 'usda' && <USDAIntegritySync />}
            {currentTab === 'csa' && <CSAPortal />}
            {currentTab === 'carbon' && <CarbonCreditEstimator />}
            {currentTab === 'wholesale' && <WholesaleB2B />}
            {currentTab === 'swap' && <ProduceSwap />}
            {currentTab === 'tips' && <OrganicTips onNavigateTab={(tab) => { setCurrentTab(tab as TabType); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {currentTab === 'devApi' && <DeveloperApi />}
            {currentTab === 'audit' && <BusinessAudit apiKey={geminiApiKey} />}
            {currentTab === 'calc' && <EcoCalc apiKey={geminiApiKey} />}
            {currentTab === 'workshops' && <MarketingPlan apiKey={geminiApiKey} />}
            {currentTab === 'route' && <FarmRoute apiKey={geminiApiKey} userLocation={userLocation} />}
            {currentTab === 'businessPlan' && <OrganicBusinessPlan apiKey={geminiApiKey} />}
            {currentTab === 'marketingKit' && <MarketingKitGenerator apiKey={geminiApiKey} />}
            {currentTab === 'seoReport' && <SEOReportGenerator apiKey={geminiApiKey} />}
            {currentTab === 'intelligence' && <Intelligence apiKey={geminiApiKey} />}
            {currentTab === 'privacy' && <PrivacyPolicy />}
            {currentTab === 'ownership' && <OwnershipInfo />}
            {currentTab === 'sales' && <SalesPage />}
            {currentTab === 'affiliate' && <AffiliateDisclosure />}
            {currentTab === 'terms' && <TermsOfService />}
            {currentTab === 'sitemap' && <Sitemap onNavigate={(tab) => { setCurrentTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {currentTab === 'about' && <AboutPage />}
            {currentTab === 'contact' && <ContactPage />}
            {currentTab === 'certification' && <CertificationPage />}
            {currentTab === 'partnership' && <PartnershipPage />}
            {currentTab === 'info' && <WhatIsOrganic />}
            {currentTab === 'faq' && <FAQ />}
            {currentTab === 'chat' && (
                <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden min-h-[70vh] flex flex-col">
                    <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-emerald-500">
                                <span className="font-bold">OB</span>
                            </div>
                            <div>
                                <h3 className="font-bold">Organic Bob</h3>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none">Senior Organic Expert</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-emerald-800/50 rounded-full text-[10px] font-bold border border-emerald-700">
                            Active
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <BobAssistant apiKey={geminiApiKey} onOpenApiSettings={() => setShowApiModal(true)} isEmbedded={true} />
                    </div>
                </div>
            )}
        </div>
      </main>

      {/* Global Instant Barcode & NOP Scanner Modal */}
      <BarcodeScannerModal 
        isOpen={isBarcodeModalOpen} 
        onClose={() => setIsBarcodeModalOpen(false)}
        onSelectAlternative={(alt) => {
          setIsBarcodeModalOpen(false);
          handleSearch(alt);
        }}
      />

      {/* Global Live OSINT "State of Organics in 2026" Intelligence Report Modal */}
      <OsintReportModal 
        isOpen={isOsintModalOpen} 
        onClose={() => setIsOsintModalOpen(false)} 
        apiKey={geminiApiKey} 
      />

      {/* Global Community User Profile & Edit Modal */}
      <UserProfileModal />

      {/* Global Private Dietary & Allergy Settings Modal */}
      <DietarySettingsModal 
        isOpen={isPrivateSettingsModalOpen} 
        onClose={closePrivateSettingsModal} 
      />

      {showManualLocation && (
          <LocationSettingsModal 
            onClose={() => setShowManualLocation(false)} 
            onSet={handleManualLocationSet} 
            onRequestGPS={handleGPSRequest}
            locationStatus={locationStatus}
            locationActive={localSearchEnabled && !!userLocation}
            localSearchEnabled={localSearchEnabled}
            onToggleLocalSearch={toggleLocalSearch}
            apiKey={geminiApiKey}
          />
      )}

      {showApiModal && (
          <ApiKeyModal 
            onClose={() => setShowApiModal(false)}
            onSave={(key) => {
              const clean = key ? key.trim() : '';
              if (clean) {
                localStorage.setItem('gemini_api_key', clean);
                setGeminiApiKey(clean);
              } else {
                localStorage.removeItem('gemini_api_key');
                setGeminiApiKey('');
              }
              setShowApiModal(false);
            }}
            currentKey={geminiApiKey}
          />
      )}

      {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
      )}

      {currentTab !== 'chat' && (
        <BobAssistant 
          apiKey={geminiApiKey} 
          onOpenApiSettings={() => setShowApiModal(true)} 
        />
      )}

      <section className="container mx-auto px-6 py-32 max-w-4xl border-t border-organic-green/5 mt-24">
        <div className="space-y-12 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-xs font-black text-organic-green uppercase tracking-[0.4em] opacity-60">A Message from Search For Organics</span>
            <h2 className="text-5xl md:text-7xl font-black text-organic-green-dark tracking-tighter leading-none">The Truth About What You Put In Your Body.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed text-gray-600 font-medium">
            <div className="space-y-6">
              <p>
                In a world of "natural" labels and clever marketing, the word <span className="text-organic-green-dark font-black italic">Organic</span> has been diluted. Big corporations spend millions to make you believe their products are pure, while hiding behind vague terminology and self-regulated standards.
              </p>
              <p>
                But your health isn't a marketing budget. It's the foundation of your life. You deserve to know exactly where your food comes from, how it was grown, and whether it truly meets the rigorous standards of <span className="text-organic-green-dark font-black">USDA</span>, <span className="text-organic-green-dark font-black">EU Organic</span>, or <span className="text-organic-green-dark font-black">GOTS</span> certification.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                That's why we built <span className="text-organic-green-dark font-black">Search For Organics</span>. We don't just search the web; we filter for truth. Our engine is grounded in official certification data, prioritizing purity, locality, and transparency above all else.
              </p>
              <p>
                Stop guessing. Start knowing. Join a global community of conscious consumers who refuse to settle for anything less than absolute purity. Your body is a temple—don't let marketing speak be the architect.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-4 rounded-full bg-organic-green-dark text-white text-sm font-black uppercase tracking-widest hover:bg-organic-green transition-all shadow-xl hover:shadow-organic-green/20 active:scale-95"
                >
                  start your local certified organic search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RankOrganicallyBanner />
      <Guide />

      <RankOrganicallySalesLetter />

      <ShopOurAffiliates />

      <OrganicCertifications />

      <OrganicOrganizations />

      <OrganicCommunityGroups />

      <OrganicManifesto />

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-32 py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <Logo className="scale-75 origin-left" />
                        <p className="text-gray-500 max-w-sm leading-relaxed font-medium italic text-lg">
                            "Democratizing organic intelligence for a cleaner, more transparent global food system. 
                            Rooted in radical truth and soil health."
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <p>Released by <a href="https://marielandryspyshop.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">marielandryspyshop.com</a></p>
                        <p>A division of <a href="https://landryindustries.ca" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">landryindustries.ca</a></p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Core Engine</h5>
                    <div className="flex flex-col gap-3">
                        {TABS.slice(0, 6).map(tab => (
                            <button key={tab.id} onClick={() => { setCurrentTab(tab.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left text-[10px] font-black text-gray-600 hover:text-emerald-600 transition-all uppercase tracking-widest">
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Legal & Governance</h5>
                    <div className="flex flex-col gap-3">
                        {COMPLIANCE_LINKS.map(link => (
                            <button key={link.id} onClick={() => { setCurrentTab(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left text-[10px] font-black text-gray-600 hover:text-emerald-600 transition-all uppercase tracking-widest">
                                {link.label}
                            </button>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-gray-50">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            © 2026 Landry Industries
                        </p>
                        <p className="mt-1 text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                            Available to 10B Inhabitants
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;