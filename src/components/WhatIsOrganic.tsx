import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Leaf, Beaker, Atom, Scale, Sprout, Info, ShieldCheck, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export const WhatIsOrganic: React.FC = () => {
  const sections = [
    {
      title: "Organic Agriculture",
      icon: Leaf,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      content: "An integrated farming system that strives for sustainability, the enhancement of soil fertility, and biological diversity. It prohibits synthetic pesticides, antibiotics, synthetic fertilizers, genetically modified organisms (GMOs), and growth hormones.",
      points: [
        "Natural Inputs: Relies on crop rotation, green manures, and biological pest control.",
        "Standards: Complies with strict governmental and international organic standards.",
        "Principles: Based on the principles of Health, Ecology, Fairness, and Care.",
        "Soil Health: Focuses on building living soil to support plant and animal health."
      ]
    },
    {
      title: "Organic Chemistry",
      icon: Beaker,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      content: "The subdiscipline of chemistry that involves the scientific study of the structure, properties, and reactions of organic compounds—matter containing carbon atoms.",
      points: [
        "Carbon-Based: Focuses on molecules containing carbon-hydrogen or carbon-carbon bonds.",
        "Life Foundation: Organic compounds form the basis of all known life on Earth.",
        "Complexity: Study includes hydrocarbons, functional groups, and complex polymers.",
        "Synthesis: Involves the creation and characterization of natural and synthetic carbon molecules."
      ]
    },
    {
      title: "Biological Context",
      icon: Atom,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      content: "In biology, 'organic' refers to carbon-based materials associated with living organisms or their processes of decay and nutrient cycling.",
      points: [
        "Biomolecules: Includes the four main groups: Proteins, Lipids, Carbohydrates, and Nucleic Acids.",
        "Organic Matter: Derived from the feces and remains of organisms (humus).",
        "Decomposition: The breakdown of complex organic matter back into simpler forms.",
        "Bio-Availability: Focuses on how carbon-based nutrients are absorbed by living systems."
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-black uppercase tracking-widest border border-gray-200">
          <BookOpen className="w-4 h-4" />
          The Organic Definitive
        </div>
        <h2 className="text-5xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">What is Organic?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The term <span className="font-bold text-gray-900">"Organic"</span> carries different meanings across agriculture, chemistry, and biology, yet all are united by a fundamental connection to <span className="text-emerald-600 font-bold underline decoration-2 underline-offset-4">carbon-based life</span>.
        </p>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn("bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 border shadow-xl flex flex-col h-full", section.border)}
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", section.bg, section.color)}>
              <section.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">{section.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
              {section.content}
            </p>
            <div className="space-y-4">
              {section.points.map((point, pIdx) => {
                const [label, text] = point.split(': ');
                return (
                  <div key={pIdx} className="flex gap-3 items-start text-[11px] leading-snug">
                    <div className={cn("w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0", section.color.replace('text-', 'bg-'))} />
                    <p className="text-gray-500">
                      <span className="font-black text-gray-900 uppercase tracking-tight">{label}:</span> {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Organic Manifesto */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Philosophical Foundation</p>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">The Organic <br/>Manifesto</h3>
          <p className="text-xl text-gray-600 font-serif italic leading-relaxed">
            "Organic is not just a certification; it is a declaration of interdependence between the soil, the plant, and the human spirit."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">1</div>
                The Law of Return
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                True organic systems prioritize the circularity of nutrients. Every element removed from the earth during harvest must be returned via high-integrity organic matter (humus, green manures, compost). We reject the linear "extract-deplete" model of industrial chemical farming.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">2</div>
                Biological Sovereignty
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                We believe in the sanctity of the seed. Organic systems prohibit the use of genetically modified organisms (GMOs) and patent-protected biological theft. True organic ventures protect local biodiversity and heirloom genetics.
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">3</div>
                Chemical Purity
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                Search For Organics maintains a zero-tolerance policy for synthetic persistent pesticides, herbicides, and fungicides. Our AI "Authority" audits are trained to detect the semantic and technical "ghosts" of synthetic inputs in brand messaging and technical data.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">4</div>
                The Carbon Bond
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                From a chemical perspective, we honor the Carbon-Hydrogen bond. Our work with <strong>Hempoxies™</strong> proves that even the most advanced materials can be "organic" in origin, technical performance, and lifecycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wikipedia Callout */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BookOpen className="w-64 h-64" />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Scale className="w-8 h-8 text-emerald-400" />
              The Standard of Truth
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Grounding our search engine in verified scientific and agricultural standards. Our definitions align with international organic movements and scientific consensus.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-gray-800 rounded-xl border border-gray-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Wikipedia Grounded</span>
              </div>
              <div className="px-4 py-2 bg-gray-800 rounded-xl border border-gray-700 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">IFOAM Aligned</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <Info className="w-5 h-5" />
                <p className="text-xs font-black uppercase tracking-[0.2em]">Bob's Expert Clarification</p>
              </div>
              <p className="text-lg text-gray-300 italic leading-relaxed font-serif">
                "Many people confuse 'natural' with 'organic'. While all organic products are natural, not all natural products meet the rigorous standards, certifications, and scientific carbon-bonding definitions required to be called Organic."
              </p>
            </div>
            <a 
              href="https://en.wikipedia.org/wiki/Organic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all shadow-xl active:scale-95"
            >
              Read Full Wikipedia Reference
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
