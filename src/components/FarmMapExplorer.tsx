import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, ShieldCheck, Leaf, Search, Compass, Globe } from 'lucide-react';
import { UserLocation } from '../../types';

interface Farm {
  id: string;
  name: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  certifications: string[];
  description: string;
  specialty: string;
  website: string;
  imageUrl: string;
}

const SAMPLE_FARMS: Farm[] = [
  {
    id: 'farm_codiac',
    name: 'Codiac Organics Farm & CSA',
    category: 'Produce & Vegetables',
    location: 'Moncton, New Brunswick',
    coordinates: { lat: 46.0878, lng: -64.7782 },
    certifications: ['Canada Organic', 'Ecocert Canada'],
    description: 'Certified organic urban farm producing fresh seasonal roots, greens, and heirloom vegetables.',
    specialty: 'Organic Potatoes & Kale',
    website: 'https://codiacorganics.ca',
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'farm_natures_route',
    name: "Nature's Route Farm",
    category: 'Organic Fruits & Vegetables',
    location: 'Moncton / Dieppe, NB',
    coordinates: { lat: 46.0950, lng: -64.7500 },
    certifications: ['Canada Organic'],
    description: 'Family-run certified organic vegetable and small fruit farm serving southeastern NB.',
    specialty: 'Organic Berries & Heirloom Tomatoes',
    website: 'https://www.naturesroutefarm.ca',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'farm_straus',
    name: 'Straus Family Creamery & Dairy',
    category: 'Organic Dairy & Milk',
    location: 'Marshall, California',
    coordinates: { lat: 38.2241, lng: -122.9064 },
    certifications: ['USDA Organic', 'Non-GMO Project Verified'],
    description: 'First 100% certified organic creamery in the US, supporting sustainable regenerative family farming.',
    specialty: 'Organic Whole Milk & Butter',
    website: 'https://www.strausfamilycreamery.com',
    imageUrl: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'farm_lundberg',
    name: 'Lundberg Family Farms',
    category: 'Regenerative Grains & Rice',
    location: 'Richvale, California',
    coordinates: { lat: 39.4316, lng: -121.7058 },
    certifications: ['Regenerative Organic Certified (ROC)', 'USDA Organic'],
    description: 'Multi-generation family farm producing certified organic and regenerative rice and grains.',
    specialty: 'Regenerative Organic Brown Rice',
    website: 'https://www.lundberg.com',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'farm_organic_valley',
    name: 'Organic Valley Cooperative',
    category: 'Farmer-Owned Co-Op',
    location: 'La Farge, Wisconsin',
    coordinates: { lat: 43.5653, lng: -90.6429 },
    certifications: ['USDA Organic', 'Certified Grass-Fed'],
    description: 'Cooperative of over 1,600 certified organic family farmers producing pasture-raised dairy and eggs.',
    specialty: 'Grass-Fed Milk & Pasture Butter',
    website: 'https://www.organicvalley.coop',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
  }
];

export const FarmMapExplorer: React.FC<{ userLocation: UserLocation | null }> = ({ userLocation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFarm, setActiveFarm] = useState<Farm>(SAMPLE_FARMS[0]);

  const categories = ['All', 'Produce & Vegetables', 'Organic Dairy & Milk', 'Regenerative Grains & Rice', 'Farmer-Owned Co-Op'];

  const filteredFarms = selectedCategory === 'All' 
    ? SAMPLE_FARMS 
    : SAMPLE_FARMS.filter(f => f.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>Interactive Farm & Producer Navigator</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Certified Organic Farm Map</h2>
        <p className="text-sm font-medium text-gray-600 max-w-xl mx-auto">
          Explore verified organic farms, regenerative cooperatives, and CSA community food hubs near your region.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-organic-green text-white shadow-md shadow-organic-green/20'
                : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Farm Cards List */}
        <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2">
          {filteredFarms.map(farm => (
            <div
              key={farm.id}
              onClick={() => setActiveFarm(farm)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer text-left bg-white relative overflow-hidden group ${
                activeFarm.id === farm.id
                  ? 'border-organic-green ring-2 ring-organic-green/20 shadow-xl'
                  : 'border-gray-100 hover:border-emerald-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <img src={farm.imageUrl} alt={farm.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {farm.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-organic-green transition-colors truncate">{farm.name}</h3>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-organic-green shrink-0" />
                    <span className="truncate">{farm.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Farm Detail Panel */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-inner">
              <img src={activeFarm.imageUrl} alt={activeFarm.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-emerald-900 uppercase tracking-widest">
                    {activeFarm.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">{activeFarm.name}</h3>
                  <p className="text-xs text-emerald-200 font-bold flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeFarm.location}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Certified Standards</p>
                <div className="flex flex-wrap gap-2">
                  {activeFarm.certifications.map(c => (
                    <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 text-xs font-black rounded-xl border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-organic-green" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Specialty Harvest</p>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-black text-gray-900">{activeFarm.specialty}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Farm Bio & Practices</p>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{activeFarm.description}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Verified GPS: [{activeFarm.coordinates.lat.toFixed(4)}, {activeFarm.coordinates.lng.toFixed(4)}]</span>
            </div>
            <a
              href={activeFarm.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-organic-green hover:bg-organic-green-dark text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-organic-green/20"
            >
              <span>Visit Producer Official Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
