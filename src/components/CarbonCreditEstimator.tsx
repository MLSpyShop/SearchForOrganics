import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudRain, DollarSign, Leaf, Sparkles, TrendingUp, ShieldCheck, 
  BarChart3, RefreshCw, CheckCircle2, ArrowRight, Award
} from 'lucide-react';
import { CarbonEstimateResult } from '../../types';

export const CarbonCreditEstimator: React.FC = () => {
  const [acres, setAcres] = useState<number>(120);
  const [soilType, setSoilType] = useState<'loam' | 'clay' | 'sandy'>('loam');
  const [hasCoverCrops, setHasCoverCrops] = useState(true);
  const [hasNoTill, setHasNoTill] = useState(true);
  const [hasCompostBiochar, setHasCompostBiochar] = useState(true);
  const [hasRotationalGrazing, setHasRotationalGrazing] = useState(false);
  const [hasAgroforestry, setHasAgroforestry] = useState(false);
  const [carbonPricePerTon, setCarbonPricePerTon] = useState<number>(35); // $35/ton default

  const calculateCarbon = (): CarbonEstimateResult => {
    let tonsPerAcrePerYear = 0.2; // baseline organic soil regeneration

    const breakdown = [];

    if (hasCoverCrops) {
      const coverTons = acres * 0.75;
      tonsPerAcrePerYear += 0.75;
      breakdown.push({
        practice: 'Multi-Species Diverse Cover Cropping',
        tonsPerYear: Number(coverTons.toFixed(1)),
        revenueUsd: Number((coverTons * carbonPricePerTon).toFixed(0))
      });
    }

    if (hasNoTill) {
      const noTillTons = acres * 0.65;
      tonsPerAcrePerYear += 0.65;
      breakdown.push({
        practice: 'Continuous Low-Disturbance / No-Till',
        tonsPerYear: Number(noTillTons.toFixed(1)),
        revenueUsd: Number((noTillTons * carbonPricePerTon).toFixed(0))
      });
    }

    if (hasCompostBiochar) {
      const biocharTons = acres * 1.10;
      tonsPerAcrePerYear += 1.10;
      breakdown.push({
        practice: 'High-Lignin Compost & Biochar Soil Inoculation',
        tonsPerYear: Number(biocharTons.toFixed(1)),
        revenueUsd: Number((biocharTons * carbonPricePerTon).toFixed(0))
      });
    }

    if (hasRotationalGrazing) {
      const grazingTons = acres * 1.25;
      tonsPerAcrePerYear += 1.25;
      breakdown.push({
        practice: 'Adaptive Multi-Paddock (AMP) High-Density Grazing',
        tonsPerYear: Number(grazingTons.toFixed(1)),
        revenueUsd: Number((grazingTons * carbonPricePerTon).toFixed(0))
      });
    }

    if (hasAgroforestry) {
      const agroTons = acres * 0.90;
      tonsPerAcrePerYear += 0.90;
      breakdown.push({
        practice: 'Silvopasture & Hedgerow Agroforestry Buffers',
        tonsPerYear: Number(agroTons.toFixed(1)),
        revenueUsd: Number((agroTons * carbonPricePerTon).toFixed(0))
      });
    }

    const annualTotalTons = Number((acres * tonsPerAcrePerYear).toFixed(1));
    const fiveYearTotal = Number((annualTotalTons * 5).toFixed(1));
    const grossRevenue = Number((annualTotalTons * carbonPricePerTon).toFixed(0));
    const netPayout = Number((grossRevenue * 0.82).toFixed(0)); // 18% verifier fee
    const somGain = Number((tonsPerAcrePerYear * 0.45).toFixed(2));
    const waterGain = Math.round(acres * somGain * 20000); // 1% SOM holds ~20,000 gal/acre

    return {
      acres,
      annualCo2eSequesteredTons: annualTotalTons,
      fiveYearCo2eTotalTons: fiveYearTotal,
      soilOrganicMatterIncreasePct: somGain,
      waterRetentionIncreaseGallons: waterGain,
      estimatedCarbonCreditGrossUsd: grossRevenue,
      netFarmerPayoutUsd: netPayout,
      verraGoldStandardEligibility: (hasCoverCrops && hasNoTill) || hasCompostBiochar,
      breakdownByPractice: breakdown
    };
  };

  const results = calculateCarbon();

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            Regenerative Soil Carbon Sequestration Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Soil Carbon Credit & Water Infiltration Estimator
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Quantify metric tons of carbon sequestered in your organic soil. Model voluntary carbon market (VCM) offsets, SOM percentage increases, and drought-resilience water retention gains.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Farm Practice Parameter Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" /> Farm Operational Parameters
            </h3>

            {/* Acreage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Managed Acreage:</span>
                <span className="font-mono text-emerald-800 text-sm font-black">{acres} Acres</span>
              </div>
              <input
                type="range"
                min="10"
                max="2500"
                step="10"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>

            {/* Carbon Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Voluntary Carbon Price / Ton:</span>
                <span className="font-mono text-emerald-800 text-sm font-black">${carbonPricePerTon} / tCO₂e</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="5"
                value={carbonPricePerTon}
                onChange={(e) => setCarbonPricePerTon(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>

            {/* Regenerative Soil Practices Toggle List */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="text-xs font-black uppercase text-gray-700 tracking-wider">Regenerative Management Practices</label>
              
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={hasCoverCrops}
                  onChange={(e) => setHasCoverCrops(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Multi-Species Cover Crops</p>
                  <p className="text-[10px] text-gray-500">Continuous living roots feeding mycorrhizae</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={hasNoTill}
                  onChange={(e) => setHasNoTill(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">No-Till / Minimal Tillage</p>
                  <p className="text-[10px] text-gray-500">Prevents soil aggregate oxidation</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={hasCompostBiochar}
                  onChange={(e) => setHasCompostBiochar(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Biochar & Compost Amending</p>
                  <p className="text-[10px] text-gray-500">Recalcitrant carbon permanence (100+ yrs)</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={hasRotationalGrazing}
                  onChange={(e) => setHasRotationalGrazing(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">AMP Rotational Grazing</p>
                  <p className="text-[10px] text-gray-500">High-density livestock trampling & dung cycles</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={hasAgroforestry}
                  onChange={(e) => setHasAgroforestry(e.target.checked)}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Agroforestry & Windbreak Hedgerows</p>
                  <p className="text-[10px] text-gray-500">Deep woody biomass carbon sinks</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Carbon Financial Returns & Soil Health Yield (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-xl space-y-2">
              <p className="text-[10px] font-black uppercase text-emerald-300 tracking-wider">Annual Carbon Sequestration</p>
              <p className="text-4xl font-black">{results.annualCo2eSequesteredTons} <span className="text-base text-emerald-300">tCO₂e / yr</span></p>
              <p className="text-xs text-emerald-200">5-Year Projected Total: <strong>{results.fiveYearCo2eTotalTons} tCO₂e</strong></p>
            </div>

            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-teal-800 to-teal-950 text-white shadow-xl space-y-2">
              <p className="text-[10px] font-black uppercase text-teal-300 tracking-wider">Estimated Net Farmer Payout</p>
              <p className="text-4xl font-black">${results.netFarmerPayoutUsd.toLocaleString()} <span className="text-base text-teal-300">/ yr</span></p>
              <p className="text-xs text-teal-200">After 18% verification & registry margin</p>
            </div>
          </div>

          {/* Soil Organic Matter & Water Retention Metrics */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h4 className="font-black text-gray-900 text-base flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-emerald-700" /> Soil Moisture & Drought Resilience
              </h4>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                +{results.soilOrganicMatterIncreasePct}% SOM Gain
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black uppercase text-emerald-800">Additional Water Retention</p>
                <p className="text-2xl font-black text-emerald-950 mt-1">
                  +{results.waterRetentionIncreaseGallons.toLocaleString()} gal
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Hydration buffer against extreme heatwaves</p>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black uppercase text-emerald-800">Registry Protocol Eligibility</p>
                <p className="text-base font-black text-emerald-950 mt-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  {results.verraGoldStandardEligibility ? 'Verra VM0042 / Gold Standard Ready' : 'Basic Protocol'}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Compatible with voluntary carbon credit brokers</p>
              </div>
            </div>

            {/* Practice Contribution Breakdown */}
            <div className="space-y-2.5">
              <p className="text-xs font-black uppercase tracking-wider text-gray-900">Sequestration Breakdown by Practice:</p>
              {results.breakdownByPractice.map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">{item.practice}</span>
                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-800">{item.tonsPerYear} tCO₂e</span>
                    <span className="text-gray-400 ml-2">(${item.revenueUsd.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
