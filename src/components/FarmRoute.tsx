import React, { useState } from "react";
import { MapPin, Navigation, Star, Info, ExternalLink, Loader2, Footprints, Droplets, Globe, Search, Building2, Store, Users, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RoutePlan, UserLocation, Product } from "../../types";
import { searchOrganicProducts } from '../../services/geminiService';
import { cn } from "../lib/utils";

interface FarmRouteProps {
  apiKey: string;
  userLocation: UserLocation | null;
}

export const FarmRoute: React.FC<FarmRouteProps> = ({ apiKey, userLocation }) => {
  const [activeTab, setActiveTab] = useState<'local' | 'global'>('local');
  const [globalQuery, setGlobalQuery] = useState("");
  const [globalResults, setGlobalResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<RoutePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const planRoute = async () => {
    if (!userLocation) {
      setError("Please enable geolocation or provide your location in the search settings.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/farm-to-table-route", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": apiKey
        },
        body: JSON.stringify({ location: userLocation }),
      });
      if (!response.ok) throw new Error("Route planning failed");
      const data = await response.json();
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGlobalSearch = async () => {
    if (!globalQuery) return;
    setLoading(true);
    setError(null);
    try {
      const result = await searchOrganicProducts(globalQuery, null, apiKey);
      setGlobalResults(result.products);
    } catch (err: any) {
      setError(err.message || "Global search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          <Globe className="w-4 h-4" />
          The Pure-Map Network
        </div>
        <h2 className="text-4xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Organic Geo-Intelligence</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From hyper-local farm routes to global corporate directories. Discover absolute purity across any coordinate.
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
          <button
            onClick={() => setActiveTab('local')}
            className={cn(
              "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
              activeTab === 'local' ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <MapPin className="w-4 h-4" />
            Hyper-Local Route
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={cn(
              "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
              activeTab === 'global' ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <Globe className="w-4 h-4" />
            Global Directory
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'local' ? (
          <motion.div
            key="local"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {!plan ? (
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-12 text-center space-y-8 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto">
                  <Navigation className="w-12 h-12" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Ready to Source?</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">Bob will analyze your current location and find the 4 most relevant organic stops for a single trip based on purity and proximity.</p>
                </div>
                
                <button
                  onClick={planRoute}
                  disabled={loading}
                  className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      Bob is Scouting Farms...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-7 h-7" />
                      Plan My Sourcing Trip
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8 sticky top-8">
                  <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white shadow-2xl space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Purity Efficiency</p>
                        <p className="text-5xl font-black">{plan.totalFreshnessScore}/100</p>
                      </div>
                      <div className="p-4 bg-emerald-800 rounded-2xl">
                        <Droplets className="w-8 h-8 text-emerald-300" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs border-b border-white/10 pb-4">
                        <span className="text-emerald-300 uppercase font-black tracking-widest">Sourcing Points</span>
                        <span className="font-bold text-lg">{plan.stops.length} Vendors</span>
                      </div>
                      <div className="flex items-center justify-between text-xs border-b border-white/10 pb-4">
                        <span className="text-emerald-300 uppercase font-black tracking-widest">Route Span</span>
                        <span className="font-bold text-lg">{plan.totalDistance}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={plan.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-white text-emerald-900 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all shadow-xl"
                    >
                      <Navigation className="w-5 h-5" />
                      Launch Sourcing Path
                    </a>
                    
                    <button 
                      onClick={() => setPlan(null)}
                      className="w-full text-emerald-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
                    >
                      Re-calibrate Route
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-4">
                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-500" />
                      Bob's Logic
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed italic font-medium">
                      "Each stop is verified for its adherence to the Universal Declaration of Organic Rights. We minimize your fossil-fuel footprint by clustering your sourcing needs into a single high-purity circuit."
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  {plan.stops.map((stop, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group flex flex-col md:flex-row hover:shadow-2xl transition-all"
                    >
                      <div className="md:w-20 bg-emerald-50 flex items-center justify-center border-r border-gray-50 py-4 md:py-0">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center font-black text-emerald-600 shadow-sm">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 p-10 space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{stop.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {stop.specialty}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Purity</p>
                            <div className="flex items-center gap-1.5 justify-end">
                              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                              <span className="text-2xl font-black text-gray-900">{stop.freshnessScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">{stop.description}</p>
                        
                        <div className="pt-6 flex items-center gap-8 border-t border-gray-50">
                          <button 
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${stop.location.lat},${stop.location.lng}`, '_blank')}
                            className="flex items-center gap-2 text-xs font-black text-emerald-600 hover:text-emerald-700 transition-all uppercase tracking-widest"
                          >
                            <MapPin className="w-4 h-4" />
                            GPS Lock
                          </button>
                          <div className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest">
                            <Footprints className="w-4 h-4" />
                            {i === 0 ? "Entry Node" : "Sequential Leg"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="global"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Global Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <input
                type="text"
                placeholder="Search global organic entities, farms, or brands..."
                className="w-full px-8 py-6 bg-white border border-gray-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-xl text-lg font-medium pr-32"
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGlobalSearch()}
              />
              <button
                onClick={handleGlobalSearch}
                disabled={loading || !globalQuery}
                className="absolute right-3 top-3 bottom-3 px-6 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Scan
              </button>
            </div>

            {/* Global Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {globalResults.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6 hover:shadow-2xl transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                      {item.isLocal ? <Store className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Purity</p>
                      <p className="text-2xl font-black text-gray-900">{item.purity}%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight text-gray-900">{item.vendor}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.name}</p>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-2">
                      {item.certifications.slice(0, 2).map((cert, ci) => (
                        <span key={ci} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[8px] font-black uppercase tracking-tighter text-gray-500">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => item.sourceUrl && window.open(item.sourceUrl, '_blank')}
                      className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-emerald-600"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {!loading && globalResults.length === 0 && (
                <div className="col-span-full py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto">
                    <Globe className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-300 uppercase tracking-widest">Global Directory Idle</h4>
                    <p className="text-gray-400 font-medium">Enter a query to discover the global organic supply chain.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logistics of Purity (expanded granularity) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Sourcing Logistics</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Logistics of <br/>Pure Sourcing</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "Shortening the distance between the root and the table is a revolutionary act of carbon reduction."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 border-t border-gray-50">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight">The 50-Mile Pulse</h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Our hyper-local engine prioritizes the 'Bio-Regional Economy'. We scan for farms within a 50-mile radius that offer direct-to-consumer 'farm gate' sales, reducing the dependency on industrial distribution hubs.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight">Community Supported</h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Beyond individual farms, we integrate local Co-ops and Community Supported Agriculture (CSA) pickup points. These nodes represent the communal backbone of a resilient, high-integrity organic supply chain.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight">Verification Layers</h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Every coordinate on the Pure-Map is vetted. We don't just rely on GPS data; we audit for recent soil health reports, certification validity, and peer-reviewed community trust signals.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Callout */}
      {!loading && globalResults.length === 0 && !plan && (
        <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <MapPin className="w-64 h-64" />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Grounding the Supply Chain</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Organic integrity shouldn't be a mystery. Whether it's a farm 5 miles away or a supplier 5,000 miles away, our Geo-Intelligence engine scans for absolute purity markers.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  <Users className="w-4 h-4" />
                  Crowd-Verified
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  <Shield className="w-4 h-4" />
                  Certified Only
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-8 text-gray-900 space-y-4 shadow-xl">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600">The 100% Purity Mandate</p>
              <p className="text-lg font-serif italic text-gray-600">
                "We don't just show you where to buy; we show you where to belong. True organic sourcing is about shortening the distance between your home and the soil."
              </p>
              <p className="text-gray-400 font-bold text-sm">— Organic Bob</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
