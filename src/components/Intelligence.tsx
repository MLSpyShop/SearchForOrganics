import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Fingerprint, Search, Shield, AlertTriangle, CheckCircle2, 
  ArrowRight, Loader2, Globe, Building2, Scale, Info, ExternalLink,
  Trophy, TrendingUp, Newspaper, Zap, Microscope, Dna, Beaker
} from 'lucide-react';
import { lookupIngredient, traceBrand } from '../../services/geminiService';
import { IngredientInfo, BrandLineage } from '../../types';
import { cn } from '../lib/utils';

/* --- Purity Leaderboard --- */
const LEADERBOARD_DATA = [
  { rank: 1, name: "Landry Heirloom Farms", location: "Oregon, USA", score: 99.8, type: "Producer", badges: ["Pesticide Free", "Heavy Metal Safe"] },
  { rank: 2, name: "Molecular Greens Co.", location: "Vertical Farm, NY", score: 99.4, type: "Brand", badges: ["Zero Waste", "Nutrient Dense"] },
  { rank: 3, name: "Terra Pura Soils", location: "France", score: 98.9, type: "Infrastructure", badges: ["Regenerative"] },
  { rank: 4, name: "Alpine Root Cellar", location: "Switzerland", score: 98.5, type: "Storage", badges: ["Cold Chain Purity"] },
  { rank: 5, name: "Bio-Sync Orchards", location: "California, USA", score: 98.1, type: "Producer", badges: ["Water Pure"] },
];

export const PurityLeaderboard: React.FC = () => (
  <div className="space-y-12">
    <div className="text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
        <Trophy className="w-3 h-3" />
        Live Global Rankings
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">The Purity <br/>Leaderboard</h2>
      <p className="text-gray-500 max-w-xl mx-auto font-medium">
        The elite 1% of organic producers, audited by Bob's molecular protocol. Rankings are updated every 24 hours based on fresh lab samples.
      </p>
    </div>

    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['Global', 'Local Farms', 'Retail Brands'].map((filter) => (
            <button key={filter} className={cn(
              "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
              filter === 'Global' ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900"
            )}>
              {filter}
            </button>
          ))}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Last Update: 14m ago
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {LEADERBOARD_DATA.map((item) => (
          <motion.div 
            key={item.rank}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: item.rank * 0.1 }}
            className="p-8 flex items-center gap-6 hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black",
              item.rank === 1 ? "bg-amber-100 text-amber-700 shadow-inner" : 
              item.rank === 2 ? "bg-slate-100 text-slate-700" :
              item.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-gray-50 text-gray-400"
            )}>
              #{item.rank}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mt-1">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {item.location}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-emerald-600 uppercase font-black tracking-tighter">{item.type}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              {item.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                  {badge}
                </span>
              ))}
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-gray-900 font-display italic tabular-nums">
                {item.score}%
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Purity Score</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-emerald-600 transition-all group-hover:translate-x-1" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* --- Intelligence Briefs --- */
const NEWS_DATA = [
  {
    category: "Molecular Alert",
    title: "Glyphosate Drift Detected in Central Valley 'Organic' Berries",
    desc: "Our automated sensors have detected molecular signatures of non-approved herbicidal drift affecting three major distributors.",
    icon: AlertTriangle,
    color: "rose",
    date: "2 HOURS AGO"
  },
  {
    category: "Science Breakthrough",
    title: "New 12-Factor Bio-Dynamic Farming Standard Finalized",
    desc: "Landry Industries releases the definitive whitepaper on high-yield, zero-input organic scaling for regional hubs.",
    icon: Microscope,
    color: "emerald",
    date: "5 HOURS AGO"
  },
  {
    category: "Industry News",
    title: "The 'Greenwash' Protocol: How to Spot Fake Organic Labels",
    desc: "Bob breaks down the visual and semantic cues used by industrial food giants to mask conventional practices.",
    icon: Newspaper,
    color: "blue",
    date: "1 DAY AGO"
  }
];

