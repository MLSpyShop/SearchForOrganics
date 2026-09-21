import React, { useState } from "react";
import { Zap, Beaker, Leaf, Shield, ArrowRight, Loader2, Info, Atom, Recycle, Cpu, Wind, BarChart3, TrendingUp, DollarSign, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SustainabilityReport, IndustrialROIReport } from "../../types";
import { calculateIndustrialROI } from "../../services/geminiService";
import { cn } from "../lib/utils";

interface EcoCalcProps {
  apiKey: string;
}

export const EcoCalc: React.FC<EcoCalcProps> = ({ apiKey }) => {
  const [activeMode, setActiveMode] = useState<'sustainability' | 'roi'>('sustainability');
  const [material, setMaterial] = useState("Hempoxies™ Resin");
  const [weight, setWeight] = useState("10");
  const [projectBudget, setProjectBudget] = useState("50000");
  const [industry, setIndustry] = useState("Aerospace");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SustainabilityReport | null>(null);
  const [roiReport, setRoiReport] = useState<IndustrialROIReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/sustainability-calc", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": apiKey
        },
        body: JSON.stringify({ material, weight }),
      });
      if (!response.ok) throw new Error("Calculation failed");
      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleROICalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculateIndustrialROI({ budget: projectBudget, industry, material, weight }, apiKey);
      setRoiReport(result);
    } catch (err: any) {
      setError(err.message || "ROI calculation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-200">
          <Atom className="w-4 h-4" />
          Advanced Material Science
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Hempoxies™ Intelligence</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
          Developed by <span className="font-bold text-emerald-600">Landry Industries</span>, the Hempoxies™ architecture is the world's most sustainable, high-performance composite platform.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center px-4">
        <div className="bg-gray-100 p-1.5 rounded-xl md:rounded-2xl flex flex-col sm:flex-row gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode('sustainability')}
            className={cn(
              "px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2",
              activeMode === 'sustainability' ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <Leaf className="w-4 h-4" />
            Sustainability Engine
          </button>
          <button
            onClick={() => setActiveMode('roi')}
            className={cn(
              "px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2",
              activeMode === 'roi' ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Industrial ROI
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeMode === 'sustainability' ? (
          <motion.div
            key="sustainability"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-16"
          >
            {/* Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4 hover:shadow-2xl transition-shadow">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Beaker className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">EHSO Matrix</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Utilizing Epoxidized Hemp Seed Oil as a primary matrix backbone, providing the bio-based polymeric structure necessary for robust epoxy crosslinking.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4 hover:shadow-2xl transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Recycle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Vitrimer Tech</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Advanced vitrimeric dynamic polymer networks allow for infinite reprocessing and self-healing, solving the traditional "unrecyclable" epoxy problem.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4 hover:shadow-2xl transition-shadow">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Multiscale Reinforcement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Integrates hemp-derived carbon fibers and biochar into bionanocomposite architectures, potentially replacing structural aluminum.
                </p>
              </div>
            </div>

            {/* Calculator Section */}
            <div className="bg-emerald-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mx-4 md:mx-0">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Leaf className="w-48 md:w-64 h-48 md:h-64" />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Hempoxies™ Sustainability Engine</h3>
                  <p className="text-emerald-100 text-base md:text-lg leading-relaxed">
                    Calculate the embodied carbon reduction and technical performance uplift of switching your industrial projects to the Hempoxies™ platform.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-800/50 rounded-2xl border border-emerald-700">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Carbon Status</p>
                      <p className="text-xl font-bold">Negative-Net</p>
                    </div>
                    <div className="p-4 bg-emerald-800/50 rounded-2xl border border-emerald-700">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Origin</p>
                      <p className="text-xl font-bold">Landry Indus.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 text-gray-900 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Composite Selection</label>
                      <select
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                      >
                        <option value="Hempoxies™ Resin">Hempoxies™ EHSO Vitrimer</option>
                        <option value="Carbon-Hemp Hybrid">Carbon-Hemp Hybrid Composite</option>
                        <option value="Biochar Reinforced">Biochar Reinforced Bionanocomposite</option>
                        <option value="General Bio-Epoxy">Standard Bio-based Epoxy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="10"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={calculate}
                    disabled={loading}
                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-7 h-7 animate-spin" />
                        Running Quantum Audit...
                      </>
                    ) : (
                      <>
                        <Zap className="w-7 h-7" />
                        Audit Impact
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {report && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                    <Leaf className="w-12 h-12" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Carbon Embodied Savings</p>
                    <p className="text-7xl font-black text-emerald-600">{report.carbonOffsetKg}<span className="text-2xl ml-1">kg</span></p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">Estimated CO2 offset compared to traditional petroleum-based polymers.</p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                      <div>
                        <h4 className="text-2xl font-black text-gray-900 tracking-tight">{report.materialName}</h4>
                        <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">High-Performance Grade</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Durability Index</p>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-2 h-6 rounded-full",
                                i < report.durabilityRating ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-gray-100"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-500" />
                          Performance Metrics
                        </h5>
                        <div className="space-y-3">
                          {report.technicalBenefits.map((benefit, i) => (
                            <div key={i} className="flex gap-3 items-center text-sm font-bold text-gray-700 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Wind className="w-4 h-4 text-emerald-500" />
                          Environmental Narrative
                        </h5>
                        <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 relative">
                          <Info className="w-5 h-5 text-emerald-200 absolute top-4 right-4" />
                          <p className="text-sm text-emerald-900 leading-relaxed font-medium">
                            {report.petroleumComparison}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Beaker className="w-5 h-5" />
                        Bob's Scientific Thesis
                      </h4>
                      <p className="text-lg text-emerald-50 leading-relaxed font-serif italic">
                        "{report.environmentalImpact}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="roi"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            {/* ROI Input Panel */}
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">Industrial ROI Estimator</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Project your long-term financial and environmental gains when upgrading your supply chain to the <span className="text-emerald-600 font-bold">Hempoxies™ Hub</span>.
                </p>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-emerald-500 mt-1" />
                  <p className="text-sm text-gray-500">This quantum audit accounts for material longevity, carbon credit potential, and technical performance uplift over a 5-year cycle.</p>
                </div>
              </div>

              <div className="space-y-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Industry Vertical</label>
                    <select 
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option>Aerospace</option>
                      <option>Automotive</option>
                      <option>Construction</option>
                      <option>Marine</option>
                      <option>Medical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Project Scale</label>
                    <select className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold">
                      <option>Prototype (1-5 units)</option>
                      <option>Mid-Scale (50-100 units)</option>
                      <option>Industrial (1000+ units)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Annual Material Budget ($)</label>
                  <input 
                    type="number" 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleROICalculate}
                  disabled={loading}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xl hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <BarChart3 className="w-6 h-6" />}
                  Generate ROI Report
                </button>
              </div>
            </div>

            {/* ROI Results Area */}
            {roiReport && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-2 text-center">
                  <DollarSign className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial ROI (5yr)</p>
                  <p className="text-3xl font-black text-gray-900">{roiReport.financialSavings}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-2 text-center">
                  <Leaf className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CO2 Mitigation</p>
                  <p className="text-3xl font-black text-gray-900">{roiReport.carbonSavings}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-2 text-center">
                  <Cpu className="w-8 h-8 text-purple-500 mx-auto" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance Uplift</p>
                  <p className="text-3xl font-black text-gray-900">{roiReport.performanceUplift}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-2 text-center">
                  <Clock className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payback Period</p>
                  <p className="text-3xl font-black text-gray-900">{roiReport.paybackPeriod}</p>
                </div>

                <div className="md:col-span-2 lg:col-span-4 bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black uppercase tracking-tight text-emerald-400">Technical Transition Roadmap</h4>
                      <div className="space-y-3">
                        {roiReport.technicalSpecs.map((spec, i) => (
                          <div key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                            <ArrowRight className="w-5 h-5 text-emerald-500" />
                            <span className="font-bold text-gray-300">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-3 text-emerald-400">
                        <Info className="w-5 h-5" />
                        <p className="text-xs font-black uppercase tracking-widest">Bob's Strategic Analysis</p>
                      </div>
                      <p className="text-lg italic font-serif leading-relaxed text-emerald-50">
                        "Switching to Hempoxies™ isn't just an environmental choice—it's a technical survival strategy. Traditional resins face increasing carbon penalties and supply chain fragility. Our bio-based EHSO matrix provides a resilient, high-margin alternative for modern industry."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Material Science Parameters (expanded granularity) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Technical Foundation</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">The Physics of <br/>Pure Science</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "Hempoxies™ isn't just a resin; it's a quantum leap in biological structural integrity."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 border-t border-gray-50">
          <div className="space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Atom className="w-6 h-6 text-emerald-600" />
              Molecular Matrix
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Our EHSO (Epoxidized Hemp Seed Oil) matrix features a high oxirane oxygen content, allowing for a dense cross-linking density that rivals traditional bisphenol-A based epoxies without the endocrine-disrupting fallout.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Cpu className="w-6 h-6 text-emerald-600" />
              Vitrimeric Bonds
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Dynamic covalent chemistry allows the material to behave like a glass at high temperatures, enabling repairability and recyclability that was previously impossible in the thermoset resin industry.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-600" />
              Structural Purity
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              By integrating biochar-derived graphene platelets, we achieve a multiscale reinforcement that enhances tensile strength and UV resistance, all while sequestering carbon deep within the material's architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Industrial Applications */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Prime Application Verticals</h3>
          <p className="text-gray-500 mt-2">Where Hempoxies™ is currently disrupting traditional materials science.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Aerospace", desc: "Structural components with high strength-to-weight ratios." },
            { title: "Automotive", desc: "Infinite recyclability for interior and body panels." },
            { title: "Medical", desc: "Bio-compatible composite architectures for prosthetics." },
            { title: "Construction", desc: "Structural aluminum replacement in high-load systems." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all">
              <h4 className="font-black text-gray-900 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

