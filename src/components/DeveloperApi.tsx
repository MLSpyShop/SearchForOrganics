import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Key, Copy, Check, Terminal, Database, Sparkles, 
  ExternalLink, Play, Server, Shield, BookOpen
} from 'lucide-react';

interface EndpointSpec {
  method: 'GET' | 'POST';
  path: string;
  title: string;
  description: string;
  sampleRequest?: object;
  sampleResponse: object;
}

const ENDPOINTS: EndpointSpec[] = [
  {
    method: 'GET',
    path: '/api/v1/usda/lookup?certNumber=CCOF-ORG-993821',
    title: 'USDA Organic Integrity Operation Lookup',
    description: 'Query active or revoked status against the USDA NOP database by operation certificate ID.',
    sampleResponse: {
      status: 'success',
      data: {
        certNumber: 'CCOF-ORG-993821',
        operationName: 'Cascadia Heritage Organic Farms LLC',
        certifier: 'California Certified Organic Farmers (CCOF)',
        status: 'Active / Certified',
        scopes: ['Crops', 'Handling'],
        effectiveDate: '2016-04-12'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/barcode/scan',
    title: 'UPC Barcode Purity & Additive Evaluation',
    description: 'Analyze packaged food UPC for synthetic additives, bioengineered inputs, and USDA organic verification.',
    sampleRequest: {
      barcode: '073410013508',
      includeAlternatives: true
    },
    sampleResponse: {
      status: 'success',
      productName: 'Sprouted Rolled Heritage Oats',
      brand: 'One Degree Organic Foods',
      purityScore: 99,
      usdaNopStatus: 'Verified Active',
      heavyMetalRisk: 'very_low',
      glyphosateTested: true,
      cleanAlternatives: ['Bob’s Red Mill Organic Rolled Oats']
    }
  },
  {
    method: 'GET',
    path: '/api/v1/microbiome/crops?crop=strawberries',
    title: 'Microbiome & Soil Polyphenol Bioavailability',
    description: 'Retrieve secondary metabolite ratios, antioxidant ORAC scores, and gut microbiome pathways.',
    sampleResponse: {
      crop: 'Organic Strawberries',
      polyphenolMultiplier: 1.38,
      antioxidantOracValue: 5938,
      pesticideResidueReductionPct: 99.8,
      keyPhytochemicals: ['Ellagitannins', 'Pelargonidin Anthocyanins', 'Quercetin']
    }
  },
  {
    method: 'POST',
    path: '/api/v1/carbon/estimate',
    title: 'Regenerative Soil Carbon Sequestration Engine',
    description: 'Estimate tCO₂e sequestered per year, SOM percentage gain, and voluntary carbon credit revenue.',
    sampleRequest: {
      acres: 120,
      practices: ['cover_crops', 'no_till', 'biochar_compost'],
      carbonPricePerTon: 35
    },
    sampleResponse: {
      acres: 120,
      annualCo2eSequesteredTons: 324.0,
      fiveYearCo2eTotalTons: 1620.0,
      soilOrganicMatterIncreasePct: 1.22,
      netFarmerPayoutUsd: 9299,
      verraProtocolEligible: true
    }
  }
];

export const DeveloperApi: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointSpec>(ENDPOINTS[0]);
  const [apiKey, setApiKey] = useState<string>('sfo_live_99d8e72c81a942bf901a');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'curl' | 'js' | 'python'>('curl');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeSnippet = () => {
    if (activeLang === 'curl') {
      if (selectedEndpoint.method === 'GET') {
        return `curl -X GET "https://api.searchfororganic.com${selectedEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Accept: application/json"`;
      } else {
        return `curl -X POST "https://api.searchfororganic.com${selectedEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(selectedEndpoint.sampleRequest || {}, null, 2)}'`;
      }
    } else if (activeLang === 'js') {
      return `const response = await fetch("https://api.searchfororganic.com${selectedEndpoint.path}", {
  method: "${selectedEndpoint.method}",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  }${selectedEndpoint.sampleRequest ? `,\n  body: JSON.stringify(${JSON.stringify(selectedEndpoint.sampleRequest, null, 2)})` : ''}
});

const data = await response.json();
console.log(data);`;
    } else {
      return `import requests

url = "https://api.searchfororganic.com${selectedEndpoint.path}"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}

${selectedEndpoint.sampleRequest ? `payload = ${JSON.stringify(selectedEndpoint.sampleRequest, null, 4)}\nresponse = requests.${selectedEndpoint.method.toLowerCase()}(url, json=payload, headers=headers)` : `response = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers)`}

print(response.json())`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            Public Developer API & Open Data
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Programmatic Organic Intelligence API
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Integrate certified organic verification, additive scanners, soil carbon models, and food-as-medicine microbiome data directly into your apps and enterprise pipelines.
          </p>
        </div>
      </div>

      {/* API Key Box */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-gray-400 tracking-wider">Your Developer Sandbox API Key</p>
            <p className="font-mono text-sm font-bold text-gray-900">{apiKey}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black">
            Rate Limit: 5,000 req/hr
          </span>
          <button
            onClick={() => copyToClipboard(apiKey)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Key'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Endpoint Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
            Available REST Endpoints
          </h3>

          <div className="space-y-2">
            {ENDPOINTS.map(ep => (
              <button
                key={ep.path}
                onClick={() => setSelectedEndpoint(ep)}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  selectedEndpoint.path === ep.path 
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-md' 
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                    ep.method === 'GET' ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-[11px] truncate opacity-90">{ep.path.split('?')[0]}</span>
                </div>
                <p className="font-bold text-xs">{ep.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Code Snippet & Interactive Response Console (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-950 text-white rounded-[2.5rem] p-6 border border-emerald-900/50 shadow-2xl space-y-4">
            {/* Header & Language Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Endpoint Playground</span>
                <h4 className="text-base font-black text-white mt-0.5">{selectedEndpoint.title}</h4>
              </div>

              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                {(['curl', 'js', 'python'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                      activeLang === lang ? 'bg-emerald-700 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Block */}
            <div className="relative">
              <pre className="p-4 bg-black/60 rounded-2xl font-mono text-xs text-emerald-300 overflow-x-auto border border-white/5 leading-relaxed">
                {getCodeSnippet()}
              </pre>
              <button
                onClick={() => copyToClipboard(getCodeSnippet())}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-colors"
                title="Copy snippet"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Response Mock Terminal */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>Response (200 OK — application/json):</span>
                <span className="text-emerald-400">~28ms latency</span>
              </div>
              <pre className="p-4 bg-black/80 rounded-2xl font-mono text-xs text-gray-200 overflow-x-auto border border-emerald-500/20 max-h-64 leading-relaxed">
                {JSON.stringify(selectedEndpoint.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
