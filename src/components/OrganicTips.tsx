import React, { useState } from 'react';
import { Leaf, ShieldCheck, CheckCircle2, Search, Filter, Droplet, Sprout, Home, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  category: 'Pantry' | 'Soil & Garden' | 'Non-Toxic Home' | 'Water & PFAS' | 'Seed Sovereignty';
  impact: 'High' | 'Medium' | 'Foundational';
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  summary: string;
  actionSteps: string[];
  spymasterNote: string;
}

const ORGANIC_TIPS_DATA: Tip[] = [
  {
    id: 'tip-1',
    title: 'The Dirty Dozen & Clean 15 Pantry Sweep',
    category: 'Pantry',
    impact: 'High',
    difficulty: 'Easy',
    summary: 'Instantly eliminate 80% of synthetic organophosphate pesticide exposure by auditing your top 20 household produce staples.',
    actionSteps: [
      'Audit your refrigerator and pantry for conventional strawberries, spinach, kale, and grapes (high systemic pesticide absorption).',
      'Replace with certified USDA Organic or Demeter Biodynamic equivalents.',
      'Soak conventional produce in a 10% food-grade organic apple cider vinegar and water solution for 15 minutes if organic isn’t available.'
    ],
    spymasterNote: 'Conventional systemic pesticides like glyphosate and chlorpyrifos penetrate vascular tissue. Washing cannot remove what is inside the plant.'
  },
  {
    id: 'tip-2',
    title: 'Living Soil Regeneration: Inoculating with Mycorrhizal Fungi',
    category: 'Soil & Garden',
    impact: 'High',
    difficulty: 'Moderate',
    summary: 'Restore the microbial soil web to naturally increase plant nutrient density by 40% and eliminate chemical fertilizers.',
    actionSteps: [
      'Inoculate garden beds with endo- and ectomycorrhizal fungal spores during planting.',
      'Apply composted manure and leaf mulch to maintain a 3-inch top cover (preventing UV solar sterilization of microbes).',
      'Eliminate synthetic N-P-K salt fertilizers which burn and paralyze soil earthworms and beneficial bacteria.'
    ],
    spymasterNote: 'Healthy soil microbiome is the absolute foundation of organic sovereignty. Plants fed by fungi manufacture their own natural phytochemical defense.'
  },
  {
    id: 'tip-3',
    title: 'PFAS & Heavy Metal Water Filtration Defense',
    category: 'Water & PFAS',
    impact: 'High',
    difficulty: 'Moderate',
    summary: 'Block per- and polyfluoroalkyl substances ("forever chemicals") and municipal fluoride/chlorine from entering your organic kitchen.',
    actionSteps: [
      'Install a certified NSF/ANSI 53 and 58 Reverse Osmosis (RO) filtration system under your sink for drinking and cooking water.',
      'Avoid storing drinking water in soft plastic or polycarbonate containers that leach endocrine disruptors (phthalates/BPA).',
      'Test your tap water annually for total dissolved solids (TDS) and heavy metal contaminants.'
    ],
    spymasterNote: 'Municipal biosolids (sewage sludge) applied to conventional farms leach PFAS directly into aquifers. Clean water is non-negotiable for organic purity.'
  },
  {
    id: 'tip-4',
    title: 'Heirloom & Open-Pollinated Seed Sovereignty',
    category: 'Seed Sovereignty',
    impact: 'High',
    difficulty: 'Advanced',
    summary: 'Bypass corporate hybrid seed monopolies by saving and propagating true-to-type heirloom seeds season after season.',
    actionSteps: [
      'Source open-pollinated, non-GMO heirloom seeds from independent regional seed savers co-ops.',
      'Allow best-performing heritage plants to bolt and produce dry seed heads at the end of summer.',
      'Store dried seeds in airtight glass jars in a cool, dark, low-humidity environment.'
    ],
    spymasterNote: 'Seed sovereignty is the ultimate political act. When you own your seeds, you control your food supply.'
  },
  {
    id: 'tip-5',
    title: 'Eliminating Indoor VOCs & Synthetic Fragrances',
    category: 'Non-Toxic Home',
    impact: 'Medium',
    difficulty: 'Easy',
    summary: 'Remove endocrine-disrupting volatile organic compounds emitted by commercial air fresheners, conventional candles, and synthetic detergents.',
    actionSteps: [
      'Replace synthetic plug-in air fresheners and paraffin candles with 100% pure organic beeswax candles and cold-pressed essential oils.',
      'Wash laundry using fragrance-free, plant-based organic soap nuts or certified organic laundry powders.',
      'Ventilate living spaces for 10 minutes every morning to clear indoor particulate buildup.'
    ],
    spymasterNote: 'Indoor air is often 5x more polluted than outdoor air due to petrochemical synthetic fragrances masking as "fresh scents".'
  },
  {
    id: 'tip-6',
    title: 'Decoding Organic Certification Seals (Beyond the Green Label)',
    category: 'Pantry',
    impact: 'High',
    difficulty: 'Easy',
    summary: 'Master the nuance between USDA Organic, Real Organic Project (ROP), Demeter Biodynamic, and Regenerative Organic Certified (ROC).',
    actionSteps: [
      'Look for the USDA Organic seal as your minimum baseline for no synthetic pesticides.',
      'Seek out "Real Organic Project" (soil-based hydroponic ban) and "Demeter Biodynamic" for the gold standard of closed-loop regenerative farming.',
      'Check ingredient panels for sneaky loopholes like "natural flavors" which can hide up to 100 chemical additives.'
    ],
    spymasterNote: 'Corporate consolidation has tried to water down organic labels. Insist on soil-grown, transparently sourced verification.'
  }
];

