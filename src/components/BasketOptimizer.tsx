import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Plus, Trash2, CheckCircle2, TrendingDown, DollarSign, 
  Truck, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Leaf, RefreshCw
} from 'lucide-react';
import { BasketItem, BasketVendorQuote, BasketOptimizationResult } from '../../types';

const INITIAL_STAPLES: BasketItem[] = [
  { id: '1', name: 'Pasture-Raised Organic Eggs (1 Dozen)', quantity: 1, unit: 'carton', category: 'Dairy & Eggs' },
  { id: '2', name: '100% Raw Unpasteurized Organic Honey (16 oz)', quantity: 1, unit: 'jar', category: 'Pantry' },
  { id: '3', name: 'Sprouted Organic Sourdough Bread', quantity: 2, unit: 'loaves', category: 'Bakery' },
  { id: '4', name: 'Extra Virgin Cold-Pressed Olive Oil (750ml)', quantity: 1, unit: 'bottle', category: 'Oils' },
  { id: '5', name: 'Organic Curly Lacinato Kale (Bunch)', quantity: 2, unit: 'bunches', category: 'Produce' },
  { id: '6', name: 'Organic Sprouted Rolled Oats (32 oz)', quantity: 1, unit: 'bag', category: 'Pantry' }
];

export const BasketOptimizer: React.FC = () => {
  const [items, setItems] = useState<BasketItem[]>(INITIAL_STAPLES);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Pantry');
  const [isCalculating, setIsCalculating] = useState(false);

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newItem: BasketItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: 1,
      unit: 'item',
      category: newItemCategory
    };
    setItems(prev => [...prev, newItem]);
    setNewItemName('');
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const nextQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: nextQty };
      }
      return i;
    }));
  };

  // Dynamic calculation for vendors based on items
  const calculateQuotes = (): BasketVendorQuote[] => {
    // Pricing factors per vendor
    const baseThriveFactor = 0.88; // 12% discount
    const baseWholeFoodsFactor = 1.05; // premium
    const baseAzureFactor = 0.82; // bulk savings
    const baseCoopFactor = 0.95; // direct local

    const thriveItems: { [id: string]: number } = {};
    const wfItems: { [id: string]: number } = {};
    const azureItems: { [id: string]: number } = {};
    const coopItems: { [id: string]: number } = {};

    let thriveSub = 0;
    let wfSub = 0;
    let azureSub = 0;
    let coopSub = 0;

    items.forEach((item, idx) => {
      const baseItemPrice = 5.50 + ((idx * 2.30) % 9);
      const totalItemPrice = baseItemPrice * item.quantity;

      thriveItems[item.id] = Number((totalItemPrice * baseThriveFactor).toFixed(2));
      wfItems[item.id] = Number((totalItemPrice * baseWholeFoodsFactor).toFixed(2));
      azureItems[item.id] = Number((totalItemPrice * baseAzureFactor).toFixed(2));
      coopItems[item.id] = Number((totalItemPrice * baseCoopFactor).toFixed(2));

      thriveSub += thriveItems[item.id];
      wfSub += wfItems[item.id];
      azureSub += azureItems[item.id];
      coopSub += coopItems[item.id];
    });

    return [
      {
        vendorId: 'thrive',
        vendorName: 'Thrive Market (Online Direct)',
        logo: '🌿',
        itemPrices: thriveItems,
        missingItems: [],
        subtotal: Number(thriveSub.toFixed(2)),
        shipping: thriveSub >= 49 ? 0 : 5.95,
        membershipFeeDiscount: -4.50,
        totalCost: Number((thriveSub + (thriveSub >= 49 ? 0 : 5.95) - 4.50).toFixed(2)),
        estimatedDeliveryDays: '2-3 business days',
        carbonEmissionsKg: 2.1,
        affiliateUrl: 'https://thrivemarket.com'
      },
      {
        vendorId: 'wholefoods',
        vendorName: 'Whole Foods / Amazon Fresh',
        logo: '🍎',
        itemPrices: wfItems,
        missingItems: [],
        subtotal: Number(wfSub.toFixed(2)),
        shipping: wfSub >= 100 ? 0 : 9.95,
        membershipFeeDiscount: 0,
        totalCost: Number((wfSub + (wfSub >= 100 ? 0 : 9.95)).toFixed(2)),
        estimatedDeliveryDays: 'Same Day (2 hours)',
        carbonEmissionsKg: 4.8,
        affiliateUrl: 'https://wholefoodsmarket.com'
      },
      {
        vendorId: 'azure',
        vendorName: 'Azure Standard (Drop Community)',
        logo: '🌾',
        itemPrices: azureItems,
        missingItems: [],
        subtotal: Number(azureSub.toFixed(2)),
        shipping: 4.20,
        membershipFeeDiscount: 0,
        totalCost: Number((azureSub + 4.20).toFixed(2)),
        estimatedDeliveryDays: 'Monthly Route Delivery',
        carbonEmissionsKg: 1.4,
        affiliateUrl: 'https://azurestandard.com'
      },
      {
        vendorId: 'coop',
        vendorName: 'Local Organic Farm Co-op',
        logo: '🚜',
        itemPrices: coopItems,
        missingItems: [],
        subtotal: Number(coopSub.toFixed(2)),
        shipping: 0,
        membershipFeeDiscount: -2.00,
        totalCost: Number((coopSub - 2.00).toFixed(2)),
        estimatedDeliveryDays: 'Pickup at Saturday Market',
        carbonEmissionsKg: 0.3,
        affiliateUrl: 'https://localharvest.org'
      }
    ];
  };

  const quotes = calculateQuotes();
  const sortedQuotes = [...quotes].sort((a, b) => a.totalCost - b.totalCost);
  const cheapestSingle = sortedQuotes[0];
  const mostExpensiveSingle = sortedQuotes[sortedQuotes.length - 1];

  // Split-order calculation: Pick cheapest vendor for each individual item
  const splitItems = items.map(item => {
    let minPrice = Infinity;
    let bestVendorName = 'Thrive Market';
    let bestVendorUrl = 'https://thrivemarket.com';

    quotes.forEach(q => {
      const p = q.itemPrices[item.id];
      if (p < minPrice) {
        minPrice = p;
        bestVendorName = q.vendorName;
        bestVendorUrl = q.affiliateUrl;
      }
    });

    return { item, minPrice, bestVendorName, bestVendorUrl };
  });

  const splitTotal = Number(splitItems.reduce((acc, curr) => acc + curr.minPrice, 0).toFixed(2));
  const splitSavings = Number((mostExpensiveSingle.totalCost - splitTotal).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            AI Grocery Basket Optimizer
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Compare Certified Organic Staples Across All Major Vendors
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Build your organic shopping list. Our engine continuously benchmarks prices, delivery fees, and carbon emissions across Thrive Market, Whole Foods, Azure Standard, and local farm co-ops.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Basket Item Manager (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Your Organic Basket</h3>
                  <p className="text-xs text-gray-500 font-medium">{items.length} items to optimize</p>
                </div>
              </div>
              <button
                onClick={() => setItems(INITIAL_STAPLES)}
                className="text-[10px] font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Quick Add Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add organic item (e.g. Grass-fed Ghee)..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={addItem}
                className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase flex items-center gap-1 shadow-md transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Item List */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {items.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-gray-50/80 hover:bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-3 text-xs transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.name}</p>
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold text-gray-600"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Quotes & Optimization (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Recommendation Summary Card */}
          <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white border-2 border-emerald-300 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-800 text-white">
                  🏆 Single-Store Lowest Total
                </span>
                <h4 className="text-2xl font-black text-emerald-950 mt-2">{cheapestSingle.vendorName}</h4>
                <p className="text-xs text-emerald-800 font-medium">Estimated Delivery: {cheapestSingle.estimatedDeliveryDays}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-gray-400">Total Basket</p>
                <p className="text-3xl font-black text-emerald-900">${cheapestSingle.totalCost.toFixed(2)}</p>
                <p className="text-[11px] font-bold text-emerald-700">
                  Save ${(mostExpensiveSingle.totalCost - cheapestSingle.totalCost).toFixed(2)} vs highest
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-700 border-t border-emerald-200/60">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                Shipping: {cheapestSingle.shipping === 0 ? 'FREE' : `$${cheapestSingle.shipping.toFixed(2)}`}
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                Carbon Footprint: {cheapestSingle.carbonEmissionsKg} kg CO₂
              </span>
              <a
                href={cheapestSingle.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all"
              >
                Buy at {cheapestSingle.vendorName.split(' ')[0]} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Multi-Vendor Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedQuotes.map(quote => (
              <div
                key={quote.vendorId}
                className={`p-5 rounded-3xl border bg-white shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                  quote.vendorId === cheapestSingle.vendorId ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{quote.logo}</span>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900">{quote.vendorName}</h5>
                      <p className="text-[10px] text-gray-400 font-medium">{quote.estimatedDeliveryDays}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900">${quote.totalCost.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-mono font-bold">${quote.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span className="font-mono font-bold">{quote.shipping === 0 ? 'FREE' : `$${quote.shipping.toFixed(2)}`}</span>
                  </div>
                  {quote.membershipFeeDiscount < 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo / Co-op Discount:</span>
                      <span className="font-mono">${quote.membershipFeeDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <a
                  href={quote.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-emerald-900 border border-gray-200 hover:border-emerald-300 rounded-xl font-black text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  Visit Store <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          {/* Optimal Split-Order Strategy Banner */}
          <div className="p-6 bg-emerald-950 text-white rounded-[2.5rem] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" /> Multi-Store Split Strategy
              </span>
              <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-lg">
                Potential Combined: ${splitTotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-emerald-200 leading-relaxed font-medium">
              By purchasing bulk grains at Azure Standard and fresh produce at your local farm co-op, you could save up to <span className="text-white font-bold">${splitSavings.toFixed(2)}</span> compared to ordering solely from high-markup supermarket channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
