import React from 'react';
import { Shield, Building2, TrendingUp, Info, Scale, ArrowRight, ExternalLink, Map as MapIcon, Globe, FileText, CheckCircle2, MessageSquare, BookOpen, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 space-y-12">
    <div className="text-center space-y-4 px-4">
      <Shield className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto" />
      <h2 className="text-3xl md:text-5xl font-black uppercase italic">Privacy Policy</h2>
      <p className="text-gray-500 font-medium text-sm md:text-base">Last Updated: August 16, 2026</p>
    </div>
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl space-y-12 text-gray-600 leading-relaxed mx-4 md:mx-0">
      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">1. Radical Transparency Commitment</h3>
        <p>At Search For Organics, operated by Landry Industries, we believe privacy is as fundamental as soil health. Our Commitment to Radical Transparency means we provide you with absolute clarity on what data is used, how it is processed, and why it is essential for the organic ecosystem.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">2. Data Acquisition & Sovereignty</h3>
        <p>We do not "harvest" data; we facilitate intelligence. The following data points may be processed:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Location Intelligence:</strong> To provide the "Local Search" and "Farm Route" features, we request temporary access to your GPS coordinates. This data is processed locally on your device or via real-time transient server requests. We do not store a persistent history of your physical movements.</li>
          <li><strong>Analytical Inputs:</strong> Data entered into the Business Audit, Marketing Kit, or SEO Report tools is used solely to generate your specific reports. This data is held in volatile memory and is only persisted if you explicitly choose to download or save a PDF report.</li>
          <li><strong>Communication Logs:</strong> Interactions with "Organic Bob" (our AI Specialist) are used to refine the model's accuracy and provide context-aware support. These logs are anonymized and stripped of personally identifiable information (PII) before being used for training.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">3. Third-Party Interactions</h3>
        <p>We utilize the Gemini API for intelligence grounding and Google Maps for spatial visualization. These providers may have their own privacy protocols. We do not sell your email, browsing history, or search patterns to third-party advertisers. Our revenue is derived from ethical growth services, not data brokerage.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">4. Security Infrastructure</h3>
        <p>Search For Organics utilizes industry-standard encryption (TLS/SSL) for all data in transit. Our infrastructure is hosted on secure, isolated cloud containers with strict access controls maintained by the Landry Industries engineering team.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">5. Your Rights</h3>
        <p>Under GDPR and CCPA guidelines, you have the right to access, rectify, or delete any data we may hold. Since we minimize data retention, most "deletion" requests are naturally fulfilled by the transient nature of our session-based architecture.</p>
      </section>
    </div>
  </div>
);

export const OwnershipInfo: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 space-y-12">
    <div className="text-center space-y-4 px-4">
      <Building2 className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto" />
      <h2 className="text-3xl md:text-5xl font-black uppercase italic">Ownership & Governance</h2>
      <p className="text-gray-500 font-medium italic text-sm md:text-base">A Division of Landry Industries</p>
    </div>
    <div className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl space-y-10 mx-4 md:mx-0">
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-black uppercase italic text-emerald-400">Landry Industries</h3>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-serif">
          Search For Organics is a strategic division of <strong>Landry Industries</strong>, a global conglomerate dedicated to the advancement of high-integrity infrastructure and sustainable material science.
        </p>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-8">
        <h4 className="text-xl font-bold uppercase tracking-wider text-emerald-300">Corporate Mission</h4>
        <p className="text-gray-400 leading-relaxed">
          Our mandate is to consolidate the fragmented organic marketplace through the application of advanced AI grounding, transparent data visualization, and ethical business acceleration. We operate at the intersection of soil health and digital intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Global Headquarters</p>
          <div className="space-y-1">
            <p className="font-bold text-lg">Moncton, New Brunswick</p>
            <p className="text-gray-400">Canada, E1C 8R3</p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Governance Model</p>
          <p className="font-bold text-lg">100% Privately Held</p>
          <p className="text-gray-400 italic">Self-funded for absolute impartiality.</p>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-300">Strategic Portfolio</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          The Search For Organics ecosystem includes the <strong>Hempoxies™ Intelligence</strong> platform, the <strong>Organic SEO Authority</strong> network, and the <strong>Pure-Network Directory</strong>. All initiatives are governed by the Landry Industries Sustainability Charter.
        </p>
      </div>
    </div>
  </div>
);

