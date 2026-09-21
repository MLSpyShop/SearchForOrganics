import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldAlert, Sparkles, Check, AlertCircle, 
  Lock, Heart, Leaf, Ban, Plus, Trash2, Save, Info,
  Sliders, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const COMMON_ALLERGENS = [
  { id: 'Dairy', label: 'Dairy & Lactose', sub: 'Milk, Butter, Whey, Casein, Cheese', icon: '🥛' },
  { id: 'Gluten', label: 'Gluten & Wheat', sub: 'Wheat, Barley, Rye, Spelt', icon: '🌾' },
  { id: 'Peanuts', label: 'Peanuts', sub: 'Peanut oil, peanut butter, arachis', icon: '🥜' },
  { id: 'Tree Nuts', label: 'Tree Nuts', sub: 'Almonds, Cashews, Walnuts, Pecans', icon: '🌰' },
  { id: 'Soy', label: 'Soy & Soy Lecithin', sub: 'Soybeans, tofu, soy isolate', icon: '🌱' },
  { id: 'Eggs', label: 'Eggs & Albumin', sub: 'Egg whites, yolks, lysozyme', icon: '🥚' },
  { id: 'Shellfish', label: 'Shellfish & Crustaceans', sub: 'Shrimp, crab, lobster, oysters', icon: '🦐' },
  { id: 'Fish', label: 'Fish & Seafood', sub: 'Salmon, tuna, anchovies, fish sauce', icon: '🐟' },
  { id: 'Sesame', label: 'Sesame & Tahini', sub: 'Sesame seeds, sesame oil', icon: '🌿' },
  { id: 'Sulfites', label: 'Sulfites', sub: 'Dried fruits, preserved wines', icon: '🍇' },
  { id: 'Nightshades', label: 'Nightshades', sub: 'Tomatoes, peppers, eggplant, potatoes', icon: '🍅' },
  { id: 'Corn', label: 'Corn & Derivatives', sub: 'Cornstarch, corn syrup, dextrose', icon: '🌽' },
  { id: 'Mustard', label: 'Mustard', sub: 'Mustard seeds, powder, prepared mustard', icon: '🟡' },
  { id: 'Celery', label: 'Celery', sub: 'Stalks, seeds, celery root', icon: '🥬' }
];

export const AVOID_ADDITIVES = [
  { id: 'Palm Oil', label: 'Palm Oil & Derivatives', desc: 'Tropical deforested fats' },
  { id: 'Synthetic Fragrance', label: 'Synthetic Fragrance / Parfum', desc: 'Undisclosed petrochemical aromas' },
  { id: 'Carrageenan', label: 'Carrageenan', desc: 'Seaweed thickener linked to gut inflammation' },
  { id: 'Refined Sugar', label: 'Refined White Sugar', desc: 'Bone-char processed cane sugar' },
  { id: 'Titanium Dioxide', label: 'Titanium Dioxide (E171)', desc: 'Nanoparticle whitening pigment' },
  { id: 'Artificial Colors', label: 'Artificial Dyes / Lakes', desc: 'Petroleum food dyes (Red 40, Yellow 5)' },
  { id: 'Natural Flavors', label: 'Unspecified "Natural Flavors"', desc: 'Non-disclosed laboratory flavor agents' },
  { id: 'Animal Gelatin', label: 'Animal Gelatin & Collagen', desc: 'Boiled bovine or porcine connective tissue' }
];

interface DietarySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DietarySettingsModal: React.FC<DietarySettingsModalProps> = ({ isOpen, onClose }) => {
  const { privateSettings, updatePrivateSettings, user } = useAuth();
  
