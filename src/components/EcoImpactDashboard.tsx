import React, { useState } from 'react';
import { Leaf, CloudRain, ShieldCheck, TrendingUp, Sparkles, Award, Globe, Activity } from 'lucide-react';

export const EcoImpactDashboard: React.FC = () => {
  const [organicMealsPerWeek, setOrganicMealsPerWeek] = useState<number>(14);
  const [householdSize, setHouseholdSize] = useState<number>(2);

  // Calculations
  const annualMeals = organicMealsPerWeek * 52 * householdSize;
  const carbonSequesteredKg = Math.round(annualMeals * 1.8);
  const syntheticPesticidesAvoidedGrams = Math.round(annualMeals * 0.45);
  const soilMicrobiomeScore = Math.min(100, 70 + Math.round(organicMealsPerWeek * 1.5));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Regenerative Agriculture & Climate Impact</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Eco-Impact & Carbon Calculator</h2>
        <p className="text-sm font-medium text-gray-600 max-w-xl mx-auto">
          Quantify your positive carbon footprint impact, soil biodiversity restoration, and chemical pesticides avoided through organic choices.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700">Organic Meals / Snacks Per Week</label>
            <span className="px-3 py-1 bg-emerald-50 text-organic-green font-black rounded-xl text-sm">{organicMealsPerWeek} meals</span>
          </div>
          <input
            type="range"
            min="2"
            max="35"
            value={organicMealsPerWeek}
            onChange={(e) => setOrganicMealsPerWeek(Number(e.target.value))}
            className="w-full accent-organic-green cursor-pointer"
          />
          <p className="text-[11px] text-gray-400 font-medium">Estimated certified organic items, produce servings, and beverages consumed weekly.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700">Household Size</label>
            <span className="px-3 py-1 bg-emerald-50 text-organic-green font-black rounded-xl text-sm">{householdSize} people</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={householdSize}
            onChange={(e) => setHouseholdSize(Number(e.target.value))}
            className="w-full accent-organic-green cursor-pointer"
          />
          <p className="text-[11px] text-gray-400 font-medium">Total household members participating in organic food choices.</p>
        </div>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-3 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-organic-green flex items-center justify-center font-bold">
            <CloudRain className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CO2 Sequestered</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight">{carbonSequesteredKg} <span className="text-xs font-bold text-gray-500">kg / yr</span></p>
          <p className="text-xs text-emerald-700 font-medium">Equivalent to planting {Math.round(carbonSequesteredKg / 20)} mature trees annually.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-3 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-organic-green flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Synthetic Chemicals Avoided</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight">{syntheticPesticidesAvoidedGrams} <span className="text-xs font-bold text-gray-500">grams</span></p>
          <p className="text-xs text-emerald-700 font-medium">Prohibited neurotoxins and synthetic fungicides kept out of soil & waterways.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-3 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-organic-green flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Soil Microbiome Health</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight">{soilMicrobiomeScore}% <span className="text-xs font-bold text-emerald-600">Optimal</span></p>
          <p className="text-xs text-emerald-700 font-medium">Supporting mycorrhizal fungi, earthworms, and rich soil humus.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl space-y-3 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-organic-green flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regenerative Tier</p>
          <p className="text-3xl font-black text-emerald-900 tracking-tight">Gold Steward</p>
          <p className="text-xs text-emerald-700 font-medium">Top 15% climate-conscious consumer impact rating.</p>
        </div>
      </div>

      {/* Educational Banner */}
      <div className="bg-emerald-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-800 rounded-2xl text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight">The Power of Organic Purchasing</h3>
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest mt-0.5">Regenerative Agriculture 2026 Initiative</p>
          </div>
        </div>
        <p className="text-sm text-emerald-100 font-medium leading-relaxed max-w-3xl">
          By choosing USDA Organic, Canada Organic, and Regenerative Organic Certified™ (ROC) food producers, you actively incentivize cover cropping, zero synthetic chemical runoff, and long-term topsoil carbon sequestration. Your grocery cart is your ballot for global ecological restoration.
        </p>
      </div>
    </div>
  );
};
