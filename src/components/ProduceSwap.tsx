import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MapPin, Plus, Leaf, Search, Mail, MessageSquare, 
  Sparkles, CheckCircle2, RefreshCw, X, Heart
} from 'lucide-react';
import { ProduceSwapListing } from '../../types';

const SAMPLE_SWAPS: ProduceSwapListing[] = [
  {
    id: 'swap-1',
    title: 'Surplus Organic Meyer Lemons (15 lbs)',
    gardenerName: 'Sarah Jenkins',
    location: 'North Ballard, Seattle, WA',
    distanceMiles: 2.4,
    type: 'Surplus Produce',
    organicGrowingMethod: 'Zero-Spray Permaculture Food Forest (Compost Tea Fed)',
    description: 'Our backyard tree produced an abundance of ripe, aromatic organic Meyer lemons! Perfect for juicing, preserving, or baking.',
    lookingInExchange: 'Looking for sourdough bread, fresh herbs (rosemary/thyme), or heirloom tomato seedlings.',
    postedDate: '2 hours ago',
    contactEmail: 'sarah.j.permaculture@gmail.com'
  },
  {
    id: 'swap-2',
    title: 'Cherokee Purple & Brandywine Heirloom Seeds',
    gardenerName: 'David Chen',
    location: 'Phinney Ridge, Seattle, WA',
    distanceMiles: 3.8,
    type: 'Heirloom Seeds',
    organicGrowingMethod: 'Certified Seed Saver (5-Year Open-Pollinated Strain)',
    description: 'Carefully fermented and dried non-GMO heirloom tomato seeds from our 2025 prize crop. 98% germination rate.',
    lookingInExchange: 'Open to rare heritage pole bean seeds, purple bell peppers, or garlic cloves.',
    postedDate: 'Yesterday',
    contactEmail: 'david.seedsaves@proton.me'
  },
  {
    id: 'swap-3',
    title: '150-Year-Old San Francisco Sourdough Starter Culture',
    gardenerName: 'Chef Mateo',
    location: 'Fremont, Seattle, WA',
    distanceMiles: 1.9,
    type: 'Fermentation Starter',
    organicGrowingMethod: 'Fed exclusively with organic sprouted rye & stoneground wheat',
    description: 'Vigorous, ultra-active wild lactobacillus sourdough culture with deep complex sour notes. Comes with easy feeding guide jar.',
    lookingInExchange: 'Free gift to any aspiring organic baker, or trade for home-canned organic jam/honey.',
    postedDate: '3 days ago',
    contactEmail: 'mateo.bakes@gmail.com'
  },
  {
    id: 'swap-4',
    title: 'Organic Lacinato Kale & Rainbow Chard Seedlings',
    gardenerName: 'Greenwood Community Garden',
    location: 'Greenwood, Seattle, WA',
    distanceMiles: 4.1,
    type: 'Live Seedlings',
    organicGrowingMethod: 'Started in organic worm-castings potting mix under LED lights',
    description: '12 robust kale and Swiss chard starts in compostable peat pots ready for garden soil planting.',
    lookingInExchange: 'Free community giveaway or trade for organic potting soil / coffee chaff.',
    postedDate: '4 days ago',
    contactEmail: 'greenwood.gardeners@gmail.com'
  }
];

