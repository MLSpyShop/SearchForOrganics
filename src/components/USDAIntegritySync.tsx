import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, ShieldCheck, Search, CheckCircle2, AlertTriangle, FileText, 
  MapPin, Calendar, QrCode, ExternalLink, RefreshCw, Sparkles, Building2
} from 'lucide-react';
import { USDACertificateRecord, FarmBatchRecord } from '../../types';

const SAMPLE_CERTIFICATES: USDACertificateRecord[] = [
  {
    certNumber: 'CCOF-ORG-993821',
    operationName: 'Cascadia Heritage Organic Farms LLC',
    certifier: 'CCOF (California Certified Organic Farmers)',
    status: 'Active / Certified',
    effectiveDate: '2016-04-12',
    certifiedScopes: ['Crops (Berries, Kale, Heirloom Tomatoes)', 'Handling & Processing'],
    physicalAddress: '1420 Valley Green Rd, Skagit County, WA 98273',
    contactPerson: 'Elena Thorne (Director of Agronomy)'
  },
  {
    certNumber: 'OT-2024-004128',
    operationName: 'High Prairie Regenerative Pastures',
    certifier: 'Oregon Tilth Certified Organic (OTCO)',
    status: 'Active / Certified',
    effectiveDate: '2019-08-20',
    certifiedScopes: ['Livestock (Pastured Eggs, Grass-Fed Dairy)', 'Pasture & Forage'],
    physicalAddress: '882 Willamette Ridge Way, Eugene, OR 97401',
    contactPerson: 'Marcus Vance'
  },
  {
    certNumber: 'QAI-SUSP-772109',
    operationName: 'Sunset Valley Agro-Processors (Flagged)',
    certifier: 'Quality Assurance International (QAI)',
    status: 'Suspended',
    effectiveDate: '2023-11-05 (Suspended 2026-02-14)',
    certifiedScopes: ['Grain Import & Packaging'],
    physicalAddress: 'Industrial Corridor Gate 4, Newark, NJ 07114',
    contactPerson: 'Compliance Officer'
  }
];

const SAMPLE_BATCHES: FarmBatchRecord[] = [
  {
    batchId: 'LOT-2026-ORG-8841',
    farmName: 'Cascadia Heritage Organic Farms',
    cropName: 'Wild Mountain Organic Blueberries',
    harvestDate: '2026-07-28',
    fieldPlotNumber: 'Plot North-7B (Sub-Alpine Zone)',
    gpsCoordinates: { lat: 48.4284, lng: -122.3361 },
    soilAssayOrganicMatterPct: 6.8,
    pesticideScreenResult: 'ND (<0.01 ppm)',
    certifierLogo: 'CCOF'
  },
  {
    batchId: 'BATCH-HAZEL-092',
    farmName: 'Willamette Valley Sprouted Nuts Co.',
    cropName: 'Organic Certified Raw Hazelnuts',
    harvestDate: '2026-08-02',
    fieldPlotNumber: 'Orchard Block 3 (River Bench)',
    gpsCoordinates: { lat: 44.0521, lng: -123.0868 },
    soilAssayOrganicMatterPct: 5.4,
    pesticideScreenResult: 'ND (<0.01 ppm)',
    certifierLogo: 'Oregon Tilth'
  },
  {
    batchId: 'LOT-HONEY-5510',
    farmName: 'Olympic Rainforest Eco-Apiary',
    cropName: '100% Raw Wildflower Forest Honey',
    harvestDate: '2026-08-10',
    fieldPlotNumber: 'Hive Yard Alpha (Zero Agrochemical Buffer Zone)',
    gpsCoordinates: { lat: 47.8021, lng: -123.6044 },
    soilAssayOrganicMatterPct: 8.1,
    pesticideScreenResult: 'Passed Comprehensive Screening',
    certifierLogo: 'Demeter Biodynamic'
  }
];

