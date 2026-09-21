import React, { useState } from "react";
import { 
  AlertTriangle, ShieldAlert, Radio, Download, Globe, 
  X, CheckCircle, ExternalLink, ShieldCheck, Flame, Info, ChevronRight, 
  Layers, Lock, Database, FileText, ArrowUpRight, Activity, BookOpen, Printer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_OSINT_REPORT_2026, STATIC_ALARMING_ARTICLE_SECTIONS, StaticArticleSection } from "../data/defaultOsintReport";
import { cn } from "../lib/utils";
import jsPDF from "jspdf";

interface OsintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: string;
}

type ViewMode = "article" | "dossier";
type OsintTab = "findings" | "fraud" | "contaminants" | "directives" | "sources";

export const OsintReportModal: React.FC<OsintReportModalProps> = ({ isOpen, onClose }) => {
  // Static state - fixed, immediate, non-regenerative
  const report = DEFAULT_OSINT_REPORT_2026;
  const sections = STATIC_ALARMING_ARTICLE_SECTIONS;
  const [viewMode, setViewMode] = useState<ViewMode>("article");
  const [activeTab, setActiveTab] = useState<OsintTab>("findings");
  const [activeSectionId, setActiveSectionId] = useState<string>("overview");

  if (!isOpen) return null;

  const exportToPDF = () => {
    const doc = new jsPDF();
    const margin = 16;
    let y = 18;

    const addText = (text: string, size: number, isBold = false, color = [0, 0, 0]) => {
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, 178);
      doc.text(lines, margin, y);
      y += (lines.length * (size / 2.2)) + 4;
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
    };

    addText("SPECIAL INVESTIGATIVE INTELLIGENCE REPORT • AUGUST 2026", 9, true, [200, 0, 0]);
    addText(report.title, 18, true, [10, 80, 40]);
    addText(`Threat Level: ${report.threatLevel} | Classification: PUBLIC OSINT DOSSIER`, 9, false, [100, 100, 100]);
    y += 4;

    addText("EXECUTIVE INVESTIGATIVE SUMMARY", 12, true, [0, 0, 0]);
    addText(report.executiveSummary, 9.5);
    y += 4;

    sections.forEach((sec) => {
      addText(`SECTION ${sec.number}: ${sec.title.toUpperCase()}`, 11, true, [180, 20, 20]);
      addText(sec.subtitle, 9, false, [80, 80, 80]);
      sec.paragraphs.forEach(p => {
        addText(p, 9);
      });
      if (sec.calloutBox) {
        addText(`[${sec.calloutBox.badge}] ${sec.calloutBox.title}: ${sec.calloutBox.content}`, 8.5, true, [120, 0, 0]);
      }
      y += 3;
    });

    addText("CONSUMER DEFENSE DIRECTIVES", 12, true, [10, 80, 40]);
    report.consumerDefenseDirectives.forEach(d => addText(`- ${d}`, 9));
    y += 3;

    addText("GROWER ACTION PLAN", 12, true, [10, 80, 40]);
    report.growerActionPlan.forEach(d => addText(`- ${d}`, 9));

    doc.save(`URGENT_The_State_of_Organics_in_2026.pdf`);
  };

  const exportToHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${report.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Georgia, serif; line-height: 1.7; color: #111; max-width: 900px; margin: 40px auto; padding: 24px; background: #fff; }
          .header { border-bottom: 4px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px; }
          .threat-badge { display: inline-block; background: #dc2626; color: white; padding: 5px 14px; border-radius: 999px; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
          h1 { color: #065f46; margin: 15px 0 8px 0; font-size: 32px; text-transform: uppercase; letter-spacing: -0.5px; }
          .meta { color: #555; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
          .lead { font-size: 18px; line-height: 1.6; color: #222; font-weight: 500; background: #fef2f2; border-left: 4px solid #dc2626; padding: 18px; border-radius: 8px; margin-bottom: 30px; }
          .section { margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e5e7eb; }
          .section-num { font-size: 12px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 2px; }
          h2 { color: #111827; font-size: 22px; margin: 6px 0 4px 0; }
          .subtitle { color: #6b7280; font-size: 14px; margin-bottom: 16px; font-style: italic; }
          p { margin-bottom: 14px; font-size: 15px; color: #374151; }
          .callout { background: #fff1f2; border: 2px solid #fecdd3; border-radius: 10px; padding: 16px; margin: 20px 0; }
          .callout-title { font-weight: 900; font-size: 12px; color: #9f1239; text-transform: uppercase; margin-bottom: 6px; }
          .data-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 18px 0; }
          .data-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
          .data-label { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #6b7280; }
          .data-value { font-size: 18px; font-weight: 900; color: #047857; margin: 4px 0; }
          .data-context { font-size: 11px; color: #6b7280; }
          .footer { margin-top: 60px; font-size: 12px; color: #777; border-top: 2px solid #eee; padding-top: 24px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="threat-badge">THREAT LEVEL: ${report.threatLevel}</span>
          <h1>${report.title}</h1>
          <p class="meta">Published: ${report.timestamp} • Special Static Investigative Publication</p>
        </div>

        <div class="lead">
          <strong>EXECUTIVE INVESTIGATIVE SUMMARY:</strong> ${report.executiveSummary}
        </div>

        ${sections.map(s => `
          <div class="section">
            <span class="section-num">SECTION ${s.number} • ${s.threatLevel} PRIORITY</span>
            <h2>${s.title}</h2>
            <div class="subtitle">${s.subtitle}</div>
            
            ${s.paragraphs.map(p => `<p>${p}</p>`).join('')}

            ${s.calloutBox ? `
              <div class="callout">
                <div class="callout-title">[${s.calloutBox.badge}] ${s.calloutBox.title}</div>
                <div>${s.calloutBox.content}</div>
              </div>
            ` : ''}

            <div class="data-grid">
              ${s.keyDataPoints.map(dp => `
                <div class="data-card">
                  <div class="data-label">${dp.label}</div>
                  <div class="data-value">${dp.value}</div>
                  <div class="data-context">${dp.context}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="footer">
          &copy; 2026 SearchForOrganics.com • Dedicated to Radical Truth, Soil Purity, and Supply Chain Sovereignty.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "URGENT_The_State_of_Organics_in_2026.html";
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[150] p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-stone-950 text-stone-100 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-stone-800 shadow-2xl w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Urgent Intelligence Header Banner */}
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-red-950 via-stone-950 to-emerald-950 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/40 text-red-300 border border-red-500/50 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Radio className="w-3 h-3 text-red-400" />
                STATIC INVESTIGATIVE DOSSIER • 2026
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                THREAT LEVEL: {report.threatLevel}
              </span>
              <span className="text-[10px] font-bold text-stone-400">
                {report.timestamp}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-red-500 shrink-0" />
              {report.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-300 font-medium max-w-3xl leading-relaxed">
              A comprehensive, static open-source intelligence exposé documenting supply chain fraud, PFAS biosolid contamination, corporate greenwashing, and soil metabolomic breakthroughs.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-700">
              <button
                onClick={() => setViewMode("article")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all",
                  viewMode === "article"
                    ? "bg-red-600 text-white shadow"
                    : "text-stone-400 hover:text-stone-200"
                )}
                title="Read as full long-form investigative article"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Article View
              </button>
              <button
                onClick={() => setViewMode("dossier")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all",
                  viewMode === "dossier"
                    ? "bg-emerald-700 text-white shadow"
                    : "text-stone-400 hover:text-stone-200"
                )}
                title="View categorized intelligence dossier matrices"
              >
                <Layers className="w-3.5 h-3.5" />
                Dossier Tabs
              </button>
            </div>

            <button
              onClick={exportToPDF}
              className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-all"
              title="Download Full PDF Article"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={exportToHTML}
              className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-all"
              title="Download HTML Article"
            >
              <Globe className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-all hidden md:block"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 bg-stone-900 hover:bg-red-900 text-stone-400 hover:text-white rounded-xl border border-stone-800 transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Macro Numbers Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-stone-800 border-b border-stone-800 text-xs">
          <div className="bg-stone-950 p-3.5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Global Organic Land</span>
            <span className="text-sm sm:text-base font-black text-emerald-400">{report.macroMetrics.globalOrganicFarmlandMha}</span>
          </div>
          <div className="bg-stone-950 p-3.5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Market Valuation</span>
            <span className="text-sm sm:text-base font-black text-white">{report.macroMetrics.marketValuationBillion}</span>
          </div>
          <div className="bg-stone-950 p-3.5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Greenwash Risk Index</span>
            <span className="text-sm sm:text-base font-black text-red-400">{report.macroMetrics.greenwashRiskScore} / 100 (HIGH)</span>
          </div>
          <div className="bg-stone-950 p-3.5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">USDA SOE Enforcement</span>
            <span className="text-sm sm:text-base font-black text-sky-400">{report.macroMetrics.usdaSoeComplianceRate}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 custom-scrollbar bg-stone-950">
          {viewMode === "article" ? (
            /* FULL-FORM ALARMING INVESTIGATIVE ARTICLE VIEW */
            <div className="max-w-4xl mx-auto space-y-10">
              {/* Lead Urgent Box */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-red-950/80 via-stone-900 to-stone-950 rounded-2xl sm:rounded-3xl border-2 border-red-600/70 shadow-xl space-y-4">
                <div className="flex items-center gap-2.5 text-red-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.25em]">Executive Investigative Briefing</span>
                </div>
                <p className="text-base sm:text-lg text-stone-100 leading-relaxed font-medium">
                  {report.executiveSummary}
                </p>
                <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center gap-3 text-xs text-red-200/80 font-semibold">
                  <span>• 1,400+ Shell Brokers Purged</span>
                  <span>• PFAS Biosolid Watershed Infiltration</span>
                  <span>• Unregulated 'Regenerative' Chemical Hijack</span>
                </div>
              </div>

              {/* Quick Jump Section Navigation */}
              <div className="p-4 bg-stone-900/60 rounded-2xl border border-stone-800 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mr-2 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Jump to Section:
                </span>
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = document.getElementById(`section-${s.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="px-2.5 py-1 bg-stone-950 hover:bg-red-900/50 text-stone-300 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider border border-stone-800 transition-all"
                  >
                    {s.number}. {s.title.split(':')[0]}
                  </button>
                ))}
              </div>

              {/* Article Sections */}
              <div className="space-y-12">
                {sections.map((section, idx) => (
                  <article
                    key={section.id}
                    id={`section-${section.id}`}
                    className="p-6 sm:p-8 bg-stone-900/40 rounded-2xl sm:rounded-3xl border border-stone-800/80 space-y-6 hover:border-stone-700 transition-all"
                  >
                    {/* Section Header */}
                    <div className="space-y-2 pb-4 border-b border-stone-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 bg-red-950/80 text-red-300 border border-red-800/60 rounded-full text-[10px] font-black uppercase tracking-widest">
                          SECTION {section.number} • {section.threatLevel} PRIORITY
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          DOSSIER REF: 2026-SOE-0{idx + 1}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-sm text-stone-400 font-medium italic">
                        {section.subtitle}
                      </p>
                    </div>

                    {/* Section Body Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                      {section.paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Alarming Callout Box */}
                    {section.calloutBox && (
                      <div className="p-5 bg-gradient-to-r from-red-950/70 to-stone-900 rounded-2xl border-l-4 border-red-500 space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-black text-red-300 uppercase tracking-widest">
                            {section.calloutBox.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed whitespace-pre-line">
                          {section.calloutBox.content}
                        </p>
                      </div>
                    )}

                    {/* Key Investigative Data Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {section.keyDataPoints.map((dp, dIdx) => (
                        <div key={dIdx} className="p-4 bg-stone-950/80 rounded-xl border border-stone-800/80 space-y-1">
                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider block">
                            {dp.label}
                          </span>
                          <span className="text-base sm:text-lg font-black text-emerald-400 block">
                            {dp.value}
                          </span>
                          <span className="text-[10px] text-stone-400 block leading-tight">
                            {dp.context}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Verified Sources Lineage */}
                    <div className="pt-4 border-t border-stone-800/60 flex flex-wrap items-center gap-2 text-[10px] text-stone-400">
                      <span className="font-bold text-stone-400 uppercase">Verified Sources:</span>
                      {section.sources.map((src, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-0.5 bg-stone-950 rounded-md text-stone-300 border border-stone-800">
                          {src}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Final Radical Truth Sign-Off */}
              <div className="p-8 bg-gradient-to-br from-emerald-950 via-stone-950 to-black rounded-3xl border border-emerald-700/50 text-center space-y-4">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-black text-white uppercase italic">
                  Defend Soil Purity. Demand Radical Truth.
                </h3>
                <p className="text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
                  The organic movement was founded on real soil, unadulterated nutrients, and transparent local communities. Use SearchForOrganics to verify your farmers, audit your groceries, and protect food sovereignty for generations to come.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={exportToPDF}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Complete Dossier (PDF)
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Return to Search
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STRUCTURED DOSSIER / TAB VIEW */
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-stone-800">
                {[
                  { id: "findings", label: "Executive Findings & Vectors", icon: Activity },
                  { id: "fraud", label: "Active Counterfeit Alerts (4)", icon: AlertTriangle },
                  { id: "contaminants", label: "Contaminant Intelligence", icon: Flame },
                  { id: "directives", label: "Defensive Action Directives", icon: ShieldCheck },
                  { id: "sources", label: "Verified Intelligence Sources", icon: Globe }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as OsintTab)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase tracking-wider text-xs transition-all",
                        activeTab === tab.id
                          ? "bg-red-600 text-white shadow-lg border border-red-500"
                          : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === "findings" && (
                <div className="space-y-6">
                  {report.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-stone-900/70 rounded-2xl border border-stone-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 bg-stone-800 text-stone-300 rounded-md text-[10px] font-black uppercase tracking-wider">
                          {finding.category}
                        </span>
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest",
                          finding.threatSeverity === "CRITICAL" ? "bg-red-950 text-red-300 border border-red-700" :
                          finding.threatSeverity === "HIGH" ? "bg-amber-950 text-amber-300 border border-amber-700" :
                          "bg-emerald-950 text-emerald-300 border border-emerald-700"
                        )}>
                          {finding.threatSeverity} SEVERITY
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white leading-snug">
                        {finding.headline}
                      </h4>

                      <p className="text-sm text-stone-300 leading-relaxed">
                        {finding.osintAnalysis}
                      </p>

                      <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center gap-2 text-[10px] text-stone-400">
                        <span className="font-bold text-stone-400 uppercase">Verified Sources:</span>
                        {finding.verifiedSources.map((src, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-stone-950 rounded text-stone-300 border border-stone-800">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "fraud" && (
                <div className="space-y-6">
                  <div className="p-4 bg-red-950/50 rounded-2xl border border-red-900 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-red-200 leading-relaxed">
                      <strong>Active Fraud Surveillance Notice:</strong> Agricultural and trade enforcement agencies are currently monitoring 4 primary counterfeit channels where conventional or adulterated products are laundered through fraudulent supply chain documentation.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.fraudAlerts.map((fa, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Fraud Alert #{idx + 1}</span>
                            <Flame className="w-4 h-4 text-red-400" />
                          </div>
                          <h4 className="text-base font-black text-white">{fa.sector}</h4>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            <strong className="text-stone-200">Modus Operandi:</strong> {fa.modusOperandi}
                          </p>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-stone-800 text-[11px]">
                          <div>
                            <span className="font-bold text-stone-400 block uppercase text-[9px] tracking-wider">Detected Origin / Routes:</span>
                            <span className="text-stone-300">{fa.detectedRegions}</span>
                          </div>
                          <div>
                            <span className="font-bold text-amber-400 block uppercase text-[9px] tracking-wider">Detection Vulnerability:</span>
                            <span className="text-amber-200/90">{fa.riskVector}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "contaminants" && (
                <div className="space-y-6">
                  <div className="p-6 bg-stone-900/70 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center gap-2 text-red-400">
                      <Flame className="w-5 h-5" />
                      <h4 className="font-black text-sm uppercase tracking-wider">PFAS & Industrial Biosolids</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {report.emergingContaminantsBrief.pfasInBiosolids}
                    </p>
                  </div>

                  <div className="p-6 bg-stone-900/70 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-black text-sm uppercase tracking-wider">Microplastics in Hydroponic Loops</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {report.emergingContaminantsBrief.microplasticsInHydroponics}
                    </p>
                  </div>

                  <div className="p-6 bg-stone-900/70 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center gap-2 text-sky-400">
                      <Database className="w-5 h-5" />
                      <h4 className="font-black text-sm uppercase tracking-wider">Synthetic Biology & Precision Fermentation</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {report.emergingContaminantsBrief.syntheticBiologyEnzymes}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "directives" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                      <h4 className="font-black text-sm uppercase tracking-wider">Consumer Defense Directives</h4>
                    </div>
                    <ul className="space-y-3">
                      {report.consumerDefenseDirectives.map((dir, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{dir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-stone-900/80 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center gap-2 text-sky-400">
                      <ShieldAlert className="w-5 h-5" />
                      <h4 className="font-black text-sm uppercase tracking-wider">Independent Grower Action Plan</h4>
                    </div>
                    <ul className="space-y-3">
                      {report.growerActionPlan.map((plan, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{plan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "sources" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">
                    Authoritative Open-Source Intelligence Records
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.groundingSources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 hover:border-stone-700 flex items-center justify-between gap-3 text-xs transition-all group"
                      >
                        <div className="space-y-1">
                          <span className="font-black text-white group-hover:text-emerald-400 transition-colors block">
                            {source.title}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono block">
                            {source.url}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Control Footer */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-red-500" />
            <span>Static Verified Dossier • No Dynamic API Latency • Fixed 2026 Intelligence Reference</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button
              onClick={exportToHTML}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-stone-700 transition-all"
            >
              <Globe className="w-3.5 h-3.5" /> HTML
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
