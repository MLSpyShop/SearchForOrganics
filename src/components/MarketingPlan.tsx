import React, { useState, useEffect } from "react";
import { Sparkles, Target, Calendar, MessageCircle, ChevronRight, Loader2, Rocket, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { MarketingPlan as PlanType, MarketingTask } from "../../types";
import { cn } from "../lib/utils";

interface MarketingPlanProps {
  apiKey: string;
}

export const MarketingPlan: React.FC<MarketingPlanProps> = ({ apiKey }) => {
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('organic_marketing_progress');
    if (saved) setCompletedTasks(JSON.parse(saved));
  }, []);

  const toggleTask = (day: number) => {
    const newStatus = { ...completedTasks, [day]: !completedTasks[day] };
    setCompletedTasks(newStatus);
    localStorage.setItem('organic_marketing_progress', JSON.stringify(newStatus));
  };

  const progressPercent = plan ? Math.round((Object.values(completedTasks).filter(Boolean).length / plan.milestones.length) * 100) : 0;

  const generatePlan = async () => {
    if (!businessName || !niche) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/marketing-plan", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": apiKey
        },
        body: JSON.stringify({ businessName, niche }),
      });
      if (!response.ok) throw new Error("Plan generation failed");
      const data = await response.json();
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100">
          <Rocket className="w-4 h-4" />
          Attraction Marketing Engine
        </div>
        <h2 className="text-4xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Marketing Workshop</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bob's 30-day roadmap. Stop "pushing" sales and start "attracting" customers through authentic organic storytelling.
        </p>
      </div>

      {!plan ? (
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-12 flex flex-col items-center space-y-8 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-600">
            <Rocket className="w-10 h-10" />
          </div>
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brand Identity</label>
              <input
                type="text"
                placeholder="The Pure Soil Collective"
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-bold text-lg"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Organic Niche</label>
              <input
                type="text"
                placeholder="Regenerative skincare, local heirloom vegetables..."
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-bold text-lg"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={generatePlan}
            disabled={loading || !businessName || !niche}
            className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-xl hover:bg-purple-600 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Bob is Crafting Strategy...
              </>
            ) : (
              <>
                <Sparkles className="w-7 h-7" />
                Initialize 30-Day Workshop
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl space-y-8 sticky top-8">
              <div className="space-y-4">
                <p className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px]">Strategic Architecture</p>
                <h3 className="text-3xl font-black leading-none uppercase italic">{plan.strategy}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Campaign Progress</p>
                  <p className="text-2xl font-black text-purple-400">{progressPercent}%</p>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-purple-400">
                  <Target className="w-5 h-5" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Attraction Focus</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm italic font-medium">
                  "{plan.attractionMarketingFocus}"
                </p>
              </div>

              <button 
                onClick={() => { setPlan(null); setCompletedTasks({}); localStorage.removeItem('organic_marketing_progress'); }}
                className="w-full py-4 border border-white/10 rounded-2xl text-gray-400 font-black uppercase tracking-widest hover:bg-white/5 transition-all text-[10px]"
              >
                Reset Workshop Data
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              {plan.milestones.map((ms, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggleTask(ms.day)}
                  className={cn(
                    "bg-white rounded-[2rem] border p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden",
                    completedTasks[ms.day] ? "border-emerald-500/20 bg-emerald-50/10 shadow-inner" : "border-gray-100 shadow-xl"
                  )}
                >
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1.5 transition-all",
                    completedTasks[ms.day] ? "bg-emerald-500" : "bg-purple-500"
                  )} />
                  
                  <div className="flex items-start gap-8">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Day</span>
                      <span className="text-4xl font-black text-gray-900 font-display leading-none">{ms.day}</span>
                      <div className="mt-4">
                        {completedTasks[ms.day] ? (
                          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        ) : (
                          <Circle className="w-8 h-8 text-gray-200 group-hover:text-purple-500 transition-colors" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className={cn(
                          "text-xl font-black uppercase tracking-tight",
                          completedTasks[ms.day] ? "text-gray-400 line-through" : "text-gray-900"
                        )}>
                          {ms.task}
                        </h4>
                        <div className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2 border border-gray-100">
                          <Calendar className="w-3 h-3" />
                          {ms.objective}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex gap-4">
                        <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 italic leading-relaxed font-medium">
                          "Bob says: {ms.bobTip}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