export const USDAIntegritySync: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'oid' | 'batch'>('oid');
  const [oidQuery, setOidQuery] = useState('');
  const [batchQuery, setBatchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<FarmBatchRecord>(SAMPLE_BATCHES[0]);

  const filteredCerts = SAMPLE_CERTIFICATES.filter(c => 
    c.operationName.toLowerCase().includes(oidQuery.toLowerCase()) ||
    c.certNumber.toLowerCase().includes(oidQuery.toLowerCase()) ||
    c.certifier.toLowerCase().includes(oidQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Database className="w-3.5 h-3.5" />
            USDA Organic Integrity Database (OID) & Traceability
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Real-Time Organic Certification & Lot Batch Audit
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Verify legitimate USDA NOP operations, uncover suspended or revoked sham certs, and inspect batch-level soil assay reports, GPS coordinates, and pesticide screening sheets.
          </p>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-sm max-w-md">
        <button
          onClick={() => setActiveSubTab('oid')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'oid' ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-600 hover:text-emerald-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> USDA OID Operations
        </button>
        <button
          onClick={() => setActiveSubTab('batch')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'batch' ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-600 hover:text-emerald-900'
          }`}
        >
          <QrCode className="w-4 h-4" /> Lot Batch Traceability
        </button>
      </div>

      {/* Mode 1: USDA OID Database Search */}
      {activeSubTab === 'oid' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by farm operation name, USDA cert # (e.g. CCOF-ORG-993821), or certifier..."
                value={oidQuery}
                onChange={(e) => setOidQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map(cert => (
              <div
                key={cert.certNumber}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      cert.status.includes('Active') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {cert.status.includes('Active') ? '✓ ' + cert.status : '⚠️ ' + cert.status}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 font-bold">{cert.certNumber}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-base text-gray-900 leading-snug">{cert.operationName}</h4>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">{cert.certifier}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{cert.physicalAddress}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      Effective Date: <span className="font-bold text-gray-800">{cert.effectiveDate}</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Certified Scopes</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.certifiedScopes.map((scope, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-700">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-gray-400">Contact: {cert.contactPerson.split(' ')[0]}</span>
                  <a
                    href="https://organic.usda.gov/integrity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-900 font-black text-[11px] uppercase flex items-center gap-1"
                  >
                    USDA OID Sheet <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Batch & Lot Code Traceability */}
      {activeSubTab === 'batch' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Preset Batch Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-lg space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-700" /> Active Verified Farm Batches
              </h4>
              <div className="space-y-2">
                {SAMPLE_BATCHES.map(b => (
                  <button
                    key={b.batchId}
                    onClick={() => setSelectedBatch(b)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      selectedBatch.batchId === b.batchId 
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' 
                        : 'bg-gray-50/80 hover:bg-gray-100 border-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">{b.batchId}</p>
                    <p className="font-black text-sm">{b.cropName}</p>
                    <p className={`text-[10px] font-medium ${selectedBatch.batchId === b.batchId ? 'text-emerald-200' : 'text-gray-500'}`}>
                      {b.farmName}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deep Lot Certificate Sheet (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                  <span className="font-mono text-xs font-black bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    {selectedBatch.batchId}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">{selectedBatch.cropName}</h3>
                  <p className="text-xs font-bold text-emerald-800 mt-1">{selectedBatch.farmName}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-right">
                  <p className="text-[10px] font-black uppercase text-emerald-800">Certifying Body</p>
                  <p className="text-xl font-black text-emerald-950">{selectedBatch.certifierLogo}</p>
                </div>
              </div>

              {/* Harvest & Field Geolocation Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Harvest Date</p>
                  <p className="font-bold text-gray-900">{selectedBatch.harvestDate}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Field Plot & Buffer</p>
                  <p className="font-bold text-gray-900">{selectedBatch.fieldPlotNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Soil Organic Matter (SOM)</p>
                  <p className="font-bold text-emerald-800 text-base">{selectedBatch.soilAssayOrganicMatterPct}% SOM (High Microbial Bioactivity)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400">Pesticide Residue Screen</p>
                  <p className="font-bold text-emerald-800 text-base flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {selectedBatch.pesticideScreenResult}
                  </p>
                </div>
              </div>

              {/* Coordinates Map Callout */}
              <div className="p-5 bg-gradient-to-r from-emerald-950 to-teal-950 text-white rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">GPS Origin Coordinates</p>
                    <p className="font-mono text-xs text-white">
                      {selectedBatch.gpsCoordinates.lat.toFixed(4)}° N, {selectedBatch.gpsCoordinates.lng.toFixed(4)}° W
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${selectedBatch.gpsCoordinates.lat},${selectedBatch.gpsCoordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  View Field <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
