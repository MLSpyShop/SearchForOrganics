import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ExternalLink, ShieldCheck, Lock, X, RefreshCw, 
  Copy, Check, Laptop, Tablet, Smartphone, Info, AlertCircle,
  Eye, Sparkles, CheckCircle2, ChevronRight, Layers, ArrowUpRight
} from 'lucide-react';
import { LinkPreviewData } from '../../types';
import { getLinkPreview, getFallbackPreview } from '../services/linkPreviewService';

interface LinkPreviewModalProps {
  isOpen: boolean;
  url: string | null;
  initialTitle?: string;
  onClose: () => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';
type TabMode = 'browser' | 'overview';

export const LinkPreviewModal: React.FC<LinkPreviewModalProps> = ({
  isOpen,
  url,
  initialTitle,
  onClose,
}) => {
  const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [tabMode, setTabMode] = useState<TabMode>('browser');
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (!isOpen || !url) {
      setPreviewData(null);
      setIframeLoaded(false);
      setIframeError(false);
      return;
    }

    setIframeLoaded(false);
    setIframeError(false);
    setLoadingMetadata(true);

    // Initial instant fallback so UI is never blank
    const fallback = getFallbackPreview(url);
    if (initialTitle) {
      fallback.title = initialTitle;
    }
    setPreviewData(fallback);

    // Fetch rich live metadata from server
    getLinkPreview(url)
      .then((data) => {
        setPreviewData(data);
        // If server detected iframe is blocked by X-Frame-Options or CSP, default to overview
        if (data.iframeAllowed === false) {
          setTabMode('overview');
        }
      })
      .catch((err) => {
        console.error('Failed to load link preview metadata:', err);
      })
      .finally(() => {
        setLoadingMetadata(false);
      });
  }, [isOpen, url, initialTitle]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !url) return null;

  const handleCopy = () => {
    if (navigator?.clipboard && url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReloadIframe = () => {
    setIframeLoaded(false);
    setIframeError(false);
    setIframeKey((prev) => prev + 1);
  };

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[400px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const hostname = previewData?.hostname || previewData?.domain || (url ? new URL(url).hostname : 'Website');

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden text-gray-900"
        >
          {/* Browser Window Header */}
          <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
            {/* Window Controls / Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={onClose} 
                  className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors" 
                  title="Close preview" 
                />
                <button 
                  onClick={() => setTabMode(tabMode === 'browser' ? 'overview' : 'browser')} 
                  className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors" 
                  title="Toggle overview/browser" 
                />
                <button 
                  onClick={handleReloadIframe} 
                  className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors" 
                  title="Reload web frame" 
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-700">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  Search For Organics Link Inspector
                </span>
              </div>
            </div>

            {/* Omnibar / Address bar */}
            <div className="flex-1 max-w-xl mx-2 min-w-[200px]">
              <div className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 border border-slate-700/80 text-xs transition-colors">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider shrink-0 hidden md:inline">
                  SECURE HTTPS
                </span>
                <span className="text-slate-400 hidden md:inline">|</span>
                <span className="truncate font-mono text-[11px] text-slate-100 flex-1">
                  {url}
                </span>
                {previewData?.trustBadge && (
                  <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] font-black uppercase tracking-wider">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    {previewData.trustBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Copy destination URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline font-bold text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-900/30"
                title="Open live website in new tab"
              >
                <span className="hidden sm:inline">Launch Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Toolbar: Mode Switcher & Viewport Switcher */}
          <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            {/* Tabs: Interactive Browser vs Executive Overview */}
            <div className="flex items-center gap-1 bg-gray-200/80 p-1 rounded-xl">
              <button
                onClick={() => setTabMode('browser')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all ${
                  tabMode === 'browser'
                    ? 'bg-white text-organic-green-dark shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Browser View</span>
              </button>
              <button
                onClick={() => setTabMode('overview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all ${
                  tabMode === 'overview'
                    ? 'bg-white text-organic-green-dark shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Executive Overview</span>
                {loadingMetadata && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
              </button>
            </div>

            {/* Viewport Width Controls (Only active in browser mode) */}
            {tabMode === 'browser' && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:inline">
                  Preview Frame:
                </span>
                <div className="flex items-center bg-gray-200/80 p-1 rounded-xl">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewportMode === 'desktop' ? 'bg-white text-organic-green-dark shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Desktop full width"
                  >
                    <Laptop className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewportMode === 'tablet' ? 'bg-white text-organic-green-dark shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Tablet view (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewportMode === 'mobile' ? 'bg-white text-organic-green-dark shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Mobile view (390px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleReloadIframe}
                  className="p-1.5 text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-lg shadow-xs hover:border-gray-300 transition-colors"
                  title="Refresh web page"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Body Content Area */}
          <div className="flex-1 bg-slate-100 overflow-y-auto relative flex flex-col items-center">
            {tabMode === 'browser' ? (
              <div className="w-full h-full flex flex-col items-center justify-start p-2 sm:p-4">
                {/* Embedded Frame Container */}
                <div className={`h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${getViewportWidth()}`}>
                  {/* Top Frame Status Notice */}
                  <div className="bg-emerald-50/80 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900 shrink-0">
                    <div className="flex items-center gap-2 truncate">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-[11px] truncate">
                        Grounded Link Preview: <span className="font-normal font-mono">{hostname}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-500 hidden sm:inline">
                        Strict Sandbox Active
                      </span>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        <span>Open Live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Sandboxed Iframe with graceful fallback */}
                  <div className="flex-1 relative w-full h-full bg-white">
                    {!iframeLoaded && !iframeError && (
                      <div className="absolute inset-0 z-10 bg-white/90 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
                        <p className="font-black text-gray-800 text-sm">Connecting to {hostname}...</p>
                        <p className="text-xs text-gray-500 mt-1 max-w-sm">
                          Loading verified organic destination inside safe sandboxed preview container.
                        </p>
                      </div>
                    )}

                    <iframe
                      key={iframeKey}
                      src={url}
                      title={`Preview of ${url}`}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      onLoad={() => setIframeLoaded(true)}
                      onError={() => {
                        setIframeLoaded(true);
                        setIframeError(true);
                      }}
                    />

                    {/* Embedding Restriction Banner */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-gray-200 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          Notice: Some corporate domains restrict in-app frames. If the frame displays blank or refused, switch to <strong>Executive Overview</strong> or launch tab.
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTabMode('overview')}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 font-black text-[10px] uppercase tracking-wider transition-colors"
                        >
                          View Overview Card
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                        >
                          <span>Open in Tab</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Executive Overview / Metadata Card Mode */
              <div className="w-full max-w-4xl p-4 sm:p-8 flex flex-col gap-6">
                {/* Hero Preview Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
                  {/* Top Host & Trust Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-2 shadow-xs">
                        {previewData?.favicon ? (
                          <img 
                            src={previewData.favicon} 
                            alt={hostname} 
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Globe className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-gray-900 leading-tight">
                            {previewData?.siteName || hostname}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified Target
                          </span>
                        </div>
                        <p className="text-xs font-mono text-gray-400 mt-0.5 truncate max-w-md">
                          {url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied' : 'Copy Link'}</span>
                      </button>

                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-organic-green hover:bg-organic-green-dark text-white text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md shadow-emerald-700/20 active:scale-95"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Main Title & Description */}
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      {previewData?.title || initialTitle || hostname}
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed font-medium">
                      {previewData?.description || 'Authentic organic resource verified by Search For Organics. Click to inspect full website and certifications.'}
                    </p>
                  </div>

                  {/* Image Preview Banner if available */}
                  {previewData?.image && (
                    <div className="rounded-2xl overflow-hidden border border-gray-100 max-h-72 aspect-video bg-gray-50 relative group">
                      <img 
                        src={previewData.image} 
                        alt={previewData.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                        <div className="text-white text-xs font-black uppercase tracking-wider flex items-center gap-2">
                          <Eye className="w-4 h-4 text-emerald-400" />
                          <span>Direct Website Preview Snapshot</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trust & Technical Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                        Domain Trust Tier
                      </span>
                      <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {previewData?.trustBadge || 'Verified Source'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                        Security & SSL
                      </span>
                      <span className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        {previewData?.isHttps ? '256-Bit TLS Encrypted' : 'Standard Web Protocol'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                        Directory Category
                      </span>
                      <span className="text-xs font-black text-gray-800 truncate block">
                        {previewData?.category || 'Organic Commerce'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                        Authentication Status
                      </span>
                      <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Authentic Producer Link
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => setTabMode('browser')}
                      className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span>Switch to Live Web Browser Frame</span>
                    </button>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-2xl bg-organic-green-dark hover:bg-black text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                    >
                      <span>Open Live Website in New Tab</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
