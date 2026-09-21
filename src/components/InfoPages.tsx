import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, Award, Mail, MapPin, Phone, MessageSquare, 
  ShieldCheck, CheckCircle2, Building2, Globe, Heart, Sprout,
  Handshake
} from 'lucide-react';
import { cn } from '../lib/utils';

/* --- About Page --- */
export const AboutPage: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-20 pb-20">
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <Users className="w-4 h-4" />
        The Human Element
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">The Landry <br/>Manifesto</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-serif">
        "Search For Organics is more than a tool; it is a digital defense system for biological sovereignty."
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl space-y-6">
          <Target className="w-12 h-12 text-emerald-600" />
          <h3 className="text-2xl font-black uppercase tracking-tight">Our Mission</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Landry Industries founded Search For Organics to solve the "Trust Gap" in the global food and cosmetic supply chain. As multinational conglomerates purchase boutique organic brands, the standards of purity often erode. Our mission is to provide the data grounding required to keep organic standards high.
          </p>
        </div>
        <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white shadow-2xl space-y-6">
          <Award className="w-12 h-12 text-emerald-400" />
          <h3 className="text-2xl font-black uppercase tracking-tight text-emerald-400">The 100% Purity Mandate</h3>
          <p className="text-emerald-50 leading-relaxed font-medium">
            We operate on the principle that "organic" is not a marketing term—it is a physical reality. If an ingredient list doesn't survive Bob's molecular audit, it doesn't enter our directory. No exceptions.
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl space-y-6">
          <Building2 className="w-12 h-12 text-emerald-600" />
          <h3 className="text-2xl font-black uppercase tracking-tight">Landry Industries</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Under the leadership of Marie Landry, Landry Industries has expanded from specialized material science (Hempoxies™) into global organic infrastructure. We believe that industrial efficiency and organic purity can coexist through advanced AI and radical transparency.
          </p>
        </div>
        <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">The Leadership Philosophy</p>
          <p className="text-lg font-serif italic text-gray-600">
            "We don't build apps; we build ecosystems. Search For Organics is the root system of a new, high-integrity economy."
          </p>
          <p className="text-gray-400 font-bold text-sm">— Marie Landry, CEO</p>
        </div>
      </div>
    </div>
  </div>
);

/* --- Contact Page --- */
export const ContactPage: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-20 pb-20">
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <MessageSquare className="w-4 h-4" />
        Get Grounded
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Contact <br/>The Lab</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Have a technical question about an ingredient? Want to register your farm? Reach out to the Landry Industries organic infrastructure team.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Purity</p>
              <p className="font-bold text-gray-900">support@landryindustries.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global HQ</p>
              <p className="font-bold text-gray-900">12 Organic Way, Soil District</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Direct Line</p>
              <p className="font-bold text-gray-900">+1 (555) ORGANIC</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-4">
          <h4 className="font-black uppercase tracking-tight text-emerald-400">Response Times</h4>
          <p className="text-sm text-gray-300 leading-relaxed font-medium">
            Our AI-triage system (Organic Bob) answers 95% of queries instantly. For complex human audits, please allow 24-48 hours.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <form className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-2xl space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" placeholder="Marie Landry" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" placeholder="marie@landry.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
            <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold">
              <option>General Inquiry</option>
              <option>Brand Verification Request</option>
              <option>Farm Directory Submission</option>
              <option>Technical Ingredient Audit</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
            <textarea rows={5} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" placeholder="How can Organic Bob help you today?"></textarea>
          </div>
          <button className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-xl uppercase tracking-widest">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