export const AffiliateDisclosure: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 space-y-12">
    <div className="text-center space-y-4 px-4">
      <Info className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto" />
      <h2 className="text-3xl md:text-5xl font-black uppercase italic">Affiliate Disclosure</h2>
    </div>
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl space-y-8 text-gray-600 leading-relaxed mx-4 md:mx-0">
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">Revenue with Integrity</h3>
        <p className="text-lg md:text-xl font-medium">
          In our pursuit of radical transparency, we want you to understand how this platform remains free for small-scale farmers and independent co-ops.
        </p>
      </div>

      <div className="space-y-4">
        <p>Search For Organics participates in various affiliate marketing programs. This means that when you click on certain links within our directory or reports and make a purchase, we may receive a commission at no additional cost to you.</p>
        <p><strong>CRITICAL DISTINCTION:</strong> Affiliate relationships have <strong>ZERO</strong> influence on our Purity Scores or Bob's AI audits. We do not accept payment for increased rankings, preferential placement in search results, or the "greening" of non-organic businesses.</p>
      </div>

      <div className="bg-emerald-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-emerald-100">
        <h4 className="text-emerald-900 font-black uppercase text-sm mb-2 italic">The Landry Standard</h4>
        <p className="text-emerald-800 font-medium leading-relaxed italic">
          "Every business in our directory is audited by Organic Bob with absolute impartiality. If a partner fails a purity audit, they are removed, regardless of the affiliate potential. Our loyalty is to the soil and the consumer, not the commission."
        </p>
      </div>

      <div className="pt-8 border-t border-gray-100 space-y-4">
        <p className="text-sm text-gray-400 italic">
          Our primary affiliate partner is <strong>Rank Organically</strong>, a specialist Organic SEO provider that helps small brands compete with industrial greenwashers.
        </p>
      </div>
    </div>
  </div>
);