export const ProduceSwap: React.FC = () => {
  const [swaps, setSwaps] = useState<ProduceSwapListing[]>(SAMPLE_SWAPS);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<ProduceSwapListing['type']>('Surplus Produce');
  const [newMethod, setNewMethod] = useState('100% Organic Backyard Garden (No Synthetic Sprays)');
  const [newDesc, setNewDesc] = useState('');
  const [newExchange, setNewExchange] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const filteredSwaps = swaps.filter(s => {
    const matchesType = selectedType === 'All' || s.type === selectedType;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handlePostListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newName.trim() || !newEmail.trim()) return;

    const newListing: ProduceSwapListing = {
      id: `swap-${Date.now()}`,
      title: newTitle.trim(),
      gardenerName: newName.trim(),
      location: newLocation.trim() || 'Neighborhood Local',
      distanceMiles: 1.5,
      type: newType,
      organicGrowingMethod: newMethod,
      description: newDesc.trim() || 'Organic backyard harvest ready for trade.',
      lookingInExchange: newExchange.trim() || 'Open to all organic produce or seed trades.',
      postedDate: 'Just now',
      contactEmail: newEmail.trim()
    };

    setSwaps([newListing, ...swaps]);
    setShowPostModal(false);
    // Reset
    setNewTitle('');
    setNewName('');
    setNewDesc('');
    setNewExchange('');
    setNewEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-teal-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-black uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            Produce Swap & Urban Gleaning Hub
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Local Produce, Heirloom Seed & Starter Exchange
          </h1>
          <p className="text-sm md:text-base text-teal-100/90 font-medium leading-relaxed">
            Trade backyard organic fruit abundance, share open-pollinated heirloom seeds, or gift sourdough starter cultures within your immediate neighborhood.
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Category Filters, and Post Action */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search produce surplus, heirloom seeds, or neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['All', 'Surplus Produce', 'Heirloom Seeds', 'Live Seedlings', 'Fermentation Starter'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedType === cat ? 'bg-emerald-800 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setShowPostModal(true)}
            className="ml-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" /> Post Swap Listing
          </button>
        </div>
      </div>

      {/* Swap Listings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSwaps.map(swap => (
          <div
            key={swap.id}
            className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {swap.type}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{swap.postedDate}</span>
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900 leading-snug">{swap.title}</h4>
                <p className="text-xs font-bold text-emerald-800 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {swap.location} ({swap.distanceMiles} miles away)
                </p>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100/60 text-[11px] text-emerald-950 font-medium">
                🌱 <strong>Growing Method:</strong> {swap.organicGrowingMethod}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {swap.description}
              </p>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Looking In Exchange:</p>
                <p className="text-gray-800 font-bold mt-0.5">{swap.lookingInExchange}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Gardener: <strong>{swap.gardenerName}</strong></span>
              <button
                onClick={() => setContactSuccess(swap.id)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs uppercase flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Message Gardener
              </button>
            </div>

            {contactSuccess === swap.id && (
              <div className="p-3 bg-emerald-950 text-white rounded-xl text-xs flex items-center justify-between animate-in fade-in">
                <span>Direct contact: <strong className="text-emerald-300">{swap.contactEmail}</strong></span>
                <button onClick={() => setContactSuccess(null)} className="text-gray-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post Swap Listing Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 border border-gray-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xl font-black text-gray-900">Post Local Produce / Seed Swap</h3>
              <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostListing} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surplus Heirloom Slicer Tomatoes (10 lbs)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 uppercase text-[10px]">Your Name / Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 uppercase text-[10px]">Neighborhood / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Green Lake, Seattle"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">Exchange Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Surplus Produce">Surplus Produce</option>
                  <option value="Heirloom Seeds">Heirloom Seeds</option>
                  <option value="Live Seedlings">Live Seedlings</option>
                  <option value="Fermentation Starter">Fermentation Starter</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">Organic Growing Standards / Heritage Notes</label>
                <input
                  type="text"
                  placeholder="e.g. 100% No synthetic sprays, compost tea and worm castings only"
                  value={newMethod}
                  onChange={(e) => setNewMethod(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">Description & Yield Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe your yield, harvest date, and pickup arrangements..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">What are you looking for in exchange?</label>
                <input
                  type="text"
                  placeholder="e.g. Free to neighbors, or trade for sourdough starter / herbs"
                  value={newExchange}
                  onChange={(e) => setNewExchange(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px]">Contact Email (Kept for verified trades)</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold uppercase shadow-md"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
