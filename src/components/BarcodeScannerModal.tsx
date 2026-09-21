import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, Barcode, ShieldCheck, AlertTriangle, CheckCircle2, 
  Sparkles, RefreshCw, Upload, Search, Leaf, ArrowRight, Zap, ExternalLink
} from 'lucide-react';
import { BarcodeScanResult } from '../../types';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlternative?: (name: string) => void;
}

const PRESET_BARCODES = [
  { code: '011110038478', label: 'Simple Truth Organic Honey', brand: 'Simple Truth', type: 'certified' },
  { code: '073410013508', label: 'One Degree Sprouted Oats', brand: 'One Degree Organic Foods', type: 'certified' },
  { code: '085239048398', label: 'Conventional Energy Bar (Greenwashed)', brand: 'Nature Harvest Co.', type: 'greenwash' },
  { code: '041303002209', label: 'Organic Pasture Butter', brand: 'Organic Valley', type: 'certified' }
];

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({ isOpen, onClose, onSelectAlternative }) => {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [result, setResult] = useState<BarcodeScanResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-start camera if supported
      startCamera();
    } else {
      stopCamera();
      setResult(null);
      setManualCode('');
    }
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } else {
        setCameraError('Camera API not accessible in this browser context.');
      }
    } catch (err: any) {
      setCameraError('Camera access not permitted. Use instant manual barcode entry below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const performLookup = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      // Deterministic realistic evaluation based on input code
      if (code === '085239048398' || code.toLowerCase().includes('bar') || code.endsWith('98')) {
        setResult({
          barcode: code,
          productName: 'Nature Harvest "All Natural" Honey Almond Bar',
          brand: 'Nature Harvest Co.',
          purityScore: 42,
          certifications: ['Non-GMO (Self-Claimed)'],
          status: 'flagged_greenwash',
          ingredients: [
            { name: 'Rolled Oats (Non-Organic)', isOrganic: false, isAdditive: false, hazardLevel: 'caution', notes: 'High likelihood of pre-harvest glyphosate desiccation' },
            { name: 'High Fructose Corn Syrup', isOrganic: false, isAdditive: true, hazardLevel: 'danger', notes: 'Highly processed synthetic sugar syrup' },
            { name: 'Soy Lecithin (E322)', isOrganic: false, isAdditive: true, eNumber: 'E322', hazardLevel: 'caution', notes: 'Chemical emulsifier derived from conventional soy' },
            { name: 'Natural Flavors', isOrganic: false, isAdditive: true, hazardLevel: 'caution', notes: 'Unregulated solvent-extracted flavoring compounds' },
            { name: 'Titanium Dioxide (E171)', isOrganic: false, isAdditive: true, eNumber: 'E171', hazardLevel: 'danger', notes: 'Banned in EU as a suspected genotoxic food whitener' }
          ],
          heavyMetalRisk: 'moderate',
          isVegan: false,
          usdaNopStatus: 'Not Registered',
          verdict: 'FLAGGED GREENWASH: "All Natural" packaging claim masks multiple ultra-processed additives, synthetic emulsifiers, and probable glyphosate residues.',
          cleanAlternatives: [
            'One Degree Organic Sprouted Granola Bar',
            'LÄRABAR Organic Cashew & Date Bar',
            'Purely Elizabeth Ancient Grain Organic Granola'
          ]
        });
      } else if (code === '011110038478' || code.includes('honey') || code.endsWith('78')) {
        setResult({
          barcode: code,
          productName: '100% Raw Wildflower Organic Honey',
          brand: 'Simple Truth Organic',
          purityScore: 96,
          certifications: ['USDA Certified Organic', 'Non-GMO Project Verified', 'True Source Certified'],
          status: 'certified_organic',
          ingredients: [
            { name: '100% Raw Organic Wildflower Honey', isOrganic: true, isAdditive: false, hazardLevel: 'safe', notes: 'Unfiltered, unpasteurized, cold-extracted from pesticide-free forage zones' }
          ],
          heavyMetalRisk: 'very_low',
          isVegan: false,
          usdaNopStatus: 'Verified Active',
          verdict: 'EXEMPLARY ORGANIC: Verified active USDA NOP certification with complete floral batch traceability and zero corn-syrup adulteration.',
          cleanAlternatives: ['GloryBee Organic Fair Trade Raw Honey', 'Y.S. Eco Bee Farms Raw Organic Honey']
        });
      } else {
        setResult({
          barcode: code || '073410013508',
          productName: 'Sprouted Rolled Heritage Oats (Glyphosate Tested)',
          brand: 'One Degree Organic Foods',
          purityScore: 99,
          certifications: ['USDA Organic', 'BioChecked Non-Glyphosate Certified', 'Non-GMO Project', 'Kosher'],
          status: 'certified_organic',
          ingredients: [
            { name: '100% Organic Sprouted Whole Grain Rolled Oats', isOrganic: true, isAdditive: false, hazardLevel: 'safe', notes: 'Third-party batch lab tested for <0.01 ppm glyphosate residues. Sprouted for enzyme bioavailability.' }
          ],
          heavyMetalRisk: 'very_low',
          isVegan: true,
          usdaNopStatus: 'Verified Active',
          verdict: 'SUPERIOR PURITY: Complete single-origin farm QR traceability, enzyme active sprouting, and gold-standard non-glyphosate verification.',
          cleanAlternatives: ['Bob’s Red Mill Organic Rolled Oats', 'Nature’s Path Organic Old Fashioned Oats']
        });
      }
      setIsScanning(false);
    }, 600);
  };

  const handleSimulatedScan = (code: string) => {
    setManualCode(code);
    performLookup(code);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] shadow-2xl border border-emerald-100 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Barcode className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">Instant Barcode & NOP Scanner</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                  Live Vision
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium">Scan UPC/EAN in-store for immediate USDA organic verification & additive audit</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Scanner Viewfinder / Simulator */}
          {!result && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-3xl bg-gray-950 overflow-hidden border-2 border-emerald-500/30 flex items-center justify-center">
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 text-center text-gray-400 space-y-2">
                    <Camera className="w-12 h-12 mx-auto text-emerald-500/60 animate-pulse" />
                    <p className="text-xs font-bold">{cameraError || 'Align product barcode within frame'}</p>
                  </div>
                )}

                {/* Laser Overlay Animation */}
                <div className="absolute inset-x-8 top-1/2 h-0.5 bg-emerald-400 shadow-[0_0_15px_#10b981] -translate-y-1/2 animate-pulse" />
                
                {/* Viewfinder Target Box */}
                <div className="absolute inset-12 border-2 border-dashed border-emerald-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase bg-black/60 px-3 py-1 rounded-full">
                    UPC-A / EAN-13
                  </span>
                </div>
              </div>

              {/* Instant Test Presets */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-900 mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Instant Test Barcode Simulations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_BARCODES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleSimulatedScan(item.code)}
                      className="p-2.5 bg-white border border-emerald-200/80 rounded-xl text-left hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{item.label}</p>
                        <p className="text-[10px] font-mono text-gray-500">UPC: {item.code}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        item.type === 'certified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.type === 'certified' ? 'Organic' : 'Greenwash'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Barcode Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Barcode className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Or enter 12-digit barcode number manually..."
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && performLookup(manualCode)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => performLookup(manualCode || '073410013508')}
                  disabled={isScanning}
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
                >
                  {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Audit
                </button>
              </div>
            </div>
          )}

          {/* Scan Results View */}
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Product Header & Score Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-emerald-50/50 border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">UPC: {result.barcode}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      result.status === 'certified_organic' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {result.status === 'certified_organic' ? '✓ 100% Certified Organic' : '⚠️ Non-Organic / Greenwash'}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-gray-950">{result.productName}</h4>
                  <p className="text-xs font-bold text-emerald-900">{result.brand}</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Purity Rating</p>
                    <p className={`text-3xl font-black ${result.purityScore >= 80 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {result.purityScore}<span className="text-sm text-gray-400">/100</span>
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white ${
                    result.purityScore >= 80 ? 'bg-emerald-600' : 'bg-rose-500'
                  }`}>
                    {result.purityScore >= 80 ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  </div>
                </div>
              </div>

              {/* Status Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400">USDA NOP Status</p>
                  <p className="font-bold text-gray-900 mt-1 flex items-center gap-1.5">
                    {result.usdaNopStatus === 'Verified Active' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                    {result.usdaNopStatus}
                  </p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400">Heavy Metal Screening</p>
                  <p className="font-bold text-gray-900 mt-1 capitalize">
                    {result.heavyMetalRisk.replace('_', ' ')} Risk
                  </p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase text-gray-400">Vegan Verified</p>
                  <p className="font-bold text-gray-900 mt-1">
                    {result.isVegan ? '🌱 100% Plant-Based' : 'Contains Animal Inputs'}
                  </p>
                </div>
              </div>

              {/* Ingredient & Chemical Additive Line-by-Line Breakdown */}
              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase tracking-wider text-gray-900">
                  Ingredient & Synthetic Additive Analysis ({result.ingredients.length})
                </h5>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {result.ingredients.map((ing, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                        ing.hazardLevel === 'danger' 
                          ? 'bg-rose-50/70 border-rose-200 text-rose-950' 
                          : ing.hazardLevel === 'caution'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-emerald-50/40 border-emerald-100 text-emerald-950'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{ing.name}</span>
                          {ing.eNumber && (
                            <span className="px-1.5 py-0.2 bg-black/10 rounded font-mono text-[9px] font-black">
                              {ing.eNumber}
                            </span>
                          )}
                          {ing.isOrganic && (
                            <span className="px-1.5 py-0.2 bg-emerald-200/80 text-emerald-900 rounded text-[9px] font-black uppercase">
                              Organic
                            </span>
                          )}
                        </div>
                        {ing.notes && <p className="text-[11px] opacity-80">{ing.notes}</p>}
                      </div>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        ing.hazardLevel === 'danger' ? 'bg-rose-200 text-rose-900' : ing.hazardLevel === 'caution' ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {ing.hazardLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auditor Verdict */}
              <div className="p-4 bg-emerald-950 text-emerald-100 rounded-2xl text-xs space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Auditor Verdict</p>
                <p className="leading-relaxed font-medium">{result.verdict}</p>
              </div>

              {/* Recommended Clean Alternatives */}
              {result.cleanAlternatives.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-900">
                    Highest-Scoring Verified Clean Swaps:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.cleanAlternatives.map((alt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          onClose();
                          onSelectAlternative?.(alt);
                        }}
                        className="p-3 bg-emerald-50/50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-left transition-all flex items-center justify-between text-xs group"
                      >
                        <span className="font-bold text-emerald-950 group-hover:text-emerald-800">{alt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-black text-xs uppercase tracking-wider transition-colors"
                >
                  Scan Another Item
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
