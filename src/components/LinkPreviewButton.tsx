import React, { useState, useEffect } from 'react';
import { Globe, Eye, Lock, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { getFallbackPreview, getLinkPreview } from '../services/linkPreviewService';
import { LinkPreviewData } from '../../types';

interface LinkPreviewButtonProps {
  url?: string;
  title?: string;
  variant?: 'pill' | 'icon' | 'badge' | 'button';
  className?: string;
  onOpenPreview: (url: string, title?: string) => void;
  showHoverCard?: boolean;
}

export const LinkPreviewButton: React.FC<LinkPreviewButtonProps> = ({
  url,
  title,
  variant = 'pill',
  className = '',
  onOpenPreview,
  showHoverCard = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null);

  useEffect(() => {
    if (!url || !hovered) return;
    if (!previewData) {
      // Set instant fallback
      setPreviewData(getFallbackPreview(url));
      // Pre-warm preview data in background
      getLinkPreview(url)
        .then((data) => setPreviewData(data))
        .catch(() => {});
    }
  }, [hovered, url, previewData]);

  if (!url) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onOpenPreview(url, title);
  };

  const domain = previewData?.hostname || (url ? new URL(url).hostname.replace(/^www\./, '') : '');

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {variant === 'pill' && (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-organic-green-dark hover:bg-organic-green hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-200/80 transition-all shadow-xs group/btn ${className}`}
          title={`Preview ${url} inside Search For Organics`}
        >
          <Eye className="w-3 h-3 text-emerald-600 group-hover/btn:text-white transition-colors" />
          <span>Preview Link</span>
        </button>
      )}

      {variant === 'icon' && (
        <button
          type="button"
          onClick={handleClick}
          className={`p-2 rounded-xl bg-emerald-50 hover:bg-organic-green text-organic-green hover:text-white border border-emerald-200/80 transition-all shadow-xs ${className}`}
          title="Preview link in app"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      )}

      {variant === 'badge' && (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider border border-emerald-200 transition-colors ${className}`}
        >
          <Globe className="w-2.5 h-2.5 text-emerald-600" />
          <span>Quick Preview</span>
        </button>
      )}

      {variant === 'button' && (
        <button
          type="button"
          onClick={handleClick}
          className={`px-4 py-2 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-emerald-300/50 ${className}`}
        >
          <Eye className="w-4 h-4 text-emerald-700" />
          <span>Preview Live Website</span>
        </button>
      )}

      {/* Instant Hover Preview Popover */}
      {showHoverCard && hovered && previewData && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-72 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 z-[90] text-left animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
            {previewData.favicon ? (
              <img 
                src={previewData.favicon} 
                alt="" 
                className="w-4 h-4 object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <Globe className="w-4 h-4 text-emerald-600" />
            )}
            <span className="font-black text-xs text-gray-900 truncate flex-1">
              {domain}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[8px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase border border-emerald-200">
              <Lock className="w-2 h-2" /> SSL
            </span>
          </div>

          <p className="text-[11px] font-black text-gray-900 line-clamp-1 mb-1">
            {previewData.title || title || domain}
          </p>

          <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
            {previewData.description}
          </p>

          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-emerald-700">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Organic Source
            </span>
            <span className="text-gray-400">Click to Open</span>
          </div>
        </div>
      )}
    </div>
  );
};