/* --- Certification Page --- */
export const CertificationPage: React.FC = () => (
  <div className="max-w-6xl mx-auto space-y-20 pb-20">
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <ShieldCheck className="w-4 h-4" />
        Verification Infrastructure
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">Bob-Verified <br/>Protocol</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        The most rigorous organic trust-mark in the digital age. We don't just verify paperwork; we verify the molecular integrity of the supply chain.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          step: "01", 
          title: "Technical Audit", 
          desc: "Full 50-point technical SEO and content integrity scan to ensure digital transparency matches physical reality.",
          icon: Globe
        },
        { 
          step: "02", 
          title: "Chain of Custody", 
          desc: "Deep-layer audit of raw material provenance, including satellite soil scans and invoice verification.",
          icon: MapPin
        },
        { 
          step: "03", 
          title: "Molecular Scan", 
          desc: "Randomized lab testing and AI-powered label analysis to detect hidden synthetics or processing aids.",
          icon: Sprout
        }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gray-50 group-hover:text-emerald-50 transition-colors leading-none -mr-4 -mt-4">
            {item.step}
          </div>
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 relative z-10">
            <item.icon className="w-8 h-8" />
          </div>
          <div className="relative z-10 space-y-3">
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <div className="p-12 md:p-20 space-y-12">
        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter italic">Why Pursue Verification?</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            A 'Bob-Verified' Trust Mark is a signal to high-conscious consumers that your brand is immune to greenwashing. 
          </p>
        </div>
        <div className="space-y-6">
          {[
            "Prioritized Search Visibility",
            "Farm Route Integration",
            "Molecular Integrity Badge",
            "Radical Transparency Listing"
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-4 text-gray-900 font-black uppercase tracking-widest text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {benefit}
            </div>
          ))}
        </div>
        <button 
          className="w-full md:w-auto px-12 py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-xl"
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'contact' }))}
        >
          Start Verification
        </button>
      </div>
      <div className="bg-emerald-900 p-12 md:p-20 text-white flex flex-col justify-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ShieldCheck className="w-full h-full -rotate-12 scale-150" />
        </div>
        <div className="relative z-10 space-y-6">
          <h4 className="text-2xl font-black uppercase tracking-tight text-emerald-400">The Universal Declaration</h4>
          <p className="text-xl font-serif italic text-emerald-50 leading-relaxed">
            "We only certify what we can prove. Every verified entity is a victory for the soil and the sovereignty of the individual."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">Standards Board</p>
              <p className="font-bold">Landry Industries Purity Council</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- Partnership Page --- */
export const PartnershipPage: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-20 pb-20">
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <Handshake className="w-4 h-4" />
        B2B Infrastructure
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-display tracking-tight leading-none uppercase italic">The Pure-Net <br/>Partnership</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Scale your organic impact by integrating your brand into the Search For Organics ecosystem. We help high-integrity vendors reach a global audience of conscious consumers.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl space-y-8">
        <h3 className="text-2xl font-black uppercase tracking-tight">For Brands & Farms</h3>
        <p className="text-gray-500 leading-relaxed font-medium">
          Whether you are a hyper-local farm or a national organic brand, joining our directory ensures you are visible to consumers using Bob's AI grounding.
        </p>
        <ul className="space-y-4">
          {[
            "Direct-to-Consumer Connectivity",
            "Farm Route Mapping",
            "Trust-Mark Licensing",
            "Supply Chain Visibility"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              {item}
            </li>
          ))}
        </ul>
        <button 
          className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all"
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'contact' }))}
        >
          Apply for Directory Listing
        </button>
      </div>

      <div className="bg-emerald-50 rounded-[3rem] p-10 border border-emerald-100 shadow-xl space-y-8">
        <h3 className="text-2xl font-black uppercase tracking-tight text-emerald-900">For Organizations</h3>
        <p className="text-emerald-800 leading-relaxed font-medium">
          Partner with Landry Industries to leverage our AI auditing tools for your certification group, co-op, or regional association.
        </p>
        <ul className="space-y-4">
          {[
            "Custom API Integration",
            "Bulk Certification Audits",
            "Regional Purity Maps",
            "Data Grounding Services"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              {item}
            </li>
          ))}
        </ul>
        <button 
          className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-900 transition-all shadow-lg"
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'contact' }))}
        >
          Inquire About Enterprise
        </button>
      </div>
    </div>
  </div>
);