export const SalesPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 space-y-24">
    <div className="text-center space-y-8 px-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <TrendingUp className="w-4 h-4" />
        Venture Acceleration
      </div>
      <h2 className="text-4xl md:text-7xl font-black text-gray-900 uppercase italic leading-none tracking-tighter">
        The Organic <span className="text-emerald-600">Growth Suite</span>
      </h2>
      <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
        Professional-grade infrastructure for high-integrity organic brands. We provide the tools you need to outscale the greenwashers.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
      {[
        { 
          title: 'The Blueprint', 
          desc: 'Comprehensive Business Plans generated via Gemini-grounded organic datasets. Attract capital while maintaining 100% purity standards.',
          icon: Scale,
          features: ['Capital Allocation Maps', 'Regulatory Compliance Docs', 'Supply Chain Audits']
        },
        { 
          title: 'The Identity', 
          desc: 'Custom Marketing Kits including AI-generated brand assets, social strategies, and high-integrity messaging frameworks.', 
          icon: Building2,
          features: ['Brand Asset Generation', 'Mission-Led Messaging', 'Social Media Playbooks']
        },
        { 
          title: 'The Authority', 
          desc: 'Specialist SEO Audits that focus on "Trust Signals" and "Organic Semantic Reach" to dominate local and global search rankings.', 
          icon: Shield,
          features: ['Trust Signal Analysis', 'Semantic Keyword Maps', 'Competitor Greenwash Audits']
        }
      ].map((card, i) => (
        <div key={i} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-xl space-y-8 hover:border-emerald-500 transition-all group flex flex-col">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-50 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <card.icon className="w-7 h-7 md:w-8 md:h-8" />
          </div>
          <div className="space-y-4 flex-grow">
            <h3 className="text-2xl font-black uppercase">{card.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">{card.desc}</p>
          </div>
          <ul className="space-y-2 pt-6 border-t border-gray-50">
            {card.features.map((feat, j) => (
              <li key={j} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                <CheckCircle2 className="w-3 h-3" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="bg-gray-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden mx-4 md:mx-0">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <TrendingUp className="w-64 h-64" />
      </div>
      <div className="space-y-6 max-w-2xl relative z-10 text-center lg:text-left">
        <h3 className="text-3xl md:text-5xl font-black uppercase italic">Ready to Scale your Pure Mission?</h3>
        <p className="text-lg md:text-xl text-gray-400">
          Join the 500+ organic ventures using Landry Industries infrastructure to build a more transparent future.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
            100% Purity Guaranteed
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
            AI-Powered Audits
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full md:w-auto">
        <button className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-emerald-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-widest text-base md:text-lg flex items-center justify-center gap-4 hover:bg-white hover:text-emerald-600 transition-all shadow-xl relative z-10">
          Access The Suite
          <ArrowRight className="w-6 h-6" />
        </button>
        <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-black">
          Powered by Organic Bob v2.0
        </p>
      </div>
    </div>
  </div>
);

export const TermsOfService: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 space-y-12">
    <div className="text-center space-y-4 px-4">
      <Scale className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto" />
      <h2 className="text-3xl md:text-5xl font-black uppercase italic">Terms of Service</h2>
    </div>
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl space-y-10 text-gray-600 leading-relaxed mx-4 md:mx-0">
      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">1. Acceptance of Terms</h3>
        <p>By accessing Search For Organics, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">2. Organic Integrity & Use License</h3>
        <p>You agree to use this platform exclusively for the advancement of organic integrity. You are granted a limited license to use Bob's AI tools for individual or business auditing. You may not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Attempt to reverse engineer the Organic Bob neural architecture.</li>
          <li>Use the platform to mask non-organic supply chains.</li>
          <li>Scrape directory data for commercial reselling without explicit consent from Landry Industries.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">3. Disclaimer & AI Accuracy</h3>
        <p>Organic Bob's scores and insights are generated via AI analysis and grounding data. While we strive for 100% accuracy, these reports are intended as a guide. They do not replace official government or third-party organic certification (e.g., USDA Organic, EU Organic). All growth suite reports are provided "as is" with no warranties, expressed or implied.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">4. Corporate Governance</h3>
        <p>Search For Organics is a division of Landry Industries. Any legal disputes arising from the use of this platform shall be governed by the laws of the Province of New Brunswick, Canada.</p>
      </section>
    </div>
  </div>
);

export const Sitemap: React.FC<{ onNavigate: (tab: any) => void }> = ({ onNavigate }) => (
  <div className="max-w-6xl mx-auto py-12 space-y-16">
    <div className="text-center space-y-4 px-4">
      <MapIcon className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto" />
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-organic-green-dark">Universal Sitemap</h2>
      <p className="text-gray-500 font-medium italic">A Complete Index of All Global Purity Infrastructure & Modules</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
      {/* Category 1: Core Search & Consumer */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Core Search & Consumer
        </h3>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'search', label: 'Organic Search Engine', desc: 'Real-time global organic intelligence.' },
            { id: 'basket', label: 'Basket Optimizer', desc: 'Optimize your organic grocery shopping.' },
            { id: 'microbiome', label: 'Microbiome Health', desc: 'Gut health & dietary organic impact.' },
            { id: 'community', label: 'Community Hub', desc: 'Connect with conscious consumers.' },
            { id: 'tips', label: 'Organic Tips', desc: 'Expert guides for green living.' }
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="group text-left p-3.5 bg-gray-50/50 hover:bg-emerald-50/50 rounded-2xl border border-gray-100 transition-all">
              <p className="font-black uppercase text-xs text-gray-900 group-hover:text-emerald-700">{item.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Category 2: Traceability & Agriculture */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Traceability & Farms
        </h3>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'usda', label: 'USDA Traceability', desc: 'Official NOP organic database sync.' },
            { id: 'csa', label: 'CSA Farm Shares', desc: 'Connect with local community supported agriculture.' },
            { id: 'carbon', label: 'Soil Carbon', desc: 'Regenerative agriculture carbon metrics.' },
            { id: 'wholesale', label: 'B2B Wholesale', desc: 'Bulk organic supplier network.' },
            { id: 'swap', label: 'Produce Swap', desc: 'Local organic grower exchange.' },
            { id: 'route', label: 'Farm Route Planner', desc: 'Mapping local organic supply chains.' }
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="group text-left p-3.5 bg-gray-50/50 hover:bg-emerald-50/50 rounded-2xl border border-gray-100 transition-all">
              <p className="font-black uppercase text-xs text-gray-900 group-hover:text-emerald-700">{item.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Category 3: Verification & Science */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Verification & Science
        </h3>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'scanner', label: 'Greenwash Scan', desc: 'Instant label & barcode integrity audit.' },
            { id: 'audit', label: 'Authority Audit', desc: 'Technical signals & growth analysis.' },
            { id: 'calc', label: 'Hempoxies™ Hub', desc: 'Material science & eco calculators.' },
            { id: 'intelligence', label: 'Purity Hub', desc: 'Lexicon, Tracer & Live Rankings.' }
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="group text-left p-3.5 bg-gray-50/50 hover:bg-emerald-50/50 rounded-2xl border border-gray-100 transition-all">
              <p className="font-black uppercase text-xs text-gray-900 group-hover:text-emerald-700">{item.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Category 4: Business & Growth Suite */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Business & Growth Suite
        </h3>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'workshops', label: 'Workshops & Marketing', desc: 'Strategic training and growth plans.' },
            { id: 'businessPlan', label: 'Business Blueprint', desc: 'Mission-aligned capital docs.' },
            { id: 'marketingKit', label: 'Brand Kit', desc: 'Visual identity & marketing assets.' },
            { id: 'seoReport', label: 'SEO Audit', desc: 'Search domination for pure brands.' },
            { id: 'devApi', label: 'Developer API', desc: 'Integrate organic intelligence endpoints.' },
            { id: 'sales', label: 'Venture Acceleration', desc: 'Access the full Landry Suite.' }
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="group text-left p-3.5 bg-gray-50/50 hover:bg-emerald-50/50 rounded-2xl border border-gray-100 transition-all">
              <p className="font-black uppercase text-xs text-gray-900 group-hover:text-emerald-700">{item.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Category 5: Intelligence, Support & Governance */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Support, Governance & Legal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'chat', label: 'Ask Organic Bob', desc: '24/7 AI Organic Spymaster & Specialist.' },
            { id: 'info', label: 'What is Organic?', desc: 'Manifesto & true purity standards.' },
            { id: 'faq', label: 'Support Center', desc: 'Frequently asked questions.' },
            { id: 'about', label: 'About Mission', desc: 'The Landry Industries manifesto.' },
            { id: 'contact', label: 'Contact Lab', desc: 'Get grounded with our team.' },
            { id: 'certification', label: 'Certification Protocol', desc: 'Molecular integrity standards.' },
            { id: 'partnership', label: 'Pure-Net Partnerships', desc: 'B2B infrastructure integration.' },
            { id: 'privacy', label: 'Privacy Policy', desc: 'Radical data transparency.' },
            { id: 'ownership', label: 'Ownership', desc: 'Landry Industries governance.' },
            { id: 'affiliate', label: 'Affiliate Disclosure', desc: 'Revenue integrity model.' },
            { id: 'terms', label: 'Terms of Service', desc: 'Platform usage standards.' }
          ].map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="group text-left p-3.5 bg-gray-50/50 hover:bg-emerald-50/50 rounded-2xl border border-gray-100 transition-all">
              <p className="font-black uppercase text-xs text-gray-900 group-hover:text-emerald-700">{item.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);
