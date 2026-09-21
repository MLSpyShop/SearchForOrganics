import React, { useState, useRef } from "react";
import { Camera, Upload, AlertCircle, CheckCircle2, ShieldAlert, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { LabelAnalysis } from "../../types";
import { cn } from "../lib/utils";

interface ScannerProps {
  apiKey: string;
}

export const Scanner: React.FC<ScannerProps> = ({ apiKey }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<LabelAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeLabel = async () => {
    if (!image) return;
    setAnalyzing(true);
    setError(null);
    try {
      const base64 = image.split(",")[1];
      const response = await fetch("/api/analyze-label", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": apiKey
        },
        body: JSON.stringify({ image: base64 }),
      });
      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 font-display">"Greenwash" Barcode Scanner</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a photo of any product label. Organic Bob will analyze the ingredients to identify hidden synthetics and true organic integrity.
        </p>
      </div>

      {/* Result Section (expanded with methodology) */}
      <div className="space-y-12">
        {!result && !analyzing && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-12 text-center space-y-8 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Purity Verification</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Upload a label to initiate a 5-point organic integrity scan. Our AI cross-references ingredients against the Global Organic Materials Database.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-emerald-600">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">Synthetic Detection</div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">GMO Signal Scan</div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">Hormone Audit</div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">Certification Check</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload area (already in file) */}
          <div className="space-y-6">
            <div 
              className={cn(
                "aspect-square rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden relative group transition-all cursor-pointer",
                image && "border-solid border-emerald-500 bg-white"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-black uppercase tracking-widest text-xs">Change Photo</p>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-600">
                    <Camera className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-black uppercase tracking-widest text-xs">Upload Label</p>
                    <p className="text-xs text-gray-400 font-medium italic">JPG / PNG / WebP</p>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
            </div>

            <button
              onClick={analyzeLabel}
              disabled={!image || analyzing}
              className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing Purity...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-6 h-6" />
                  Audit Ingredient List
                </>
              )}
            </button>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-red-700 text-xs font-bold">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-2xl space-y-8"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">{result.productName}</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{result.brand}</p>
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border",
                    result.isGreenwashed ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  )}>
                    {result.isGreenwashed ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {result.isGreenwashed ? "Purity Failure" : "Purity Success"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Integrity Index</span>
                    <span className={cn(
                      "font-black text-xl",
                      result.purityScore > 80 ? "text-emerald-600" : result.purityScore > 50 ? "text-amber-500" : "text-red-600"
                    )}>{result.purityScore}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.purityScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        result.purityScore > 80 ? "bg-emerald-500" : result.purityScore > 50 ? "bg-amber-500" : "bg-red-500"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Ingredient Breakdown
                  </h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                    {result.ingredientsAnalysis.map((ing, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-emerald-200 transition-all">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2.5 flex-shrink-0 shadow-sm",
                          ing.hazardLevel === 'high' ? "bg-red-500" : ing.hazardLevel === 'medium' ? "bg-amber-500" : "bg-emerald-500"
                        )} />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-gray-900 uppercase text-xs tracking-tight">{ing.name}</span>
                            {ing.isOrganic && (
                              <span className="text-[8px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Certified</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed font-medium italic">"{ing.note}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-emerald-900 rounded-[2rem] text-white space-y-4 relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldAlert className="w-16 h-16" />
                  </div>
                  <div className="relative z-10 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Organic Bob's Verdict</p>
                    <p className="text-lg font-serif italic text-emerald-50 leading-relaxed">
                      "{result.verdict}"
                    </p>
                  </div>
                </div>

                {result.recommendedAlternatives && result.recommendedAlternatives.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Pure Alternatives</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendedAlternatives.map((alt, i) => (
                        <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] bg-gray-50 rounded-[3rem] border border-gray-100 border-dashed flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="p-6 bg-white rounded-full shadow-sm">
                  <Camera className="w-12 h-12 text-gray-200" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-black text-gray-300 uppercase tracking-tighter italic leading-tight">Awaiting Grounding Data</p>
                  <p className="text-gray-400 text-sm font-medium">The integrity report will populate here after the label scan is complete.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