export const IntelligenceBriefs: React.FC = () => (
  <div className="space-y-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
          <Zap className="w-3 h-3" />
          Real-Time Intelligence
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Bob's Intelligence <br/>Briefs</h2>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {NEWS_DATA.map((news, i) => {
        const Icon = news.icon;
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                news.color === 'rose' ? "bg-rose-50 text-rose-600" :
                news.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">{news.date}</span>
            </div>
            
            <div className="flex-1 space-y-3">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                news.color === 'rose' ? "text-rose-600" :
                news.color === 'emerald' ? "text-emerald-600" : "text-blue-600"
              )}>
                {news.category}
              </span>
              <h3 className="text-xl font-black text-gray-900 leading-[1.1] uppercase tracking-tight">
                {news.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {news.desc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between group-hover:text-emerald-600">
              <span className="text-[10px] font-black uppercase tracking-widest">Read Brief</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export const Intelligence: React.FC<{ apiKey?: string }> = ({ apiKey }) => {
  const [activeTool, setActiveTool] = useState<'lexicon' | 'tracer' | 'leaderboard' | 'briefs'>('lexicon');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lexiconResult, setLexiconResult] = useState<IngredientInfo | null>(null);
  const [tracerResult, setTracerResult] = useState<BrandLineage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      if (activeTool === 'lexicon') {
        const result = await lookupIngredient(query, apiKey);
        setLexiconResult(result);
        setTracerResult(null);
      } else {
        const result = await traceBrand(query, apiKey);
        setTracerResult(result);
        setLexiconResult(null);
      }
    } catch (err: any) {
      setError(err.message || "Operation failed. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
          <Database className="w-4 h-4" />
          Organic Intelligence Suite
        </div>
        <h2 className="text-4xl font-black text-gray-900 font-display tracking-tight uppercase italic leading-none">Market Integrity Center</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Deep-layer verification tools for ingredient purity and corporate transparency.
        </p>
      </div>

      {/* Tool Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex flex-wrap gap-1 justify-center">
          {[
            { id: 'lexicon', label: 'Pure-List Lexicon', icon: Fingerprint },
            { id: 'tracer', label: 'Corporate Tracer', icon: Building2 },
            { id: 'leaderboard', label: 'Purity Leaderboard', icon: Trophy },
            { id: 'briefs', label: 'Intelligence Briefs', icon: Newspaper }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as any); setQuery(''); setError(null); }}
              className={cn(
                "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
                activeTool === tool.id ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <tool.icon className="w-4 h-4" />
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Content */}
      <div className="min-h-[400px]">
        {activeTool === 'leaderboard' && <PurityLeaderboard />}
        {activeTool === 'briefs' && <IntelligenceBriefs />}
        
        {(activeTool === 'lexicon' || activeTool === 'tracer') && (
          <div className="space-y-12">
            {/* Search Input */}
            <div className="max-w-2xl mx-auto relative group">
              <input
                type="text"
                placeholder={activeTool === 'lexicon' ? "Enter ingredient name (e.g. Phenoxyethanol)..." : "Enter brand name (e.g. Burt's Bees)..."}
                className="w-full px-8 py-6 bg-white border border-gray-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-xl text-lg font-medium pr-32"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading || !query}
                className="absolute right-3 top-3 bottom-3 px-6 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Query
              </button>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-600 text-sm font-bold">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Results Area */}
            <AnimatePresence mode="wait">
              {lexiconResult && activeTool === 'lexicon' && (
          <motion.div
            key="lexicon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Purity Score Card */}
            <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-10 flex flex-col items-center justify-center text-center space-y-6">
              <div className={cn(
                "w-32 h-32 rounded-full border-8 flex items-center justify-center relative",
                lexiconResult.safetyLevel === 'safe' ? "border-emerald-100" : lexiconResult.safetyLevel === 'caution' ? "border-amber-100" : "border-red-100"
              )}>
                <div className={cn(
                  "absolute inset-0 rounded-full border-8 border-t-transparent animate-spin-slow",
                  lexiconResult.safetyLevel === 'safe' ? "border-emerald-500" : lexiconResult.safetyLevel === 'caution' ? "border-amber-500" : "border-red-500"
                )} />
                <span className="text-5xl font-black">{lexiconResult.purityScore}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Purity Score</p>
                <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{lexiconResult.name}</h4>
                <div className={cn(
                  "mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block",
                  lexiconResult.safetyLevel === 'safe' ? "bg-emerald-100 text-emerald-700" : lexiconResult.safetyLevel === 'caution' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                )}>
                  Safety: {lexiconResult.safetyLevel}
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-10 space-y-8">
                <div className="space-y-4">
                  <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-500" />
                    Ingredient Profile
                  </h5>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {lexiconResult.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={cn(
                    "p-6 rounded-[2rem] border space-y-3",
                    lexiconResult.isGreenwash ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
                  )}>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Greenwash Alert</p>
                      {lexiconResult.isGreenwash ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <Shield className="w-5 h-5 text-emerald-500" />}
                    </div>
                    <p className={cn("text-sm font-bold", lexiconResult.isGreenwash ? "text-red-900" : "text-emerald-900")}>
                      {lexiconResult.isGreenwash ? lexiconResult.greenwashReason : "No greenwashing patterns detected for this specific compound."}
                    </p>
                  </div>

                  <div className="p-6 bg-emerald-900 rounded-[2rem] text-white space-y-3 shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Organic Alternative</p>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <p className="text-lg font-black">{lexiconResult.organicAlternative}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tracerResult && activeTool === 'tracer' && (
          <motion.div
            key="tracer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Brand Ownership Card */}
            <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-10 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-900">
                <Building2 className="w-12 h-12" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Corporate Parent</p>
                <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{tracerResult.ownerCompany}</h4>
                <div className={cn(
                  "mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block",
                  tracerResult.isIndependent ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                )}>
                  {tracerResult.isIndependent ? "Independent Entity" : "Conglomerate Owned"}
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${tracerResult.transparencyIndex}%` }} 
                />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transparency Index: {tracerResult.transparencyIndex}%</p>
            </div>

            {/* Lineage Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-500" />
                      Ethical Alignment
                    </h5>
                    <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                      "{tracerResult.ethicalAlignment}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500" />
                      Historical Context
                    </h5>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tracerResult.historicalNotes}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <Fingerprint className="w-5 h-5" />
                      <p className="text-xs font-black uppercase tracking-[0.2em]">Bob's Expert Verdict</p>
                    </div>
                    <p className="text-xl font-serif italic text-emerald-50">
                      "{tracerResult.bobVerdict}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )}
</div>
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Verification Methodology</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">The Pure-List <br/>Standard</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "Transparency is the only fertilizer that doesn't smell. We audit the atom and the board member."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-50">
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <Fingerprint className="w-6 h-6 text-emerald-600" />
                Ingredient Origin Tracing
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                Our database doesn't just list safety; it lists provenance. We trace compounds back to their raw extraction methods—distinguishing between 'natural' ingredients processed with petrochemical solvents and those extracted via CO2 or physical pressing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Solvent-Free Auditing
                </li>
                <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Feedstock Verification
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <Building2 className="w-6 h-6 text-emerald-600" />
                Corporate Lineage Mapping
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                The most dangerous form of greenwashing happens at the ownership level. We audit the corporate parents of 'boutique' organic brands to reveal if your purchase is inadvertently funding lobbying efforts against stricter organic standards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Profit-Path Analysis
                </li>
                <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Lobbying Disclosure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Info Callout */}
      {!lexiconResult && !tracerResult && !loading && (
        <div className="bg-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Database className="w-64 h-64" />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Grounding in Absolute Purity</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Most organic databases stop at the label. We dig deeper—tracing molecular structures and corporate tax IDs to ensure the "Organic" status is earned, not just marketed.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-emerald-800 rounded-xl border border-emerald-700 text-[10px] font-black uppercase tracking-widest">Molecular Analysis</div>
                <div className="px-4 py-2 bg-emerald-800 rounded-xl border border-emerald-700 text-[10px] font-black uppercase tracking-widest">Ownership Tracking</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4">
              <p className="text-sm text-emerald-200 uppercase font-black tracking-widest">Why This Matters</p>
              <p className="text-white leading-relaxed italic">
                "As of 2024, over 65% of certified organic cosmetic brands are owned by non-organic multinationals. Real transparency means knowing who is actually profiting from your purity."
              </p>
              <p className="text-emerald-400 font-bold text-sm">— Organic Bob</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
