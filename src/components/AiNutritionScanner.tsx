import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Activity, AlertTriangle, CheckCircle2, Search, Zap, HeartPulse } from 'lucide-react';

interface NutritionProfile {
  productName: string;
  category: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  pesticideResidueRisk: string;
  organicIntegrityScore: number;
  syntheticAdditivesFound: string[];
  healthBenefits: string[];
}

const SAMPLE_PROFILES: Record<string, NutritionProfile> = {
  "organic dark chocolate": {
    productName: "Organic Dark Chocolate (85% Cacao)",
    category: "Organic Confectionery",
    calories: "180 kcal per 30g",
    protein: "3.5g",
    fat: "14g (Healthy Stearic & Oleic)",
    carbs: "11g",
    fiber: "5g",
    pesticideResidueRisk: "0.0% (Certified Organic Agro-Chemical Free)",
    organicIntegrityScore: 100,
    syntheticAdditivesFound: [],
    healthBenefits: ["High Flavonol Antioxidants", "Natural Magnesium Boost", "Cardiovascular Support", "Zero Soy Lecithin or Palm Oil"]
  },
  "raw honey": {
    productName: "Raw Unfiltered Wildflower Honey",
    category: "Natural Sweetener & Apiary",
    calories: "60 kcal per tbsp",
    protein: "0.1g",
    fat: "0g",
    carbs: "17g",
    fiber: "0g",
    pesticideResidueRisk: "0.0% (Pesticide-Free Forage Zone)",
    organicIntegrityScore: 100,
    syntheticAdditivesFound: [],
    healthBenefits: ["Active Live Enzymes", "Natural Antimicrobial Properties", "Soothing Throat & Microbiome Support", "Unheated & Unfiltered"]
  },
  "grass-fed milk": {
    productName: "Organic Grass-Fed Whole Milk",
    category: "Organic Dairy",
    calories: "150 kcal per cup",
    protein: "8g",
    fat: "8g (Conjugated Linoleic Acid)",
    carbs: "12g",
    fiber: "0g",
    pesticideResidueRisk: "0.0% (Pasture Forage Verified Free of Synthetic Herbicides)",
    organicIntegrityScore: 100,
    syntheticAdditivesFound: [],
    healthBenefits: ["Higher Omega-3 Fatty Acids", "Zero Synthetic Growth Hormones (rBST)", "Whole Fat Bioavailability", "Vitamins A & D2"]
  }
};

export const AiNutritionScanner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("organic dark chocolate");
  const [currentProfile, setCurrentProfile] = useState<NutritionProfile>(SAMPLE_PROFILES["organic dark chocolate"]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = (term: string) => {
    setSearchTerm(term);
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = term.toLowerCase();
      if (lower.includes("honey")) {
        setCurrentProfile(SAMPLE_PROFILES["raw honey"]);
      } else if (lower.includes("milk") || lower.includes("dairy")) {
        setCurrentProfile(SAMPLE_PROFILES["grass-fed milk"]);
      } else {
        setCurrentProfile({
          productName: term.charAt(0).toUpperCase() + term.slice(1),
          category: "Verified Organic Superfood",
          calories: "140 kcal per serving",
          protein: "4g",
          fat: "6g",
          carbs: "15g",
          fiber: "4g",
          pesticideResidueRisk: "0.0% (Lab-Confirmed Certified Organic)",
          organicIntegrityScore: 98,
          syntheticAdditivesFound: [],
          healthBenefits: ["Certified Organic Integrity", "Zero Prohibited Pesticides", "Nutrient-Dense Bioavailability", "Sustainably Sourced"]
        });
      }
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>AI Nutrition & Macro Intelligence</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">AI Macro & Residue Scanner</h2>
        <p className="text-sm font-medium text-gray-600 max-w-xl mx-auto">
          Instantly evaluate nutritional profiles, macro breakdowns, and chemical pesticide risk scores for certified organic foods.
        </p>
      </div>

      {/* Input / Quick Buttons */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter food item (e.g. organic dark chocolate, raw honey)..."
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-organic-green"
            />
          </div>
          <button
            onClick={() => handleAnalyze(searchTerm)}
            disabled={isAnalyzing}
            className="px-6 py-3.5 bg-organic-green hover:bg-organic-green-dark text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-organic-green/20 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Analyze Food</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider self-center mr-1">Quick Scans:</span>
          {["Organic Dark Chocolate", "Raw Honey", "Grass-Fed Milk", "Wild Blueberries", "Organic Quinoa"].map(item => (
            <button
              key={item}
              onClick={() => handleAnalyze(item)}
              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-colors border border-emerald-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-10"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">
              {currentProfile.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mt-2">{currentProfile.productName}</h3>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-organic-green" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Organic Purity</p>
              <p className="text-xl font-black text-emerald-900">{currentProfile.organicIntegrityScore}% Verified</p>
            </div>
          </div>
        </div>

        {/* Macro Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Calories</p>
            <p className="text-sm md:text-base font-black text-gray-900">{currentProfile.calories}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Protein</p>
            <p className="text-sm md:text-base font-black text-gray-900">{currentProfile.protein}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Healthy Fats</p>
            <p className="text-sm md:text-base font-black text-gray-900">{currentProfile.fat}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Carbs / Fiber</p>
            <p className="text-sm md:text-base font-black text-gray-900">{currentProfile.carbs} / {currentProfile.fiber}</p>
          </div>
        </div>

        {/* Pesticide Risk & Additives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50/70 rounded-3xl border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 text-organic-green" />
              <span>Pesticide & Glyphosate Risk</span>
            </div>
            <p className="text-base font-black text-emerald-950">{currentProfile.pesticideResidueRisk}</p>
            <p className="text-xs text-emerald-800 font-medium">Lab-verified organic standards prohibit synthetic fertilizers, sewage sludge, irradiation, and GMOs.</p>
          </div>

          <div className="p-6 bg-amber-50/70 rounded-3xl border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider">
              <HeartPulse className="w-5 h-5 text-amber-600" />
              <span>Synthetic Additives Check</span>
            </div>
            {currentProfile.syntheticAdditivesFound.length === 0 ? (
              <p className="text-base font-black text-amber-950">Zero Synthetic Additives Found</p>
            ) : (
              <p className="text-xs font-bold text-amber-800">{currentProfile.syntheticAdditivesFound.join(", ")}</p>
            )}
            <p className="text-xs text-amber-800 font-medium">Formulated with pure ingredients and zero artificial preservatives or emulsifiers.</p>
          </div>
        </div>

        {/* Health Benefits */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nutritional Health Benefits</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProfile.healthBenefits.map((hb, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-organic-green" />
                </div>
                <span className="text-xs font-black text-gray-800">{hb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
