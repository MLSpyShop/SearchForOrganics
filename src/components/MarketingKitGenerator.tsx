import React, { useState } from "react";
import { Sparkles, Globe, Megaphone, Palette, Type, Image as ImageIcon, Loader2, Download, ExternalLink, ShieldCheck, PenTool, Layout, Palette as PaletteIcon, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingMaterials } from "../../types";
import { analyzeMarketingKit, generateMarketingImage } from "../../services/geminiService";
import { cn } from "../lib/utils";

interface MarketingKitGeneratorProps {
  apiKey?: string;
}

export const MarketingKitGenerator: React.FC<MarketingKitGeneratorProps> = ({ apiKey }) => {
  const [businessUrl, setBusinessUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<MarketingMaterials | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!businessUrl) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeMarketingKit(businessUrl, apiKey);
      setMaterials(result);
    } catch (err: any) {
      setError(err.message || "Failed to analyze business");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async (type: string, prompt: string, aspectRatio: string) => {
    setGeneratingImage(type);
    try {
      const { image } = await generateMarketingImage(prompt, aspectRatio, apiKey);
      setGeneratedImages(prev => ({ ...prev, [type]: image }));
    } catch (err: any) {
      console.error("Image generation failed:", err);
      setError("Image generation failed. Ensure your API key supports image generation.");
    } finally {
      setGeneratingImage(null);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
          <Megaphone className="w-4 h-4" />
          Organic Brand Accelerator
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Marketing Kit Builder</h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
          Scale your impact without losing your soul. We build your visual identity and messaging strategy based on pure organic principles.
        </p>
      </div>

      {!materials ? (
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl p-6 md:p-12 flex flex-col items-center space-y-8 max-w-2xl mx-auto mx-4 md:mx-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-emerald-600">
            <Globe className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="w-full space-y-6">
            <div className="space-y-2 text-center">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase px-4">Input Your Venture URL</h3>
              <p className="text-gray-500 font-medium text-sm md:text-base">Or describe your organic concept below</p>
            </div>
            <input
              type="text"
              placeholder="https://your-organic-farm.com or 'A local beeswax candle co-op'"
              className="w-full px-4 md:px-8 py-4 md:py-6 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-base md:text-lg text-center"
              value={businessUrl}
              onChange={(e) => setBusinessUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !businessUrl}
            className="w-full py-4 md:py-6 bg-gray-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Analyzing Purity...
              </>
            ) : (
              <>
                <Sparkles className="w-7 h-7" />
                Build My Brand Kit
              </>
            )}
          </button>
          {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl space-y-8 lg:sticky lg:top-8">
              <div className="space-y-4">
                <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">Brand Profile</p>
                <h3 className="text-2xl md:text-4xl font-black leading-none uppercase italic">{materials.businessName}</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Brand Voice</span>
                  </div>
                  <p className="text-lg font-medium text-gray-200">{materials.toneOfVoice}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <PaletteIcon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Color Palette</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {materials.colorPalette.map((color, i) => (
                      <div key={i} className="group relative">
                        <div 
                          className="w-full aspect-square rounded-xl shadow-inner border border-white/10"
                          style={{ backgroundColor: color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => copyToClipboard(color, `color-${i}`)}
                            className="bg-black/50 p-1.5 rounded-lg backdrop-blur-md"
                          >
                            {copiedField === `color-${i}` ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <button 
                  onClick={() => setMaterials(null)}
                  className="w-full py-4 border border-white/10 rounded-2xl text-gray-400 font-black uppercase tracking-widest hover:bg-white/5 transition-all text-[10px]"
                >
                  New Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Right: Content & Visuals */}
          <div className="lg:col-span-8 space-y-12">
            {/* Brand Story */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl md:rounded-2xl text-emerald-600">
                  <Type className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight italic">Our Pure Story</h4>
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif italic">
                "{materials.brandStory}"
              </p>
            </section>

            {/* Ad Copy */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 md:p-3 bg-purple-50 rounded-xl md:rounded-2xl text-purple-600">
                    <PenTool className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight">Campaign Headlines</h4>
                </div>
                <div className="space-y-4">
                  {materials.adCopy.headlines.map((text, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-all">
                      <p className="font-black text-gray-900 uppercase italic text-sm">{text}</p>
                      <button onClick={() => copyToClipboard(text, `headline-${i}`)} className="text-gray-400 hover:text-emerald-600">
                        {copiedField === `headline-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 md:p-3 bg-blue-50 rounded-xl md:rounded-2xl text-blue-600">
                    <Layout className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight">Primary Taglines</h4>
                </div>
                <div className="space-y-4">
                  {materials.adCopy.taglines.map((text, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-all">
                      <p className="font-bold text-gray-700 text-sm italic">"{text}"</p>
                      <button onClick={() => copyToClipboard(text, `tagline-${i}`)} className="text-gray-400 hover:text-emerald-600">
                        {copiedField === `tagline-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Visual Assets Generator */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 px-4">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Visual Integrity Assets</h4>
                <div className="ml-auto flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Powered by Gemini 3.1 Flash Image
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { id: 'logo', label: 'Core Logo', prompt: materials.imagePrompts.logo, ratio: '1:1' },
                  { id: 'socialProfile', label: 'Social Profile', prompt: materials.imagePrompts.socialProfile, ratio: '1:1' },
                  { id: 'banner', label: 'Hero Banner', prompt: materials.imagePrompts.banner, ratio: '16:9' },
                  { id: 'creative', label: 'Brand Creative', prompt: materials.imagePrompts.creative, ratio: '4:3' },
                ].map((asset) => (
                  <div key={asset.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group">
                    <div className="aspect-video relative bg-gray-50">
                      {generatedImages[asset.id] ? (
                        <img src={generatedImages[asset.id]} alt={asset.label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                          <ImageIcon className="w-12 h-12 text-gray-200" />
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{asset.label}</p>
                        </div>
                      )}
                      
                      {generatingImage === asset.id && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
                          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Rendering Purity...</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button 
                          onClick={() => handleGenerateImage(asset.id, asset.prompt, asset.ratio)}
                          className="px-6 py-3 bg-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-2xl"
                        >
                          Generate Asset
                        </button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-black uppercase text-xs tracking-widest">{asset.label}</h5>
                        <button 
                          onClick={() => copyToClipboard(asset.prompt, `prompt-${asset.id}`)}
                          className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                        >
                          {copiedField === `prompt-${asset.id}` ? 'Prompt Copied' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 italic line-clamp-2">"{asset.prompt}"</p>
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
