import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Building2, Package, CheckCircle2, ShieldCheck, DollarSign, 
  FileText, Search, Plus, Trash2, ArrowRight, Sparkles, Filter
} from 'lucide-react';
import { WholesaleProduct } from '../../types';

const WHOLESALE_CATALOG: WholesaleProduct[] = [
  {
    id: 'ws-1',
    name: 'Certified Organic Heirloom San Marzano Tomatoes',
    farmName: 'Willamette Sun Farm',
    location: 'Salem, OR',
    category: 'Produce',
    unitType: '50lb Crate',
    pricePerUnit: 68.00,
    moq: 4, // 200 lbs
    availableUnits: 140,
    harvestWindow: 'July - October 2026',
    certifications: ['USDA Organic', 'Oregon Tilth Certified'],
    freightTier: 'Refrigerated Freight',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ws-2',
    name: 'Organic Sprouted Heritage Einkorn Grain',
    farmName: 'Palouse Organic Grains',
    location: 'Colfax, WA',
    category: 'Grains & Flour',
    unitType: '50lb Crate',
    pricePerUnit: 52.00,
    moq: 10, // 500 lbs
    availableUnits: 800,
    harvestWindow: 'Year-Round (Climate Controlled Silo)',
    certifications: ['USDA Organic', 'Non-GMO Project', 'ROC Bronze'],
    freightTier: 'Standard Dry Freight',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ws-3',
    name: 'Cold-Pressed Unfiltered Extra Virgin Olive Oil',
    farmName: 'California Heritage Olive Groves',
    location: 'Corning, CA',
    category: 'Oils & Liquids',
    unitType: '55-Gal Drum',
    pricePerUnit: 1420.00,
    moq: 1,
    availableUnits: 25,
    harvestWindow: 'Nov 2025 Harvest (Tested 0.18% Acidity)',
    certifications: ['USDA Organic', 'CCOF', 'COOC Certified Extra Virgin'],
    freightTier: 'Standard Dry Freight',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ws-4',
    name: 'Wild Mountain Organic Honey (Foodservice)',
    farmName: 'Cascade Mountain Apiaries',
    location: 'Leavenworth, WA',
    category: 'Sweeteners',
    unitType: '50lb Crate',
    pricePerUnit: 195.00,
    moq: 2,
    availableUnits: 60,
    harvestWindow: 'Summer 2026 Batch',
    certifications: ['USDA Organic', 'True Source Honey'],
    freightTier: 'Standard Dry Freight',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  }
];

export const WholesaleB2B: React.FC = () => {
  const [cart, setCart] = useState<{ [productId: string]: number }>({ 'ws-1': 4 });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('Farm-to-Table Artisan Bistro');
  const [buyerEin, setBuyerEin] = useState<string>('XX-XXXXXXX');
  const [isPoGenerated, setIsPoGenerated] = useState<boolean>(false);

  const filteredProducts = WHOLESALE_CATALOG.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: WholesaleProduct) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || product.moq - 1) + 1
    }));
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      const next = { ...cart };
      delete next[productId];
      setCart(next);
    } else {
      setCart(prev => ({ ...prev, [productId]: qty }));
    }
  };

  // Pricing calculations
  const cartEntries = Object.entries(cart).map(([pId, qty]) => {
    const p = WHOLESALE_CATALOG.find(item => item.id === pId)!;
    return { product: p, quantity: qty, total: (p?.pricePerUnit || 0) * qty };
  }).filter(entry => entry.product);

  const subtotal = cartEntries.reduce((acc, curr) => acc + curr.total, 0);
  const estimatedFreight = subtotal > 0 ? (subtotal >= 2000 ? 180 : 250) : 0;
  const grandTotal = subtotal + estimatedFreight;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            Wholesale B2B Farm-to-Table Marketplace
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Commercial Pallet & Bulk Farm Procurement
          </h1>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium leading-relaxed">
            Source bulk certified organic crops directly from certified grower co-operatives. Designed for restaurants, artisanal bakeries, craft juice producers, and independent grocers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Catalog & Search (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bulk products or farm origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['All', 'Produce', 'Grains & Flour', 'Oils & Liquids', 'Sweeteners'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Listings Grid */}
          <div className="space-y-4">
            {filteredProducts.map(product => {
              const currentQty = cart[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {product.unitType}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        MOQ: {product.moq} units
                      </span>
                    </div>

                    <h4 className="text-base font-black text-gray-900 leading-snug">{product.name}</h4>
                    <p className="text-xs font-bold text-emerald-800">{product.farmName} • {product.location}</p>

                    <div className="flex flex-wrap gap-1 text-[10px] text-gray-600">
                      {product.certifications.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 rounded">✓ {c}</span>
                      ))}
                    </div>

                    <p className="text-[10px] text-gray-500">
                      Harvest: <strong className="text-gray-700">{product.harvestWindow}</strong> | Available: <strong>{product.availableUnits} units</strong>
                    </p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2 w-full sm:w-auto">
                    <div>
                      <p className="text-2xl font-black text-gray-900">${product.pricePerUnit.toFixed(2)}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">per {product.unitType}</p>
                    </div>

                    {currentQty === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase rounded-xl transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add MOQ ({product.moq})
                      </button>
                    ) : (
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQty(product.id, currentQty - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-white rounded-lg font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono font-bold text-xs">{currentQty}</span>
                        <button
                          onClick={() => updateCartQty(product.id, currentQty + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-white rounded-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Commercial Purchase Order & Invoice Builder (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" /> Commercial Purchase Order
              </h3>
              <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                PO-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>

            {/* Buyer Company Info */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">Purchasing Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">Wholesale Tax / EIN #</label>
                <input
                  type="text"
                  value={buyerEin}
                  onChange={(e) => setBuyerEin(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Order Items Table */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {cartEntries.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">Your commercial order is empty. Add bulk items on the left.</p>
              ) : (
                cartEntries.map(({ product, quantity, total }) => (
                  <div key={product.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold text-gray-900 truncate">{product.name}</p>
                      <p className="text-[10px] text-gray-500">{quantity} × ${product.pricePerUnit.toFixed(2)} ({product.unitType})</p>
                    </div>
                    <span className="font-mono font-black text-gray-900">${total.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            {/* Cost Summary Breakdown */}
            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Commodity Subtotal:</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Refrigerated Freight & Liftgate:</span>
                <span className="font-mono font-bold">${estimatedFreight.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-200">
                <span>Grand Total (USD):</span>
                <span className="font-mono text-emerald-800">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              disabled={cartEntries.length === 0}
              onClick={() => setIsPoGenerated(true)}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit Purchase Order to Growers
            </button>

            {isPoGenerated && (
              <div className="p-4 bg-emerald-950 text-white rounded-2xl text-xs space-y-1 animate-in fade-in">
                <p className="font-bold text-emerald-400">✓ Purchase Order Transmitted</p>
                <p className="leading-relaxed">
                  Farm logistics coordinators at {cartEntries.map(e => e.product.farmName).join(', ')} have been notified. An electronic Bill of Lading (BOL) will follow.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
