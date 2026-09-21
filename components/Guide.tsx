import React from 'react';
import { BrainCircuit, Leaf, Search } from 'lucide-react';

export const Guide: React.FC = () => (
  <section className="container mx-auto px-6 py-16 max-w-3xl border-t border-organic-green/10 mt-16">
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-organic-green-dark uppercase tracking-tight">Platform Guide</h2>
      </div>

      <div className="text-gray-700 font-medium leading-relaxed space-y-6">
        <p>
          Welcome to <span className="text-organic-green-dark font-black">Search For Organics</span>. We are the intersection of truth, sustainability, and innovation in the organic space.
        </p>
        
        <h3 className="font-black text-organic-green-dark uppercase flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-organic-green" /> Meet Organic Bob
        </h3>
        <p>
          <span className="font-black italic text-organic-green-dark">Organic Bob</span> is your multifaceted AI expert.
          Expertise spans:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none pl-0 text-sm">
          {[
            { title: "Organic SEO", desc: "Certification-driven visibility." },
            { title: "Business Growth", desc: "Sustainable, authentic scaling." },
            { title: "Organic Law", desc: "Rights & compliance." },
            { title: "Materials Science", desc: "Technical Hempoxies expertise." },
            { title: "Attraction Marketing", desc: "Building authentic trust." }
          ].map(item => (
            <li key={item.title} className="bg-cream/50 p-4 rounded-xl border border-organic-green/10">
              <span className="font-black text-organic-green-dark block">{item.title}</span>
              {item.desc}
            </li>
          ))}
        </ul>

        <h3 className="font-black text-organic-green-dark uppercase flex items-center gap-2">
          <Leaf className="w-5 h-5 text-organic-green" /> Authenticity & Search
        </h3>
        <p>
          We prioritize <span className="font-black text-organic-green-dark">validation</span>. We crawl official databases (USDA, EU Organic, GOTS) and ground results in trusted local geocoding. Our <span className="font-black text-organic-green-dark">Purity Calculation</span> helps audit transparency and protect against greenwashing.
        </p>

        <h3 className="font-black text-organic-green-dark uppercase flex items-center gap-2">
          <Search className="w-5 h-5 text-organic-green" /> How to Start
        </h3>
        <p className="text-sm">
          1. <strong>Ask Bob:</strong> Use the chat for SEO tips, Hempoxies science, or local farm discovery.
          <br/>
          2. <strong>Search Locally:</strong> Find genuine goods near you.
          <br/>
          3. <strong>Deep Dive:</strong> Explore our manifestos and partnerships.
        </p>
      </div>
    </div>
  </section>
);