interface OrganicTipsProps {
  onNavigateTab: (tab: string) => void;
}

export const OrganicTips: React.FC<OrganicTipsProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [implementedTips, setImplementedTips] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('implemented_organic_tips');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleTip = (id: string) => {
    const updated = { ...implementedTips, [id]: !implementedTips[id] };
    setImplementedTips(updated);
    localStorage.setItem('implemented_organic_tips', JSON.stringify(updated));
  };

  const categories = ['All', 'Pantry', 'Soil & Garden', 'Water & PFAS', 'Seed Sovereignty', 'Non-Toxic Home'];

  const filteredTips = ORGANIC_TIPS_DATA.filter(tip => {
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.actionSteps.some(step => step.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const implementedCount = Object.values(implementedTips).filter(Boolean).length;
  const progressPercent = Math.round((implementedCount / ORGANIC_TIPS_DATA.length) * 100);

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl animate-in fade-in duration-500 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12 border border-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Green Living & Organic Sovereignty Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
            The Organic Living & Soil Protocol
          </h1>
          <p className="text-sm md:text-base text-stone-300 font-medium leading-relaxed">
            Actionable tactical protocols for radical pantry detox, living soil regeneration, water purification, and non-toxic home defense. Implement these daily habits to secure 100% organic purity for your family.
          </p>

          {/* Progress Tracker Bar */}
          <div className="bg-stone-900/80 backdrop-blur border border-stone-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-black text-sm">
                {progressPercent}%
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">Your Sovereignty Score</p>
                <p className="text-[11px] text-stone-400 font-medium">{implementedCount} of {ORGANIC_TIPS_DATA.length} protocols implemented</p>
              </div>
            </div>
            <div className="w-full sm:w-48 bg-stone-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search organic protocols, tips, or actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:outline-none text-xs font-black bg-white shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-stone-950 text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTips.map((tip) => {
          const isImplemented = !!implementedTips[tip.id];
          return (
            <div 
              key={tip.id}
              className={`bg-white rounded-[2rem] p-6 border transition-all shadow-sm flex flex-col justify-between ${
                isImplemented ? 'border-emerald-500/50 bg-emerald-50/20 shadow-md' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-[10px] font-black uppercase tracking-widest border border-stone-200">
                    {tip.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase ${
                      tip.impact === 'High' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {tip.impact} Impact
                    </span>
                    <button
                      onClick={() => toggleTip(tip.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isImplemented ? 'bg-emerald-600 text-white shadow' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                      }`}
                      title={isImplemented ? "Mark as unimplemented" : "Mark as implemented"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-stone-900 tracking-tight leading-snug">
                  {tip.title}
                </h3>
                <p className="text-xs font-medium text-stone-600 leading-relaxed">
                  {tip.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Tactical Action Steps:</p>
                  <ul className="space-y-1.5">
                    {tip.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-stone-700">
                        <span className="text-emerald-600 font-black mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spymaster Note */}
              <div className="mt-6 pt-4 border-t border-stone-100 bg-stone-50 p-4 rounded-2xl border-l-4 border-l-stone-900">
                <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">Spymaster Intelligence Note:</p>
                <p className="text-xs font-medium text-stone-700 italic leading-relaxed">
                  "{tip.spymasterNote}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to other Economy tools */}
      <div className="mt-16 bg-gradient-to-r from-emerald-950 to-stone-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white space-y-6 shadow-xl">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">Expand the Organic Economy</h3>
        <p className="text-xs md:text-sm text-stone-300 max-w-2xl mx-auto font-medium">
          Ready to scale your organic impact further? Explore our automated Business Plan Generator, Greenwash Label Scanner, or calculate your carbon sequestration impact.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigateTab('businessPlan')}
            className="px-6 py-3.5 bg-white text-stone-950 hover:bg-emerald-50 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer"
          >
            Create Organic Business Plan
          </button>
          <button
            onClick={() => onNavigateTab('scanner')}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer"
          >
            Scan Product Label
          </button>
        </div>
      </div>

    </div>
  );
};
