import React from 'react';
import { Globe, MapPin, Building2, Store, Star, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TieredDirectory, DirectoryEntry } from '../../types';
import { cn } from '../lib/utils';

interface OrganicDirectoryProps {
  directory: TieredDirectory;
}

const DirectoryCard: React.FC<{ entry: DirectoryEntry, tier: number }> = ({ entry, tier }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-2xl",
        tier === 1 ? "bg-emerald-50 text-emerald-600" :
        tier === 2 ? "bg-purple-50 text-purple-600" :
        "bg-blue-50 text-blue-600"
      )}>
        {tier === 1 ? <Store className="w-5 h-5" /> :
         tier === 2 ? <Building2 className="w-5 h-5" /> :
         <Globe className="w-5 h-5" />}
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Purity</p>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-lg font-black text-gray-900">{entry.purityScore}%</span>
        </div>
      </div>
    </div>
    
    <div className="space-y-2">
      <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
        {entry.name}
      </h4>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{entry.category}</p>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
        {entry.description}
      </p>
    </div>

    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Pure</span>
      </div>
      {entry.website && (
        <a 
          href={entry.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-emerald-600"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  </motion.div>
);

export const OrganicDirectory: React.FC<OrganicDirectoryProps> = ({ directory }) => {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          <Globe className="w-4 h-4" />
          Pure-Network Directory
        </div>
        <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">
          Organic Hub: {directory.location}
        </h2>
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group mx-4 md:mx-auto">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-24 md:w-32 h-24 md:h-32" />
          </div>
          <p className="text-base md:text-lg font-serif italic text-emerald-100 relative z-10">
            "{directory.bobInsight}"
          </p>
          <p className="mt-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-400">— Organic Bob</p>
        </div>
      </div>

      {/* Tier 1: Local */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1" />
          <h3 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Tier 1: Hyper-Local Purity
          </h3>
          <div className="h-px bg-gray-100 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directory.tier1.map((entry, i) => (
            <DirectoryCard key={i} entry={entry} tier={1} />
          ))}
        </div>
      </div>

      {/* Tier 2: State/National */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1" />
          <h3 className="text-sm font-black text-purple-600 uppercase tracking-[0.3em] flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Tier 2: Regional & National Integrity
          </h3>
          <div className="h-px bg-gray-100 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directory.tier2.map((entry, i) => (
            <DirectoryCard key={i} entry={entry} tier={2} />
          ))}
        </div>
      </div>

      {/* Tier 3: International */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1" />
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Tier 3: International Purity Imports
          </h3>
          <div className="h-px bg-gray-100 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directory.tier3.map((entry, i) => (
            <DirectoryCard key={i} entry={entry} tier={3} />
          ))}
        </div>
      </div>

      {/* Directory Vetting Process (expanded granularity) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Vetting Methodology</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">The Pure-Net <br/>Vetting Protocol</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "A directory is only as strong as its weakest link. We audit every entity to protect the collective's integrity."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-50">
          <div className="space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Certification Chain of Custody
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              We don't just check for a certificate; we check the entire chain of custody. Our vetting protocol ensures that every entity in our directory can prove the organic origin of their raw materials and the integrity of their processing facilities.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Star className="w-6 h-6 text-emerald-600" />
              Purity Sentiment Analysis
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              Using advanced NLP, we monitor community sentiment and professional reviews to ensure that a brand's actual performance matches its certified claims. This 'crowd-grounding' layer adds a human check to the industrial data.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Callout */}
      <div className="bg-emerald-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl mx-4 md:mx-0">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">Missing a Pure Link?</h3>
          <p className="text-sm md:text-emerald-50 font-medium leading-relaxed">
            If you own an organic business in this region or know a farm that follows the Universal Declaration of Organic Rights, help us bridge the gap.
          </p>
        </div>
        <button className="w-full md:w-auto px-8 py-5 bg-gray-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-emerald-600 transition-all shadow-xl whitespace-nowrap">
          Register for Verification
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
