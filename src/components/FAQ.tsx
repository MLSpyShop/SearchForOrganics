import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare, Shield, Globe, Atom, Search, CheckCircle2, Sprout, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-start gap-4 text-left group transition-all"
      >
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
          isOpen ? "bg-emerald-600 text-white" : "bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-grow pt-2">
          <h4 className={cn(
            "text-lg font-bold transition-colors",
            isOpen ? "text-emerald-900" : "text-gray-900 group-hover:text-emerald-600"
          )}>
            {question}
          </h4>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 mt-4 leading-relaxed pr-8">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={cn(
          "mt-2 transition-transform duration-300",
          isOpen ? "rotate-180 text-emerald-600" : "text-gray-300"
        )}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is the mission of Search For Organics?",
      answer: "Search For Organics, a Landry Industries initiative, exists to bridge the gap between small-scale purity and global industrial scale. We provide the AI-powered infrastructure needed for organic brands to maintain 100% integrity while competing with massive greenwashers. Our mission is centered on Radical Transparency, Soil Health, and Biological Sovereignty.",
      icon: Search
    },
    {
      question: "How does the Greenwash Label Scan work?",
      answer: "The scanner utilizes Gemini-1.5-Pro grounding to analyze visual product data. It doesn't just look for keywords; it performs a semantic analysis of ingredients, comparing them against the Universal Declaration of Organic Rights. It flags deceptive terminology like 'naturally derived' when it refers to synthetic processing and identifies surfactants or preservatives that violate organic standards.",
      icon: Shield
    },
    {
      question: "What is an Organic Authority Audit?",
      answer: "An Organic Authority Audit is a 50-point technical evaluation of a brand's digital and operational footprint. We analyze valid certification credentials (USDA, ECOCERT, IFOAM), check technical SEO for 'Trust Signals' that search engines favor for high-integrity brands, and provide a growth roadmap that ensures your scaling strategy doesn't compromise your core organic mission.",
      icon: Globe
    },
    {
      question: "What exactly are Hempoxies™?",
      answer: "Hempoxies™ represent the pinnacle of organic material science. Developed by Landry Industries, they are high-performance composite resins derived from epoxidized hemp seed oil. Unlike petroleum-based epoxies, Hempoxies™ are carbon-negative, feature advanced vitrimer technology for thermal recyclability, and provide industrial-strength structural integrity for everything from surfboards to aerospace components.",
      icon: Atom
    },
    {
      question: "Is there a cost to use the Organic Growth Suite?",
      answer: "The primary Search Engine, Greenwash Scanner, and Eco Calculators are 100% free for individual consumers and independent farms. Professional Venture Acceleration services, such as the full Business Blueprint generator and SEO Authority reports, are available through Landry Industries' premium growth packages, which are reinvested into maintaining the platform's impartiality.",
      icon: Scale
    },
    {
      question: "How can I get my organic business 'Bob-Verified'?",
      answer: "To receive the 'Bob-Verified' Trust Mark, your business must undergo a full Authority Audit. This includes a verification of your organic certifications, a supply chain transparency check, and a technical audit of your digital presence. Once verified, you are prioritized in our Pure-Network Directory and featured in local Farm Route planning.",
      icon: CheckCircle2
    },
    {
      question: "How does the Farm Route Planner benefit local economies?",
      answer: "By mapping high-integrity farms and providing optimized logistics for both consumers and B2B partners, we create 'Organic Corridors'. This reduces the carbon footprint of transport and ensures that capital stays within the local organic ecosystem, directly supporting the farmers who are doing the hard work of building living soil.",
      icon: Sprout
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
          <HelpCircle className="w-4 h-4" />
          Knowledge Base
        </div>
        <h2 className="text-4xl font-black text-gray-900 font-display tracking-tight uppercase italic">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about the platform, our standards, and how to verify absolute organic purity.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl">
        <div className="divide-y divide-gray-50">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>

      <div className="bg-emerald-900 rounded-[3rem] p-10 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 p-8 opacity-5">
          <HelpCircle className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Still have questions?</h3>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Organic Bob is available 24/7 to provide deeper technical insights and personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all shadow-xl active:scale-95"
              onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'chat' }))}
            >
              Ask Organic Bob
            </button>
            <a 
              href="https://rankorganically.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm border border-emerald-700 hover:bg-emerald-700 transition-all active:scale-95"
            >
              Learn About Organic SEO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
