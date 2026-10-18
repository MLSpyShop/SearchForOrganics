import React, { FC, useState } from 'react';
import { ExternalLink, Search, ShoppingBag, MapPin, Sparkles, CheckCircle2, ChevronDown, Globe } from 'lucide-react';
import { GoogleSearchData } from '../../types';

interface GoogleSearchDataPanelProps {
  data: GoogleSearchData;
  query: string;
  onSearchQuery?: (q: string) => void;
  onOpenPreview?: (url: string, title?: string) => void;
}

export const GoogleSearchDataPanel: FC<GoogleSearchDataPanelProps> = ({
  data,
  query,
  onSearchQuery,
  onOpenPreview
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 mb-10 overflow-hidden relative">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            {/* Google Color Emblem */}
            <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center p-2 shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.37 24 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  Google Search Grounded & Verified Data
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Live Google Index
                </span>
              </div>
              <p className="text-xs text-gray-300 font-medium mt-0.5">
                Real-time search results, product verification, and shopping intelligence sourced from Google Search.
              </p>
            </div>
          </div>

          {/* Direct Action Hub */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={data.primaryGoogleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-gray-900 text-xs font-black uppercase tracking-wider transition-all border border-white/20 active:scale-95 shadow-sm"
              title="Open full query in Google Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google Search</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>

            <a
              href={data.googleShoppingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white text-xs font-black uppercase tracking-wider transition-all border border-blue-400/30 active:scale-95 shadow-sm"
              title="Compare organic prices on Google Shopping"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-blue-300" />
              <span>Google Shopping</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>

            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs font-black uppercase tracking-wider transition-all border border-emerald-400/30 active:scale-95 shadow-sm"
              title="Locate local certified organic stores and farms in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Google Queries Executed */}
        {data.searchQueries && data.searchQueries.length > 0 && (
          <div className="pt-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Google Search Queries Grounded in Results:
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {data.googleResultsCount} Verified Sources
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.searchQueries.map((sq, i) => (
                <div
                  key={i}
                  className="group flex items-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-xl px-3 py-1.5 transition-all text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 group-hover:scale-125 transition-transform" />
                  <span className="text-gray-200 font-semibold">{sq}</span>
                  {onSearchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchQuery(sq)}
                      className="ml-2 pl-2 border-l border-white/10 text-[10px] font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-wider"
                      title={`Search "${sq}" in app`}
                    >
                      Filter
                    </button>
                  )}
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(sq)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1.5 text-gray-400 hover:text-white"
                    title={`Open "${sq}" in Google Search`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Google-Indexed Citations Drawer */}
        {data.googleIndexedSources && data.googleIndexedSources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left text-xs font-black uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                Google Indexed Citations & Reference Web Sources ({data.googleIndexedSources.length})
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-300">
                {data.googleIndexedSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-100 line-clamp-1 mb-1">{source.title}</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{source.uri}</p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      {onOpenPreview && (
                        <button
                          type="button"
                          onClick={() => onOpenPreview(source.uri, source.title)}
                          className="text-[10px] font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                        >
                          Preview In App
                        </button>
                      )}
                      <a
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        Visit Source
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
