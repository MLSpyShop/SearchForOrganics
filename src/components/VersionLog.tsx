import React from 'react';
import { GitCommit, Tag, Sparkles, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';

export const VersionLog: React.FC = () => {
  const releases = [
    {
      version: "v2.4.0",
      date: "October 18, 2026",
      tag: "Latest Release",
      badgeColor: "bg-emerald-600 text-white",
      description: "Major engine update with expanded Google Search Grounding and comprehensive tropical organic commodity support.",
      highlights: [
        "Enhanced Google Search Data integration with live Google Suggest & RSS index retrieval",
        "Added comprehensive certified organic chocolate, cacao, and dark chocolate catalog (Alter Eco, Theo, Hu Kitchen, Navitas, Equal Exchange, Pascha)",
        "Automated fallback to global/national verified organic producers when local regional queries (e.g. northern latitudes) return 0 farm yields",
        "Stricter article and industry report filtering to guarantee 100% product card relevance",
        "Zero-cache policy for empty search states ensuring robust real-time responsiveness"
      ]
    },
    {
      version: "v2.3.0",
      date: "September 2026",
      tag: "Feature Update",
      badgeColor: "bg-emerald-500 text-white",
      description: "Advanced consumer tooling and regulatory transparency upgrades.",
      highlights: [
        "Introduced Greenwash Scanner & Barcode verification",
        "Added Basket Optimizer and Microbiome Health Insights",
        "Integrated USDA Organic Integrity Database and Canadian Food Inspection Agency (CFIA) directories",
        "Added PDF & HTML search results export tools"
      ]
    },
    {
      version: "v2.2.0",
      date: "August 2026",
      tag: "Platform Expansion",
      badgeColor: "bg-teal-600 text-white",
      description: "Community and user preference management release.",
      highlights: [
        "Firebase authentication and multi-role user profile support",
        "Saved search memory and personalized dietary / allergy filter preferences",
        "CSA Farm Shares directory and Produce Swap network",
        "Soil Carbon Credit Estimator and Wholesale B2B portal"
      ]
    },
    {
      version: "v2.0.0",
      date: "June 2026",
      tag: "Major Milestone",
      badgeColor: "bg-stone-700 text-white",
      description: "Initial release of Search For Organics - Landry Industries.",
      highlights: [
        "Core organic search engine with AI Gemini Google Search Grounding",
        "Curated organic catalog spanning dairy, produce, honey, grains, and specialty foods",
        "Comprehensive compliance and legal documentation suite"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest">
          <GitCommit className="w-4 h-4 text-emerald-600" />
          <span>Release Notes & Changelog</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Platform Version Log</h2>
        <p className="text-sm font-medium text-gray-600 max-w-xl mx-auto">
          Track continuous improvements, search engine enhancements, and certified database updates for Search For Organics.
        </p>
      </div>

      <div className="space-y-6">
        {releases.map((rel, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl shadow-gray-100/50 relative overflow-hidden group hover:border-emerald-200 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:bg-emerald-100/50 transition-colors"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{rel.version}</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${rel.badgeColor}`}>
                  {rel.tag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{rel.date}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">
              {rel.description}
            </p>

            <div className="space-y-2.5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Key Highlights & Updates</p>
              {rel.highlights.map((item, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-600 leading-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
