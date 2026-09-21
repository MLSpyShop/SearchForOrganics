import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Calendar, MapPin, CheckCircle2, Leaf, Clock, 
  ArrowRight, ShieldCheck, Sparkles, Heart, Users, DollarSign
} from 'lucide-react';
import { CSAPackageOption } from '../../types';

const CSA_PACKAGES: CSAPackageOption[] = [
  {
    id: 'csa-1',
    title: 'Seasonal Organic Veggie Bounty Share',
    farmName: 'Riverbend Bio-Dynamic Farm',
    location: 'Snoqualmie Valley, WA',
    distanceMiles: 14.2,
    weeklyPrice: 38,
    biWeeklyPrice: 42,
    seasonWeeks: 20,
    boxSize: 'Family Share (10-12 items)',
    typicalContents: [
      'Heirloom Beefsteak Tomatoes (2 lbs)',
      'Lacinato Tuscan Kale (1 bunch)',
      'Rainbow Sweet Carrots (1 bunch)',
      'Fresh Genovese Basil',
      'Sugar Snap Peas (1 lb)',
      'Japanese Sweet Potatoes (2 lbs)',
      'Early Gold Summer Squash (3 pcs)'
    ],
    pickupLocations: [
      'Saturday Ballard Farmers Market',
      'Fremont Community Garden Hub',
      'Farm Stand Gate (Self-Service)'
    ],
    doorstepDeliveryAvailable: true,
    certifications: ['USDA Certified Organic', 'Demeter Biodynamic'],
    spotsRemaining: 6,
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'csa-2',
    title: 'Heritage Fruit & Berry Orchard Share',
    farmName: 'Highland Ridge Organic Orchards',
    location: 'Hood River, OR',
    distanceMiles: 28.5,
    weeklyPrice: 32,
    biWeeklyPrice: 36,
    seasonWeeks: 16,
    boxSize: 'Solo / Couple (5-7 items)',
    typicalContents: [
      'Honeycrisp Heirloom Apples (3 lbs)',
      'Wild Mountain Blueberries (2 pints)',
      'Italian Prune Plums (1.5 lbs)',
      'Cold-Pressed Raw Apple Cider (64 oz)'
    ],
    pickupLocations: [
      'Portland Central Drop Point',
      'Hood River Orchard Store'
    ],
    doorstepDeliveryAvailable: false,
    certifications: ['USDA Organic', 'Salmon-Safe Certified'],
    spotsRemaining: 12,
    imageUrl: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'csa-3',
    title: 'Pasture-Raised Eggs & Microgreen Farm Share',
    farmName: 'Sunstone Regenerative Pastures',
    location: 'Carnation, WA',
    distanceMiles: 18.0,
    weeklyPrice: 26,
    biWeeklyPrice: 29,
    seasonWeeks: 24,
    boxSize: 'Solo / Couple (5-7 items)',
    typicalContents: [
      'Pasture-Raised Organic Eggs (2 Dozen)',
      'Sprouted Sunflower Microgreens (8 oz)',
      'Pea Shoot Salad Greens (8 oz)',
      'Raw Garlic Scape Infused Oil'
    ],
    pickupLocations: [
      'Carnation Farm Depot',
      'Seattle Eastside Hub'
    ],
    doorstepDeliveryAvailable: true,
    certifications: ['Animal Welfare Approved Organic', 'ROC Silver'],
    spotsRemaining: 4,
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'
  }
];

export const CSAPortal: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<CSAPackageOption>(CSA_PACKAGES[0]);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedPickup, setSelectedPickup] = useState<string>(CSA_PACKAGES[0].pickupLocations[0]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const pricePerBox = frequency === 'weekly' ? selectedPackage.weeklyPrice : selectedPackage.biWeeklyPrice;
  const deliveryFee = deliveryMethod === 'delivery' ? 6.00 : 0.00;
  const totalPerDelivery = pricePerBox + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Package className="w-3.5 h-3.5" />
            Community Supported Agriculture (CSA)
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Direct Farm Share Subscription Boxes
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Subscribe directly to certified organic & regenerative family farms. Receive weekly harvest boxes harvested within 24 hours of delivery, eliminating grocery middleman markups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Farm Share Packages (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-700" /> Available Local Farm Shares
          </h3>

          <div className="space-y-4">
            {CSA_PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setSelectedPickup(pkg.pickupLocations[0]);
                  setIsSubscribed(false);
                }}
                className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                  selectedPackage.id === pkg.id 
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-white shadow-xl scale-[1.01]' 
                    : 'border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {pkg.boxSize}
                      </span>
                      <span className="text-[10px] font-bold text-rose-600">
                        Only {pkg.spotsRemaining} shares left
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-gray-900">{pkg.title}</h4>
                    <p className="text-xs font-bold text-emerald-800">{pkg.farmName} • {pkg.location} ({pkg.distanceMiles} mi)</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">${pkg.weeklyPrice}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">/ week</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                  {pkg.certifications.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-700">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Box Customizer & Subscription (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                What’s In This Week’s Harvest
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-2">{selectedPackage.title}</h3>
              <p className="text-xs text-gray-500 font-medium">{selectedPackage.seasonWeeks}-Week Seasonal Program</p>
            </div>

            {/* Typical Contents List */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-emerald-900">
                Included in This Week’s Delivery:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700">
                {selectedPackage.typicalContents.map((item, i) => (
                  <p key={i} className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Delivery Frequency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-700 tracking-wider">Delivery Frequency</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFrequency('weekly')}
                  className={`p-3 rounded-2xl border font-bold text-xs transition-all ${
                    frequency === 'weekly' ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  Weekly (${selectedPackage.weeklyPrice}/box)
                </button>
                <button
                  onClick={() => setFrequency('biweekly')}
                  className={`p-3 rounded-2xl border font-bold text-xs transition-all ${
                    frequency === 'biweekly' ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  Bi-Weekly (${selectedPackage.biWeeklyPrice}/box)
                </button>
              </div>
            </div>

            {/* Pickup vs Doorstep Delivery */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-700 tracking-wider">Fulfillment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-2xl border font-bold text-xs transition-all ${
                    deliveryMethod === 'pickup' ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  Pickup Hub (Free)
                </button>
                <button
                  disabled={!selectedPackage.doorstepDeliveryAvailable}
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-3 rounded-2xl border font-bold text-xs transition-all ${
                    deliveryMethod === 'delivery' ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200 disabled:opacity-40'
                  }`}
                >
                  Doorstep (+${6}/box)
                </button>
              </div>
            </div>

            {/* Pickup Hub Choice */}
            {deliveryMethod === 'pickup' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-700 tracking-wider">Select Pickup Waypoint</label>
                <select
                  value={selectedPickup}
                  onChange={(e) => setSelectedPickup(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
                >
                  {selectedPackage.pickupLocations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Order Total & Subscription Confirmation */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">Total per Delivery</p>
                <p className="text-3xl font-black text-gray-900">${totalPerDelivery.toFixed(2)}</p>
              </div>

              <button
                onClick={() => setIsSubscribed(true)}
                className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Reserve Farm Share
              </button>
            </div>

            {isSubscribed && (
              <div className="p-4 bg-emerald-950 text-white rounded-2xl text-xs font-medium space-y-1 animate-in fade-in">
                <p className="font-bold text-emerald-400">🎉 Share Reserved Successfully!</p>
                <p>You are registered with {selectedPackage.farmName}. You will receive a weekly harvest reminder 24 hours prior to dispatch.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
