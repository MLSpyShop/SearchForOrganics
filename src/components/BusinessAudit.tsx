import React, { useState } from "react";
import { Globe, Search, ArrowRight, CheckCircle2, TrendingUp, Lightbulb, ClipboardList, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { BusinessAudit as AuditType } from "../../types";
import { cn } from "../lib/utils";

interface BusinessAuditProps {
  apiKey: string;
}

export const BusinessAudit: React.FC<BusinessAuditProps> = ({ apiKey }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performAudit = async () => {
    if (!url && !description) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/audit-business", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": apiKey
        },
        body: JSON.stringify({ url, description }),
      });
      if (!response.ok) throw new Error("Audit failed");
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">Organic Business "Authority" Audit</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Leverage Bob's SEO expertise. Enter your organic business URL or description to analyze your technical SEO, certification signals, and growth potential.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-3xl border border-gray-200 shadow-xl overflow-hidden mx-4 md:mx-auto">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Website URL (Optional)</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  placeholder="https://yourfarm.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Business Name/Description</label>
              <div className="relative">
                <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="The Organic Valley Cooperative"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            onClick={performAudit}
            disabled={(!url && !description) || loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Auditing organic signals...
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                Perform Organic Audit
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Technical Audit Specs (expanded granularity) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Audit Framework</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">The 50-Point <br/>Authority Specs</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "Organic authority is built on data, not just declarations. We audit the technical infrastructure of trust."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-50">
          <div className="space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-emerald-600" />
              Content Integrity Scan
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              We analyze your semantic content footprint to ensure your organic claims are backed by scientific context rather than just marketing keywords. This includes auditing for 'high-integrity' external links and the presence of granular ingredient disclosures.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              Certification Validity
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Bob cross-references your claim data against real-time API feeds from international certification bodies. We flag expired credentials and ensure that 'in-conversion' statuses are transparently communicated to the user.
            </p>
          </div>
        </div>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{result.businessName}</h3>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Authority Score</p>
                  <p className="text-4xl font-black text-emerald-600">{result.currentAuthorityScore}/100</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Technical SEO & Trust Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.seoHealth.map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{item.title}</span>
                        <span className={cn(
                          "font-bold",
                          item.score > 80 ? "text-emerald-600" : item.score > 50 ? "text-amber-600" : "text-red-600"
                        )}>{item.score}%</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Detected Certification Signals
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.certificationSignals.map((sig, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 rounded-3xl p-8 text-white shadow-xl space-y-6">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                Organic Dominance Action Plan
              </h4>
              <div className="space-y-4">
                {result.actionPlan.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-emerald-300 flex-shrink-0 group-hover:bg-emerald-700 transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-emerald-50 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-xl space-y-6">
              <h4 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                Growth Opportunities
              </h4>
              <div className="space-y-4">
                {result.growthOpportunities.map((opp, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-amber-100">
                    <p className="text-sm text-amber-800 font-medium leading-relaxed">{opp}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Organic Bob Tip</p>
              <p className="italic text-gray-300 leading-relaxed">
                "Technical SEO is the engine, but certifications are the fuel of trust. Use your certified data as high-authority signals to rank organically."
              </p>
              <div className="pt-4 border-t border-gray-800">
                <a 
                  href="https://rankorganically.blogspot.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                >
                  Learn About Rank Organically
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