  const [isVegan, setIsVegan] = useState(false);
  const [suggestVeganAlternatives, setSuggestVeganAlternatives] = useState(true);
  const [autoFilterNonVegan, setAutoFilterNonVegan] = useState(false);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergens, setCustomAllergens] = useState<string[]>([]);
  const [avoidIngredients, setAvoidIngredients] = useState<string[]>([]);
  const [newCustomAllergen, setNewCustomAllergen] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (privateSettings) {
      setIsVegan(privateSettings.isVegan ?? false);
      setSuggestVeganAlternatives(privateSettings.suggestVeganAlternatives ?? true);
      setAutoFilterNonVegan(privateSettings.autoFilterNonVegan ?? false);
      setAllergies(privateSettings.allergies || []);
      setCustomAllergens(privateSettings.customAllergens || []);
      setAvoidIngredients(privateSettings.avoidIngredients || []);
      setDietaryNotes(privateSettings.dietaryNotes || '');
    }
  }, [privateSettings, isOpen]);

  const toggleAllergy = (allergenId: string) => {
    if (allergies.includes(allergenId)) {
      setAllergies(allergies.filter(a => a !== allergenId));
    } else {
      setAllergies([...allergies, allergenId]);
    }
  };

  const toggleAvoidAdditive = (additiveId: string) => {
    if (avoidIngredients.includes(additiveId)) {
      setAvoidIngredients(avoidIngredients.filter(a => a !== additiveId));
    } else {
      setAvoidIngredients([...avoidIngredients, additiveId]);
    }
  };

  const addCustomAllergen = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newCustomAllergen.trim();
    if (clean && !customAllergens.includes(clean) && !allergies.includes(clean)) {
      setCustomAllergens([...customAllergens, clean]);
      setNewCustomAllergen('');
    }
  };

  const removeCustomAllergen = (item: string) => {
    setCustomAllergens(customAllergens.filter(c => c !== item));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updatePrivateSettings({
      isVegan,
      suggestVeganAlternatives,
      autoFilterNonVegan,
      allergies,
      customAllergens,
      avoidIngredients,
      dietaryNotes
    });
    setIsSaving(false);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 900);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700/60 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-200 border border-emerald-500/30">
                  <Lock className="w-3 h-3 text-emerald-300" />
                  Private Health & Dietary Settings
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Allergies & Vegan Preferences
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-100/80 bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Zero Public Exposure:</strong> These settings are stored privately in your personal account vault and used strictly by the search engine to warn you of allergens and suggest 3 certified organic vegan swaps.
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            
            {/* Section 1: Vegan Lifestyle & Alternative Suggestions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                  Vegan & Plant-Based Preferences
                </h4>
              </div>

              {/* Main Vegan Toggle */}
              <div 
                onClick={() => setIsVegan(!isVegan)}
                className={cn(
                  "p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4",
                  isVegan 
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md shadow-emerald-600/10" 
                    : "bg-gray-50/70 border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌱</span>
                    <span className="font-black text-gray-900 text-base">I Follow a 100% Vegan / Plant-Based Diet</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    When enabled, the search engine will highlight plant-based certified goods, alert you to hidden animal derivatives (gelatin, tallow, whey, casein, carmine, bone char), and suggest 3 top-tier vegan alternatives whenever non-vegan products are searched.
                  </p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-all",
                  isVegan ? "bg-emerald-600 text-white" : "border-2 border-gray-300 bg-white"
                )}>
                  {isVegan && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              {/* 3 Vegan Alternatives Engine Toggle */}
              <div 
                onClick={() => setSuggestVeganAlternatives(!suggestVeganAlternatives)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4",
                  suggestVeganAlternatives 
                    ? "bg-teal-50/60 border-teal-400" 
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span className="font-bold text-gray-900 text-sm">Always Suggest 3 Organic Vegan Alternatives for Non-Vegan Searches</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Display desired non-vegan results (e.g. Grass-Fed Butter, Organic Whole Milk, Raw Honey) <strong>AND</strong> present 3 curated, certified organic plant-based swaps side-by-side.
                  </p>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all",
                  suggestVeganAlternatives ? "bg-teal-600 text-white" : "border-2 border-gray-300 bg-white"
                )}>
                  {suggestVeganAlternatives && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Section 2: Allergies & Intolerances */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                    Allergies & Sensitivities
                  </h4>
                </div>
                {allergies.length > 0 && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    {allergies.length + customAllergens.length} active guards
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Select your food allergies. Products containing these allergens will be prominently flagged with warning tags in your search results and product sheets.
              </p>

              {/* Grid of Common Allergens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMON_ALLERGENS.map((item) => {
                  const isSelected = allergies.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAllergy(item.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3",
                        isSelected
                          ? "bg-amber-50/90 border-amber-500 shadow-sm"
                          : "bg-gray-50/50 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-xs font-black text-gray-900">{item.label}</p>
                          <p className="text-[10px] text-gray-500 font-medium truncate max-w-[170px]">{item.sub}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "bg-amber-600 text-white" : "border-2 border-gray-300 bg-white"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Allergens Form */}
              <div className="pt-2 space-y-3">
                <form onSubmit={addCustomAllergen} className="flex gap-2">
                  <input
                    type="text"
                    value={newCustomAllergen}
                    onChange={(e) => setNewCustomAllergen(e.target.value)}
                    placeholder="Add custom allergen (e.g. Avocado, Kiwi, Coconut, Lupin)..."
                    className="flex-1 px-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </form>

                {customAllergens.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {customAllergens.map((item) => (
                      <span 
                        key={item}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold"
                      >
                        ⚠️ {item}
                        <button
                          type="button"
                          onClick={() => removeCustomAllergen(item)}
                          className="hover:text-red-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Avoided Additives & Processing Agents */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Ban className="w-5 h-5 text-rose-600" />
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                  Harmful Additives & Ingredients to Avoid
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVOID_ADDITIVES.map((item) => {
                  const isSelected = avoidIngredients.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAvoidAdditive(item.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3",
                        isSelected
                          ? "bg-rose-50/80 border-rose-400 shadow-sm"
                          : "bg-gray-50/50 border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div>
                        <p className="text-xs font-black text-gray-900">{item.label}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "bg-rose-600 text-white" : "border-2 border-gray-300 bg-white"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Dietary Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700">
                Additional Private Dietary Notes (For AI Search Precision)
              </label>
              <textarea
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder="E.g. Highly sensitive to cross-contamination, prefer raw unpasteurized plant foods, avoid synthetic emulsifiers..."
                rows={2}
                className="w-full px-4 py-3 text-xs border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50/50"
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Synced with your private secure vault</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-200 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg flex items-center gap-2",
                  savedSuccess 
                    ? "bg-emerald-700" 
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 active:scale-95"
                )}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Preferences Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Private Settings'}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
