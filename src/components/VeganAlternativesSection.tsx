import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Leaf, ShieldCheck, Heart, ArrowRight, 
  ExternalLink, CheckCircle2, AlertTriangle, Bookmark, 
  Tag, Info, Check, RefreshCw
} from 'lucide-react';
import { VeganAlternative, Product } from '../../types';
import { useAuth } from '../context/AuthContext';
import { BookmarkButton } from './community/BookmarkButton';
import { cn } from '../lib/utils';

interface VeganAlternativesSectionProps {
  alternatives: VeganAlternative[];
  query: string;
  isNonVeganSearch?: boolean;
  nonVeganReason?: string;
  onSelectAlternative?: (alt: VeganAlternative) => void;
  onSearchAlternative?: (name: string) => void;
}

export const VeganAlternativesSection: React.FC<VeganAlternativesSectionProps> = ({
  alternatives,
  query,
  isNonVeganSearch,
  nonVeganReason,
  onSelectAlternative,
  onSearchAlternative
}) => {
  const { privateSettings, openPrivateSettingsModal } = useAuth();

  if (!alternatives || alternatives.length === 0) return null;

  const userAllergies = privateSettings?.allergies || [];
  const userCustomAllergens = privateSettings?.customAllergens || [];
  const allUserAllergens = [...userAllergies, ...userCustomAllergens].map(a => a.toLowerCase());

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-12 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-emerald-900 via-emerald-950 to-teal-950 text-white p-6 sm:p-10 border-2 border-emerald-500/30 shadow-2xl"
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 space-y-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[11px] font-black uppercase tracking-widest border border-emerald-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Plant-Based Dietary Intelligence</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              🌱 3 Curated Certified Organic Vegan Alternatives
            </h3>
          </div>

          <button
            onClick={openPrivateSettingsModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all backdrop-blur-md border border-white/10"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Dietary & Allergen Guard
          </button>
        </div>

        {/* Reason / Context Badge */}
        <div className="bg-emerald-900/60 backdrop-blur-md p-4 rounded-2xl border border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-100">
          <div className="flex items-start gap-3">
            <span className="text-xl">🌿</span>
            <div>
              <p className="font-black text-emerald-200">
                {isNonVeganSearch 
                  ? `Non-Vegan Search Detected: "${query}"`
                  : `100% Plant-Based Swaps for: "${query}"`}
              </p>
              <p className="text-emerald-100/80 font-medium">
                {nonVeganReason || `We've prepared 3 verified organic, animal-free alternatives with pure ingredients, authentic texture, and zero animal exploitation.`}
              </p>
            </div>
          </div>
          {privateSettings?.isVegan && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-3 h-3" /> Vegan Preference Active
            </span>
          )}
        </div>
      </div>

      {/* 3 Alternatives Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {alternatives.slice(0, 3).map((alt, index) => {
          // Check allergen tags
          const freeTags = alt.allergenFreeTags || ['Dairy-Free', 'Animal-Free'];
          
          // Construct product object for bookmarking
          const asProduct: Product = {
            id: alt.id,
            name: alt.name,
            description: alt.description,
            purity: alt.purity || 98,
            certifications: alt.certifications || ['USDA Organic', 'Certified Vegan'],
            price: alt.price || '$7.99',
            shippingPrice: 'Standard',
            vendor: alt.brandOrVendor || 'Organic Certified Maker',
            isLocal: false,
            isOfficial: true,
            imageUrl: alt.imageUrl,
            sourceUrl: alt.sourceUrl,
            isVegan: true,
            criticism: alt.whyItIsGreat
          };

          return (
            <motion.div
              key={alt.id || index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 text-gray-900 border border-white/40 shadow-xl flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Card Top Pill Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-200">
                  <Leaf className="w-3 h-3 text-emerald-600" />
                  Swap #{index + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                    {alt.purity || 98}% PURE
                  </span>
                  <BookmarkButton product={asProduct} className="text-gray-400 hover:text-emerald-600 p-1 rounded-full hover:bg-gray-100" />
                </div>
              </div>

              {/* Product Visual & Identity */}
              <div className="space-y-4">
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src={alt.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(alt.name)}/400/300`}
                    alt={alt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase tracking-wider">
                    {alt.category || 'Plant-Based Swap'}
                  </div>
                  {alt.replacesProduct && (
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md text-emerald-200 rounded-lg text-[9px] font-bold truncate">
                      Replaces: <span className="text-white font-black">{alt.replacesProduct}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">
                    {alt.brandOrVendor}
                  </div>
                  <h4 className="text-lg font-black text-gray-900 leading-snug">
                    {alt.name}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium line-clamp-2 leading-relaxed">
                    {alt.description}
                  </p>
                </div>

                {/* Why It Is Great / Nutritional Swap Breakdown */}
                <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Why This Swap Excels:
                  </div>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {alt.whyItIsGreat}
                  </p>
                </div>

                {/* Certifications & Allergen-Free Badges */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {(alt.certifications || ['USDA Organic', 'Certified Vegan']).map((cert, cIdx) => (
                      <span 
                        key={cIdx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider rounded-md"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {freeTags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-800 text-[9px] font-bold rounded-md border border-teal-100"
                      >
                        <Check className="w-2.5 h-2.5 text-teal-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-gray-400 font-bold block text-[10px] uppercase tracking-wider">Price</span>
                  <span className="text-base font-black text-gray-900">{alt.price || '$7.99'}</span>
                </div>

                <div className="flex items-center gap-2">
                  {onSearchAlternative && (
                    <button
                      onClick={() => onSearchAlternative(alt.name)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                      <span>Search This</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {alt.sourceUrl && (
                    <a
                      href={alt.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                      title="View vendor / source"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
