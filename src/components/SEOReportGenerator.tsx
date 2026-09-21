import React, { useState } from "react";
import { Search, Globe, BarChart3, Target, ShieldCheck, Zap, Loader2, Download, CheckCircle2, AlertTriangle, ChevronRight, Info, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEOReport } from "../../types";
import { generateSEOReport } from "../../services/geminiService";
import { cn } from "../lib/utils";

interface SEOReportGeneratorProps {
  apiKey?: string;
}

export const SEOReportGenerator: React.FC<SEOReportGeneratorProps> = ({ apiKey }) => {
  const [businessUrl, setBusinessUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SEOReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!businessUrl) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateSEOReport(businessUrl, apiKey);
      setReport(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate SEO report");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'improvement': return <Info className="w-5 h-5 text-amber-500" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          <BarChart3 className="w-4 h-4" />
          Organic SEO Authority
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic text-shadow-sm">SEO Optimization Report</h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-4 md:px-0">
          Bridge the gap between certification and search rankings. We analyze your digital footprint for organic trust and semantic relevance.
        </p>
      </div>

      {!report ? (
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl p-6 md:p-12 flex flex-col items-center space-y-8 max-w-2xl mx-auto relative overflow-hidden group mx-4 md:mx-auto">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-emerald-600 relative z-10">
            <Globe className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="w-full space-y-6 relative z-10">
            <div className="space-y-2 text-center">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">Audit Your Domain</h3>
              <p className="text-gray-500 font-medium italic text-sm md:text-base">Enter your website URL or business name</p>
            </div>
            <input
              type="text"
              placeholder="https://pureharvest-organic.com"
              className="w-full px-4 md:px-8 py-4 md:py-6 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-base md:text-lg text-center shadow-inner"
              value={businessUrl}
              onChange={(e) => setBusinessUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !businessUrl}
            className="w-full py-4 md:py-6 bg-gray-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Crawling Organic Signals...
              </>
            ) : (
              <>
                <Zap className="w-7 h-7" />
                Generate SEO Report
              </>
            )}
          </button>
          {error && <p className="text-red-500 font-bold text-sm bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Summary Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl space-y-10 lg:sticky lg:top-8">
              <div className="space-y-4">
                <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">Business Domain</p>
                <h3 className="text-2xl md:text-3xl font-black leading-none uppercase italic truncate">{report.businessName}</h3>
                <p className="text-gray-400 text-[9px] md:text-[10px] font-mono break-all">{report.url}</p>
              </div>

              <div className="flex flex-col items-center gap-4 py-6 md:py-8 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/10">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Overall SEO Score</p>
                <div className={cn("text-5xl md:text-7xl font-black italic", getScoreColor(report.overallScore))}>
                  {report.overallScore}
                </div>
                <div className="w-full px-8">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${report.overallScore}%` }}
                      className={cn("h-full", 
                        report.overallScore >= 80 ? "bg-emerald-500" :
                        report.overallScore >= 50 ? "bg-amber-500" : "bg-red-500"
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Bob's Strategic Insight</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic font-medium">
                  "{report.bobInsight}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  onClick={() => setReport(null)}
                  className="w-full py-4 border border-white/10 rounded-2xl text-gray-400 font-black uppercase tracking-widest hover:bg-white/5 transition-all text-[10px]"
                >
                  New Audit
                </button>
              </div>
            </div>
          </div>

          {/* Main Report Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Metadata Optimization */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl p-6 md:p-12 space-y-10">
              <div className="flex items-center gap-4">
                <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl md:rounded-2xl text-emerald-600">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight italic">Metadata Optimization</h4>
              </div>

              <div className="space-y-8">
                {[
                  { label: "Title Tag", data: report.metadata.titleTag },
                  { label: "Meta Description", data: report.metadata.metaDescription },
                  { label: "H1 Header", data: report.metadata.h1Tags },
                ].map((item, i) => (
                  <div key={i} className="space-y-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                      <span className={cn("text-xs font-black", getScoreColor(item.data.score))}>Score: {item.data.score}/100</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-[8px] font-black uppercase text-gray-400">Current</p>
                        <p className="text-sm text-gray-600 italic font-medium">"{item.data.current || 'Not found'}"</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[8px] font-black uppercase text-emerald-600">Suggested (Bob's Pick)</p>
                        <div className="flex items-start justify-between gap-4 p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                          <p className="text-sm text-gray-900 font-bold">"{item.data.suggested}"</p>
                          <button onClick={() => copyToClipboard(item.data.suggested, `meta-${i}`)} className="text-gray-400 hover:text-emerald-600 flex-shrink-0">
                            {copiedField === `meta-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Keyword Analysis */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-12 space-y-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">Semantic Purity Keywords</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.keywordAnalysis.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-emerald-200 transition-all">
                    <div className="space-y-1">
                      <p className="font-black text-gray-900 uppercase italic">{kw.keyword}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Difficulty: {kw.difficulty || 'Medium'}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Relevance: {kw.relevance}%</span>
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard(kw.keyword, `kw-${i}`)} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === `kw-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Content & Trust Signals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10 space-y-8">
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3 italic">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><AlertTriangle className="w-5 h-5" /></div>
                  Content Gaps
                </h4>
                <div className="space-y-4">
                  {report.contentGaps.map((gap, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <ChevronRight className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{gap}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10 space-y-8">
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3 italic">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><Globe className="w-5 h-5" /></div>
                  Local SEO Strategy
                </h4>
                <div className="space-y-4">
                  {report.localSEOStrategy.map((strategy, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{strategy}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Technical Trust Signals */}
            <section className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl space-y-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldCheck className="w-32 md:w-48 h-32 md:h-48" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-2.5 md:p-3 bg-emerald-500 rounded-xl md:rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight italic">Technical Purity Signals</h4>
              </div>
              
              <div className="space-y-4 relative z-10">
                {report.technicalTrustSignals.map((signal, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(signal.status)}
                      <div className="space-y-1">
                        <p className="font-black uppercase italic text-sm">{signal.signal}</p>
                        <p className="text-xs text-gray-400 font-medium">{signal.recommendation}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-center self-start md:self-center",
                      signal.status === 'good' ? "bg-emerald-500/20 text-emerald-400" :
                      signal.status === 'improvement' ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                    )}>
                      {signal.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
