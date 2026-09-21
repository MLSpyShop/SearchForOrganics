import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Building2, Bookmark, History, 
  Plus, Search, Send, ThumbsUp, MessageCircle, ShieldCheck, 
  MapPin, Globe, AtSign, Check, Loader2, Sparkles, Filter, 
  ArrowRight, ExternalLink, Trash2, Edit3, Lock, Share2, 
  FileText, Download, CheckCircle2, ChevronRight, X, AlertCircle,
  Leaf, Award, Mail, Phone, Calendar, Save, Flame, Sprout,
  Beaker, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  getForumTopics, createForumTopic, upvoteForumTopic, subscribeForumReplies, createForumReply,
  getUserGroups, createUserGroup, toggleGroupMembership, subscribeGroupMessages, sendGroupMessage,
  subscribeUserDMConversations, subscribeDirectMessages, sendDirectMessage, getOrCreateDMConversation,
  getCompanyProfiles, saveCompanyProfile, getSavedResults, deleteSavedResult, updateSavedResultNotes,
  getSearchMemory, deleteSearchMemoryItem, signInWithGoogle
} from '../../lib/firebase';
import { 
  ForumTopic, ForumReply, UserGroup, GroupMessage, 
  DMConversation, DirectMessage, CompanyProfile, SavedResult, SavedSearchItem 
} from '../../types/community';
import { cn } from '../../lib/utils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

type SubTab = 'forums' | 'groups' | 'dms' | 'companies' | 'bookmarks' | 'history';

export const FORUM_CHANNELS = [
  { id: 'all', label: 'All Discussions', icon: MessageSquare, desc: 'Every ongoing topic across the organic community' },
  { id: 'farming-soil', label: 'Farming & Living Soil', icon: Leaf, desc: 'Cover cropping, living microbiomes, biochar, and no-till protocols' },
  { id: 'molecular-purity', label: 'Molecular Purity & Lab Testing', icon: ShieldCheck, desc: 'Mass spectrometry, glyphosate drift detection, and heavy metal assays' },
  { id: 'standards-certs', label: 'Certifications & Standards', icon: Award, desc: 'USDA NOP, Demeter Biodynamic, ROC™, and Real Organic Project audits' },
  { id: 'greenwash-watch', label: 'Greenwashing Watchdog', icon: AlertCircle, desc: 'Investigations into deceptive "natural" claims and extraction loopholes' },
  { id: 'b2b-exchange', label: 'B2B Sourcing & Co-ops', icon: Building2, desc: 'Bulk grain contracts, wholesale trade pools, and shared farm equipment' },
  { id: 'herbal-botanicals', label: 'Botanicals & Herbal Distillers', icon: Sprout, desc: 'Solventless CO2 extractions, artisan hydrosols, and biodynamic herbs' },
  { id: 'pasture-livestock', label: 'Pasture & Regenerative Livestock', icon: Users, desc: '100% grass-fed dairy, multi-species silvopasture, and animal welfare' },
  { id: 'clean-pantry-living', label: 'Clean Pantry & Non-Toxic Home', icon: Bookmark, desc: 'Zero-synthetic kitchen pantry, non-toxic cookware, and bulk family orders' },
  { id: 'hemp-biomaterials', label: 'Industrial Hemp & Hempoxies™', icon: Sparkles, desc: 'Carbon-negative hempcrete, non-toxic bio-resins, and natural composites' },
  { id: 'policy-advocacy', label: 'Organic Policy & Farmer Defense', icon: FileText, desc: 'Chemical drift liability, organic subsidy reform, and grower rights' },
  { id: 'heirloom-genetics', label: 'Heirloom Genetics & Seed Pools', icon: Flame, desc: 'Open-pollinated non-patented landrace seeds and drought-hardy breeding' }
];

const INITIAL_SEED_TOPICS: ForumTopic[] = [
  {
    id: 'seed-1',
    category: 'molecular-purity',
    title: 'New ICP-MS Lab Data on Glyphosate Aerial Drift in Organic Citrus Groves',
    content: 'We recently ran spectrometry tests across 14 organic certified Valencia orange orchards in Southern California. Even with 100-meter buffer zones, trace drift from adjacent conventional groves showed 0.04 ppb during dry windy cycles. Here is how we formulated bio-char windbreak hedges with tall vetiver grass to absorb and bio-filter drift particulate.',
    tags: ['Lab-Tested', 'Citrus', 'Drift-Mitigation', 'Bio-Char'],
    authorUid: 'seed_author_1',
    authorName: 'Dr. Arthur Vance',
    authorUsername: 'arthur_vance_lab',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Chemist / Lab Scientist',
    upvotesCount: 48,
    upvotedBy: [],
    repliesCount: 8,
    pinned: true,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 5 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 5 }
  },
  {
    id: 'seed-2',
    category: 'farming-soil',
    title: 'Demeter Biodynamic Compost Preparations 500 & 501: Spring Application Protocol',
    content: 'Sharing our 7-year trial data using horn-manure (500) combined with quartz silica (501) on volcanic soil. We recorded a 34% increase in humic acid depth within 3 seasons. What are your stirring cadence recommendations for large 500-gallon vortex tanks?',
    tags: ['Demeter', 'Biodynamic', 'Soil-Microbiome', 'Permaculture'],
    authorUid: 'seed_author_2',
    authorName: 'Elena Rostova',
    authorUsername: 'elena_biodynamic',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Certified Farmer',
    upvotesCount: 39,
    upvotedBy: [],
    repliesCount: 14,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 12 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 12 }
  },
  {
    id: 'seed-3',
    category: 'greenwash-watch',
    title: 'Watch Out: "All Natural Flavoring" loophole in several national "Organic" Kombucha lines',
    content: 'Several commercial brands claiming 95% organic ingredients are hiding synthetic carrier solvents (like propylene glycol) in their "natural fruit essence" distillates. Always demand third-party solvent extraction disclosures and Certificate of Analysis (CoA) from your beverage vendors.',
    tags: ['Greenwashing', 'Label-Audit', 'Transparency', 'Beverages'],
    authorUid: 'seed_author_3',
    authorName: 'Marcus Thorne',
    authorUsername: 'marcus_organic_watch',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Brand Founder',
    upvotesCount: 62,
    upvotedBy: [],
    repliesCount: 22,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 24 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 24 }
  },
  {
    id: 'seed-4',
    category: 'b2b-exchange',
    title: 'Bulk Organic Heirloom Emmer & Einkorn Grain Pool - 2026 Harvest Contracting',
    content: 'Pacific Northwest Certified Organic Grain Co-Op is consolidating orders for 45 metric tons of certified organic Heirloom Farro (Emmer) and Einkorn. Direct farmer contracting with protein assays over 14.5% and zero mycotoxins.',
    tags: ['Heirloom-Grain', 'B2B-Wholesale', 'Direct-Trade', 'Einkorn'],
    authorUid: 'seed_author_4',
    authorName: 'Sarah Jenkins',
    authorUsername: 'sjenkins_coop',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Co-op Organizer',
    upvotesCount: 31,
    upvotedBy: [],
    repliesCount: 11,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 30 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 30 }
  },
  {
    id: 'seed-5',
    category: 'hemp-biomaterials',
    title: 'Zero-VOC Hempoxies™ for Sustainable Food-Contact Countertops and Barn Sealants',
    content: 'We have finalized formulation testing on bio-based hemp epoxy resin cured with citric anhydride. It achieves Shore D hardness 84 with zero off-gassing and food-grade purity certification. Open for commercial pilot partners.',
    tags: ['Hempoxies', 'Bio-Resins', 'Zero-VOC', 'Hemp-Fiber'],
    authorUid: 'seed_author_5',
    authorName: 'Julian Hayes',
    authorUsername: 'julian_biomaterials',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Brand Founder',
    upvotesCount: 54,
    upvotedBy: [],
    repliesCount: 17,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 48 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 48 }
  },
  {
    id: 'seed-6',
    category: 'herbal-botanicals',
    title: 'Supercritical Sub-Zero CO2 Extraction vs Hydro-Distillation in Biodynamic Lavender',
    content: 'Comparative gas chromatography assays show a 40% higher retention of fragile linalyl acetate when extracting Demeter certified lavender below -10°C under sub-critical pressures. Zero hexane or ethanol solvent residues.',
    tags: ['Herbalism', 'CO2-Extracts', 'Lavender', 'Purity-Testing'],
    authorUid: 'seed_author_6',
    authorName: 'Aurelia Dubois',
    authorUsername: 'aurelia_botanica',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Herbalist / Distiller',
    upvotesCount: 28,
    upvotedBy: [],
    repliesCount: 6,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 60 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 60 }
  },
  {
    id: 'seed-7',
    category: 'pasture-livestock',
    title: 'Silvopasture Canopy Shading and Omega-3 Profile in 100% Grass-Fed Raw Jersey Milk',
    content: 'Studying 120 Jersey cows grazing mixed oak-chestnut silvopasture vs open pasture. Cooler thermal indexes under tree canopy improved forage digestion efficiency and boosted conjugated linoleic acid (CLA) ratios by 22%.',
    tags: ['Silvopasture', 'Grass-Fed', 'Raw-Dairy', 'Animal-Welfare'],
    authorUid: 'seed_author_7',
    authorName: 'Caleb Morgan',
    authorUsername: 'caleb_pastures',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Certified Farmer',
    upvotesCount: 45,
    upvotedBy: [],
    repliesCount: 15,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 72 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 72 }
  },
  {
    id: 'seed-8',
    category: 'policy-advocacy',
    title: 'Model Legal Brief on Adjacent Chemical Spray Drift Liability for Organic Farmers',
    content: 'We drafted a free legal template for certified organic farmers to file strict liability claims against commercial crop dusters and chemical applicator services that contaminate organic buffer strips with synthetic defoliants.',
    tags: ['Legal-Defense', 'Drift-Liability', 'Farmer-Rights', 'Advocacy'],
    authorUid: 'seed_author_8',
    authorName: 'Clara Sterling, Esq.',
    authorUsername: 'clara_organic_law',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Agronomist / Consultant',
    upvotesCount: 71,
    upvotedBy: [],
    repliesCount: 29,
    createdAt: { seconds: Date.now() / 1000 - 3600 * 80 },
    updatedAt: { seconds: Date.now() / 1000 - 3600 * 80 }
  }
];

// Exactly 12 rich example groups covering diverse topics as requested
export const INITIAL_SEED_GROUPS: UserGroup[] = [
  {
    id: 'group-1',
    name: 'Regenerative Organic Farmers Co-Op',
    handle: 'regen_farmers',
    description: 'Peer-to-peer technical exchange for certified organic producers scaling living-soil agriculture, cover-cropping, biochar, and zero-chemical pest management.',
    category: 'Farming & Agriculture',
    coverUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    icon: '🌾',
    createdByUid: 'seed_admin_1',
    memberUids: ['seed_admin_1', 'seed_user_2', 'seed_user_3', 'seed_author_2'],
    membersCount: 184,
    rules: ['Strictly zero-chemical discussions', 'Share verifiable field trial data', 'Respect grower intellectual property'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 15 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 15 }
  },
  {
    id: 'group-2',
    name: 'Pure Food Formulators & Chemists',
    handle: 'pure_formulators',
    description: 'Clean cosmetic, food, and herbal beverage formulators dedicated to eliminating seed oil oxidation, synthetic emulsifiers, and hidden microtoxins.',
    category: 'Formulation & Science',
    coverUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    icon: '🧪',
    createdByUid: 'seed_admin_2',
    memberUids: ['seed_admin_2', 'seed_author_1', 'seed_user_4'],
    membersCount: 112,
    rules: ['Cite peer-reviewed data or lab assays', 'No proprietary marketing spam', 'Maintain non-disclosure ethics'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 18 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 18 }
  },
  {
    id: 'group-3',
    name: 'Zero-Pesticide Family Pantry Exchange',
    handle: 'zero_pesticide_family',
    description: 'Consumers and families buying direct from verified regenerative farms, sharing bulk orders, harvest calendars, and 100% clean kitchen recipes.',
    category: 'Consumer Community',
    coverUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    icon: '🧺',
    createdByUid: 'seed_admin_3',
    memberUids: ['seed_admin_3', 'seed_user_5', 'seed_user_6'],
    membersCount: 348,
    rules: ['Focus on verified organic sources', 'Share regional co-op bulk buy opportunities', 'Support local growers'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 20 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 20 }
  },
  {
    id: 'group-4',
    name: 'Demeter Biodynamic Viticulture & Orchards',
    handle: 'biodynamic_growers',
    description: 'Certified Demeter orchardists and winemakers sharing compost prep 500-508 data, astronomical planting cycles, and volcanic silica field trials.',
    category: 'Biodynamic Agriculture',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    icon: '🍇',
    createdByUid: 'seed_admin_4',
    memberUids: ['seed_admin_4', 'seed_author_2'],
    membersCount: 96,
    rules: ['Follow Rudolf Steiner agricultural guidelines', 'Share seasonal spray preparations', 'Promote farm as a living organism'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 22 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 22 }
  },
  {
    id: 'group-5',
    name: 'Spectrometry & Contaminant Testing Guild',
    handle: 'lab_testing_guild',
    description: 'Independent lab directors and analytical chemists cross-referencing ICP-MS glyphosate, heavy metal, and PFAS assay results across commercial organic foods.',
    category: 'Lab Testing & Verification',
    coverUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    icon: '🔬',
    createdByUid: 'seed_author_1',
    memberUids: ['seed_author_1', 'seed_admin_2'],
    membersCount: 74,
    rules: ['Post verified calibration curves', 'Demand third-party blinded assays', 'Zero conflicts of interest'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 25 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 25 }
  },
  {
    id: 'group-6',
    name: 'Pacific Northwest Heirloom Seed Savers',
    handle: 'pnw_seed_savers',
    description: 'Seed stewards preserving open-pollinated, non-hybrid, zero-patent heirloom vegetables, heritage corn, and drought-tolerant grains.',
    category: 'Heirloom Genetics',
    coverUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80',
    icon: '🌱',
    createdByUid: 'seed_admin_6',
    memberUids: ['seed_admin_6', 'seed_user_7'],
    membersCount: 220,
    rules: ['100% open-pollinated heirloom seeds only', 'No patented or GMO genetic lines', 'Free seed sharing etiquette'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 28 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 28 }
  },
  {
    id: 'group-7',
    name: 'Hempoxies™ & Carbon-Negative Building',
    handle: 'hemp_biomaterials',
    description: 'Architects, bio-composite engineers, and farmers formulating zero-VOC hempcrete walls, carbon-sequestering insulation, and non-toxic bio-resins.',
    category: 'Green Building & Materials',
    coverUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    icon: '🧱',
    createdByUid: 'seed_author_5',
    memberUids: ['seed_author_5', 'seed_admin_1'],
    membersCount: 140,
    rules: ['Promote industrial hemp regenerative supply chains', 'Document fire and structural ratings', 'Zero synthetic off-gassing'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 30 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 30 }
  },
  {
    id: 'group-8',
    name: 'Pasture-Raised & Silvopasture Stewards',
    handle: 'pasture_stewards',
    description: '100% grass-fed dairy and livestock producers practicing high-density rotational grazing, tree-canopy fodder systems, and zero antibiotic interventions.',
    category: 'Regenerative Livestock',
    coverUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80',
    icon: '🐄',
    createdByUid: 'seed_author_7',
    memberUids: ['seed_author_7', 'seed_user_3'],
    membersCount: 165,
    rules: ['Strict 100% grass-fed / forage standards', 'Humane high-welfare animal stewardship', 'Record soil carbon sequestration'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 32 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 32 }
  },
  {
    id: 'group-9',
    name: 'Medicinal Herb Growers & Distillers Guild',
    handle: 'herb_distillers',
    description: 'Artisan herbalists formulating supercritical CO2 extracts, solventless hydrosols, and biodynamic adaptogen tinctures from organic botanicals.',
    category: 'Botanicals & Herbalism',
    coverUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&auto=format&fit=crop&q=80',
    icon: '🌿',
    createdByUid: 'seed_author_6',
    memberUids: ['seed_author_6', 'seed_admin_2'],
    membersCount: 130,
    rules: ['Solventless or clean extraction methods only', 'Ethical wildcrafting principles', 'Disclose full origin of botanicals'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 35 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 35 }
  },
  {
    id: 'group-10',
    name: 'Greenwash Busters & Label Transparency League',
    handle: 'greenwash_busters',
    description: 'Citizen investigators and consumer watchdogs exposing deceptive "natural" claims, hidden solvents in natural flavorings, and corporate greenwashing.',
    category: 'Consumer Advocacy',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    icon: '🛡️',
    createdByUid: 'seed_author_3',
    memberUids: ['seed_author_3', 'seed_author_8'],
    membersCount: 290,
    rules: ['Back claims with product ingredient labels or CoAs', 'Civil, evidence-based critique', 'Educate consumers on label reading'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 38 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 38 }
  },
  {
    id: 'group-11',
    name: 'Organic Co-Op Logistics & Cold-Chain Network',
    handle: 'coop_logistics',
    description: 'Regional agricultural aggregators sharing refrigerated route capacity, decentralized grain storage, and farmer-owned distribution hubs.',
    category: 'Supply Chain & Wholesale',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    icon: '🚚',
    createdByUid: 'seed_author_4',
    memberUids: ['seed_author_4', 'seed_admin_1'],
    membersCount: 88,
    rules: ['Coordinate shared freight capacity', 'Transparent fair-pricing models', 'Prioritize local family farms'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 40 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 40 }
  },
  {
    id: 'group-12',
    name: 'Urban Permaculture & Micro-Farm Collective',
    handle: 'urban_permaculture',
    description: 'City growers converting backyards and rooftops into high-yield, bio-intensive living-soil food forests and neighborhood seed banks.',
    category: 'Urban Agriculture',
    coverUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80',
    icon: '🏙️',
    createdByUid: 'seed_user_8',
    memberUids: ['seed_user_8', 'seed_user_5'],
    membersCount: 215,
    rules: ['Share urban compost recipes and worm castings', 'Zero synthetic fertilizers', 'Build community food sovereignty'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 42 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 42 }
  }
];

const INITIAL_SEED_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp-1',
    ownerUid: 'seed_comp_1',
    name: 'Blackberry River Biodynamic Farm',
    handle: 'blackberry_river',
    category: 'Farm',
    description: '450-acre Demeter certified biodynamic fruit, heirloom grain, and grass-fed heritage dairy farm situated along the pristine Blackberry watershed.',
    logoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80',
    website: 'https://blackberryriverbiodynamic.com',
    location: 'Norfolk, Connecticut',
    contactEmail: 'harvest@blackberryriver.org',
    phone: '+1 (860) 555-0192',
    foundedYear: 2004,
    certifications: ['Demeter Certified Biodynamic', 'USDA Organic', 'ROC Gold', 'Bob-Verified Pure 100'],
    verifiedStatus: 'bob-verified',
    soilPractices: '100% no-till, perennial polyculture cover-crops, zero synthetic inputs since 1998.',
    acreage: '450 Acres',
    productHighlights: ['Raw Heritage Cheeses', 'Heirloom Spelt Flour', 'Cold-Pressed Apple Cider Vinegar'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 30 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 30 }
  },
  {
    id: 'comp-2',
    ownerUid: 'seed_comp_2',
    name: 'Sovereign Botanicals Lab & Distillers',
    handle: 'sovereign_botanicals',
    category: 'Brand',
    description: 'Artisan supercritical CO2 botanical extraction laboratory formulating zero-solvent organic essential oils, herbal tinctures, and adaptogens.',
    logoUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    website: 'https://sovereignbotanicals.eco',
    location: 'Ashland, Oregon',
    contactEmail: 'contact@sovereignbotanicals.eco',
    phone: '+1 (541) 555-0184',
    foundedYear: 2017,
    certifications: ['USDA Organic', 'Oregon Tilth Certified', 'Bob-Verified Pure 100'],
    verifiedStatus: 'bob-verified',
    soilPractices: 'Direct partnership with 12 organic family herbal micro-farms.',
    productHighlights: ['Supercritical Ashwagandha Extract', 'Zero-Solvent Blue Tansy Oil', 'Pure Raw Pine Pollen'],
    createdAt: { seconds: Date.now() / 1000 - 86400 * 25 },
    updatedAt: { seconds: Date.now() / 1000 - 86400 * 25 }
  }
];

export const CommunityHub: React.FC = () => {
  const { 
    user, profile, openProfileModal, 
    startDirectMessageWith, targetDMUser, clearTargetDMUser 
  } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<SubTab>('forums');

  // Listen for custom tab switches
  useEffect(() => {
    const handleSubTabSwitch = (e: any) => {
      if (e.detail && ['forums', 'groups', 'dms', 'companies', 'bookmarks', 'history'].includes(e.detail)) {
        setActiveSubTab(e.detail);
      }
    };
    window.addEventListener('switch-community-subtab', handleSubTabSwitch);
    return () => window.removeEventListener('switch-community-subtab', handleSubTabSwitch);
  }, []);

  // -------------------------------------------------------------
  // FORUMS STATE
  // -------------------------------------------------------------
  const [forumChannel, setForumChannel] = useState('all');
  const [topics, setTopics] = useState<ForumTopic[]>(INITIAL_SEED_TOPICS);
  const [searchTopicQuery, setSearchTopicQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<ForumTopic | null>(null);
  const [topicReplies, setTopicReplies] = useState<ForumReply[]>([]);
  const [newReplyContent, setNewReplyContent] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [showCreateTopicModal, setShowCreateTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('farming-soil');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicTags, setNewTopicTags] = useState('');
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);

  // Load topics from Firestore or seed fallback
  useEffect(() => {
    getForumTopics(forumChannel).then(loaded => {
      if (loaded && loaded.length > 0) {
        setTopics(loaded);
      } else {
        setTopics(INITIAL_SEED_TOPICS.filter(t => forumChannel === 'all' || t.category === forumChannel));
      }
    });
  }, [forumChannel]);

  // Subscribe to replies of active topic
  useEffect(() => {
    if (!activeTopic) return;
    const unsub = subscribeForumReplies(activeTopic.id, (replies) => {
      setTopicReplies(replies);
    });
    return () => unsub();
  }, [activeTopic]);

  const handleUpvoteTopic = async (t: ForumTopic) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    const hasUpvoted = t.upvotedBy?.includes(user.uid);
    // Optimistic UI
    setTopics(prev => prev.map(item => {
      if (item.id === t.id) {
        const nextUpvotes = hasUpvoted ? item.upvotesCount - 1 : item.upvotesCount + 1;
        const nextUpvotedBy = hasUpvoted 
          ? (item.upvotedBy || []).filter(u => u !== user.uid)
          : [...(item.upvotedBy || []), user.uid];
        return { ...item, upvotesCount: nextUpvotes, upvotedBy: nextUpvotedBy };
      }
      return item;
    }));

    if (activeTopic && activeTopic.id === t.id) {
      const nextUpvotes = hasUpvoted ? activeTopic.upvotesCount - 1 : activeTopic.upvotesCount + 1;
      const nextUpvotedBy = hasUpvoted 
        ? (activeTopic.upvotedBy || []).filter(u => u !== user.uid)
        : [...(activeTopic.upvotedBy || []), user.uid];
      setActiveTopic({ ...activeTopic, upvotesCount: nextUpvotes, upvotedBy: nextUpvotedBy });
    }

    await upvoteForumTopic(t.id, user.uid, hasUpvoted);
  };

  const handleCreateReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeTopic || !newReplyContent.trim()) return;
    setIsSendingReply(true);
    try {
      await createForumReply({
        topicId: activeTopic.id,
        content: newReplyContent.trim(),
        authorUid: user.uid,
        authorName: profile?.displayName || user.displayName || 'Organic Member',
        authorUsername: profile?.username || 'member',
        authorAvatar: profile?.photoURL || user.photoURL || undefined,
        authorRole: profile?.role || 'Organic Consumer'
      });
      setNewReplyContent('');
    } catch (err) {
      console.warn("Failed to create reply", err);
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleCreateTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTopicTitle.trim() || !newTopicContent.trim()) return;
    setIsCreatingTopic(true);
    try {
      const tags = newTopicTags.split(',').map(t => t.trim()).filter(Boolean);
      const newId = await createForumTopic({
        category: newTopicCategory,
        title: newTopicTitle.trim(),
        content: newTopicContent.trim(),
        tags: tags.length > 0 ? tags : ['Discussion'],
        authorUid: user.uid,
        authorName: profile?.displayName || user.displayName || 'Organic Member',
        authorUsername: profile?.username || 'member',
        authorAvatar: profile?.photoURL || user.photoURL || undefined,
        authorRole: profile?.role || 'Organic Consumer'
      });

      if (newId) {
        setShowCreateTopicModal(false);
        setNewTopicTitle('');
        setNewTopicContent('');
        setNewTopicTags('');
        // Refresh topics
        const reloaded = await getForumTopics(forumChannel);
        if (reloaded) setTopics(reloaded);
      }
    } catch (err) {
      console.warn("Failed to create topic", err);
    } finally {
      setIsCreatingTopic(false);
    }
  };

  // -------------------------------------------------------------
  // GROUPS & GROUP CHAT STATE
  // -------------------------------------------------------------
  const [groups, setGroups] = useState<UserGroup[]>(INITIAL_SEED_GROUPS);
  const [activeGroup, setActiveGroup] = useState<UserGroup | null>(null);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [newGroupMsgText, setNewGroupMsgText] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupHandle, setNewGroupHandle] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('Farming & Agriculture');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupCategoryFilter, setGroupCategoryFilter] = useState('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUserGroups().then(list => {
      if (list && list.length > 0) {
        setGroups(list);
      } else {
        setGroups(INITIAL_SEED_GROUPS);
      }
    });
  }, []);

  useEffect(() => {
    if (!activeGroup) return;
    const unsub = subscribeGroupMessages(activeGroup.id, (msgs) => {
      if (msgs.length > 0) {
        setGroupMessages(msgs);
      } else {
        // Provide starter welcoming seed messages for rich immediate feel
        setGroupMessages([
          {
            id: 'mock-1',
            groupId: activeGroup.id,
            senderUid: 'seed_admin_1',
            senderName: 'Dr. Arthur Vance',
            senderUsername: 'arthur_vance_lab',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            senderRole: 'Chemist / Lab Scientist',
            text: `Welcome everyone to the ${activeGroup.name} channel! Feel free to share verified test data, harvest questions, and collaboration opportunities.`,
            timestamp: { seconds: Date.now() / 1000 - 3600 * 8 }
          },
          {
            id: 'mock-2',
            groupId: activeGroup.id,
            senderUid: 'seed_author_2',
            senderName: 'Elena Rostova',
            senderUsername: 'elena_biodynamic',
            senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
            senderRole: 'Certified Farmer',
            text: `Excited to be collaborating with everyone here. We just finished our quarterly soil microbial respiration assays and are seeing great results.`,
            timestamp: { seconds: Date.now() / 1000 - 3600 * 2 }
          }
        ]);
      }
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsub();
  }, [activeGroup]);

  const handleToggleJoinGroup = async (grp: UserGroup) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    const isMember = grp.memberUids?.includes(user.uid);
    // Optimistic UI
    setGroups(prev => prev.map(g => {
      if (g.id === grp.id) {
        const nextMembers = isMember
          ? (g.memberUids || []).filter(u => u !== user.uid)
          : [...(g.memberUids || []), user.uid];
        return { ...g, memberUids: nextMembers, membersCount: nextMembers.length };
      }
      return g;
    }));

    if (activeGroup && activeGroup.id === grp.id) {
      const nextMembers = isMember
        ? (activeGroup.memberUids || []).filter(u => u !== user.uid)
        : [...(activeGroup.memberUids || []), user.uid];
      setActiveGroup({ ...activeGroup, memberUids: nextMembers, membersCount: nextMembers.length });
    }

    await toggleGroupMembership(grp.id, user.uid, isMember);
  };

  const handleSendGroupMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeGroup || !newGroupMsgText.trim()) return;
    const textToSend = newGroupMsgText.trim();
    setNewGroupMsgText('');
    await sendGroupMessage({
      groupId: activeGroup.id,
      senderUid: user.uid,
      senderName: profile?.displayName || user.displayName || 'Member',
      senderUsername: profile?.username || 'user',
      senderAvatar: profile?.photoURL || user.photoURL || undefined,
      senderRole: profile?.role || 'Member',
      text: textToSend
    });
  };

  const handleCreateGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newGroupName.trim()) return;
    setIsCreatingGroup(true);
    try {
      const gid = await createUserGroup({
        name: newGroupName.trim(),
        handle: newGroupHandle.toLowerCase().replace(/[^a-z0-9_]/g, '') || newGroupName.toLowerCase().replace(/\s+/g, '_'),
        description: newGroupDesc.trim(),
        category: newGroupCategory,
        createdByUid: user.uid,
        icon: '🌿'
      });
      if (gid) {
        setShowCreateGroupModal(false);
        setNewGroupName('');
        setNewGroupHandle('');
        setNewGroupDesc('');
        const list = await getUserGroups();
        if (list) setGroups(list);
      }
    } catch (err) {
      console.warn("Failed to create group", err);
    } finally {
      setIsCreatingGroup(false);
    }
  };

  // -------------------------------------------------------------
  // DIRECT MESSAGES (DMs) STATE
  // -------------------------------------------------------------
  const [conversations, setConversations] = useState<DMConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [activeConvUser, setActiveConvUser] = useState<{ uid: string; name: string; username: string; photoURL?: string; role?: string } | null>(null);
  const [dmList, setDmList] = useState<DirectMessage[]>([]);
  const [newDMText, setNewDMText] = useState('');
  const dmMessagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-trigger target DM if requested globally
  useEffect(() => {
    if (targetDMUser && user) {
      getOrCreateDMConversation(
        {
          uid: user.uid,
          name: profile?.displayName || user.displayName || 'Member',
          username: profile?.username || 'user',
          photoURL: profile?.photoURL || user.photoURL || '',
          role: profile?.role || 'Member'
        },
        targetDMUser
      ).then((convId) => {
        setActiveConvId(convId);
        setActiveConvUser(targetDMUser);
        setActiveSubTab('dms');
        clearTargetDMUser();
      });
    }
  }, [targetDMUser, user, profile]);

  // Subscribe to user's conversation list
  useEffect(() => {
    if (!user) {
      setConversations([]);
      return;
    }
    const unsub = subscribeUserDMConversations(user.uid, (list) => {
      setConversations(list);
    });
    return () => unsub();
  }, [user]);

  // Subscribe to messages in active conversation
  useEffect(() => {
    if (!activeConvId) {
      setDmList([]);
      return;
    }
    const unsub = subscribeDirectMessages(activeConvId, (msgs) => {
      setDmList(msgs);
      setTimeout(() => dmMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsub();
  }, [activeConvId]);

  const handleSendDM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeConvId || !activeConvUser || !newDMText.trim()) return;
    const text = newDMText.trim();
    setNewDMText('');
    await sendDirectMessage(activeConvId, user.uid, activeConvUser.uid, text);
  };

  // -------------------------------------------------------------
  // COMPANY PROFILES STATE
  // -------------------------------------------------------------
  const [companies, setCompanies] = useState<CompanyProfile[]>(INITIAL_SEED_COMPANIES);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompHandle, setNewCompHandle] = useState('');
  const [newCompCategory, setNewCompCategory] = useState<'Farm' | 'Brand' | 'Lab' | 'Certifier' | 'Co-op'>('Farm');
  const [newCompDesc, setNewCompDesc] = useState('');
  const [newCompLocation, setNewCompLocation] = useState('');
  const [newCompWebsite, setNewCompWebsite] = useState('');
  const [newCompEmail, setNewCompEmail] = useState('');
  const [newCompCerts, setNewCompCerts] = useState('USDA Organic, Demeter Biodynamic');
  const [newCompSoil, setNewCompSoil] = useState('');
  const [newCompAcreage, setNewCompAcreage] = useState('');
  const [newCompProducts, setNewCompProducts] = useState('');
  const [isSavingCompany, setIsSavingCompany] = useState(false);

  useEffect(() => {
    getCompanyProfiles().then(list => {
      if (list && list.length > 0) {
        setCompanies(list);
      } else {
        setCompanies(INITIAL_SEED_COMPANIES);
      }
    });
  }, []);

  const handleSaveCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newCompName.trim()) return;
    setIsSavingCompany(true);
    try {
      const certsList = newCompCerts.split(',').map(c => c.trim()).filter(Boolean);
      const prodList = newCompProducts.split(',').map(p => p.trim()).filter(Boolean);
      const handle = newCompHandle.toLowerCase().replace(/[^a-z0-9_]/g, '') || newCompName.toLowerCase().replace(/\s+/g, '_');

      await saveCompanyProfile({
        ownerUid: user.uid,
        name: newCompName.trim(),
        handle,
        category: newCompCategory,
        description: newCompDesc.trim(),
        location: newCompLocation.trim(),
        website: newCompWebsite.trim(),
        contactEmail: newCompEmail.trim() || user.email || '',
        certifications: certsList,
        verifiedStatus: 'certified',
        soilPractices: newCompSoil.trim(),
        acreage: newCompAcreage.trim(),
        productHighlights: prodList
      });

      setShowRegisterCompanyModal(false);
      const refreshed = await getCompanyProfiles();
      if (refreshed) setCompanies(refreshed);
    } catch (err) {
      console.warn("Failed to register company profile", err);
    } finally {
      setIsSavingCompany(false);
    }
  };

  // -------------------------------------------------------------
  // SAVED BOOKMARKS & SEARCH HISTORY STATE
  // -------------------------------------------------------------
  const [savedBookmarks, setSavedBookmarks] = useState<SavedResult[]>([]);
  const [searchHistoryList, setSearchHistoryList] = useState<SavedSearchItem[]>([]);
  const [isLoadingMemory, setIsLoadingMemory] = useState(false);

  const loadMemoryData = async () => {
    if (!user) return;
    setIsLoadingMemory(true);
    try {
      const [bm, sh] = await Promise.all([
        getSavedResults(user.uid),
        getSearchMemory(user.uid)
      ]);
      setSavedBookmarks(bm);
      setSearchHistoryList(sh);
    } finally {
      setIsLoadingMemory(false);
    }
  };

  useEffect(() => {
    if (user && (activeSubTab === 'bookmarks' || activeSubTab === 'history')) {
      loadMemoryData();
    }
  }, [user, activeSubTab]);

  const handleDeleteBookmark = async (id: string) => {
    setSavedBookmarks(prev => prev.filter(b => b.id !== id));
    await deleteSavedResult(id);
  };

  const handleDeleteHistoryItem = async (id: string) => {
    setSearchHistoryList(prev => prev.filter(h => h.id !== id));
    await deleteSearchMemoryItem(id);
  };

  const handleExportBookmarksPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(5, 150, 105);
    doc.text("Search For Organics - Saved Memory Bookmarks", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Authenticated User: ${profile?.displayName || user?.email || 'Member'} (@${profile?.username || 'user'})`, 14, 28);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 34);

    const rows = savedBookmarks.map(b => [
      b.productName,
      b.vendor,
      `${b.purity}% Pure`,
      b.folder || 'Favorites',
      b.notes || '-'
    ]);

    (doc as any).autoTable({
      startY: 42,
      head: [['Product Name', 'Vendor / Producer', 'Purity Rating', 'Folder', 'Research Notes']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [5, 150, 105] },
      styles: { fontSize: 9 }
    });

    doc.save(`Organic_Bookmarks_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Top Hero Banner */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-teal-950 to-gray-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl border border-emerald-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-400/20">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Verified Community & Memory Hub
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Organic Public Square
            </h2>
            <p className="text-emerald-100/80 text-sm md:text-base font-medium leading-relaxed">
              Connect with verified organic farmers, certified brand founders, and clean formulation chemists. Access 12 specialized user groups, forum categories, private encrypted messaging, and saved search history.
            </p>
          </div>

          {/* User Quick Identity Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/15 flex flex-col sm:flex-row items-center gap-4 min-w-[280px]">
            {user ? (
              <>
                <img
                  src={profile?.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=059669&color=fff`}
                  alt="Profile"
                  className="w-14 h-14 rounded-2xl border-2 border-emerald-400 shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => openProfileModal(user.uid)}
                  referrerPolicy="no-referrer"
                />
                <div className="text-center sm:text-left space-y-1 flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="text-sm font-black text-white">{profile?.displayName || user.displayName}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-emerald-300 font-bold flex items-center justify-center sm:justify-start gap-0.5">
                    <AtSign className="w-3 h-3" />
                    {profile?.username || 'member'}
                  </p>
                  <button
                    onClick={() => openProfileModal(user.uid)}
                    className="text-[10px] font-black uppercase tracking-widest text-emerald-200 hover:text-white underline pt-1 block"
                  >
                    View Pure-ID Profile & Badges
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-3 w-full">
                <p className="text-xs font-bold text-emerald-200">Sign in to choose your handle & join groups</p>
                <button
                  onClick={signInWithGoogle}
                  className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
                >
                  Log In with Google
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
          {[
            { id: 'forums', label: 'User Forums & Categories', icon: MessageSquare },
            { id: 'groups', label: '12 Example User Groups & Live Chat', icon: Users },
            { id: 'dms', label: 'Direct Messages', icon: MessageCircle },
            { id: 'companies', label: 'Company & Farm Directory', icon: Building2 },
            { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
            { id: 'history', label: 'Search Memory Log', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as SubTab);
                  setActiveTopic(null);
                  setActiveGroup(null);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all",
                  isActive
                    ? "bg-white text-emerald-950 shadow-lg"
                    : "bg-white/5 text-emerald-100 hover:bg-white/15"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. FORUMS SECTION (Rich Categories & Populated Discussions) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'forums' && (
        <div className="space-y-6">
          {activeTopic ? (
            /* --- TOPIC DETAIL VIEW WITH REPLIES --- */
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-xl space-y-8 animate-in fade-in">
              <button
                onClick={() => setActiveTopic(null)}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                ← Back to Forum Categories
              </button>

              {/* Topic Header */}
              <div className="space-y-4 border-b border-gray-100 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                    {FORUM_CHANNELS.find(c => c.id === activeTopic.category)?.label || activeTopic.category}
                  </span>
                  {activeTopic.tags?.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  {activeTopic.title}
                </h2>

                {/* Author Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div 
                    onClick={() => openProfileModal(activeTopic.authorUid)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img 
                      src={activeTopic.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeTopic.authorName)}&background=059669&color=fff`} 
                      alt="Author" 
                      className="w-10 h-10 rounded-2xl object-cover border border-gray-200 group-hover:border-emerald-500 transition-colors"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{activeTopic.authorName}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                        @{activeTopic.authorUsername} • <span className="text-emerald-700">{activeTopic.authorRole || 'Advocate'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpvoteTopic(activeTopic)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all",
                        user && activeTopic.upvotedBy?.includes(user.uid)
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700"
                      )}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{activeTopic.upvotesCount} Upvotes</span>
                    </button>
                    {user && activeTopic.authorUid !== user.uid && (
                      <button
                        onClick={() => startDirectMessageWith({
                          uid: activeTopic.authorUid,
                          name: activeTopic.authorName,
                          username: activeTopic.authorUsername,
                          photoURL: activeTopic.authorAvatar,
                          role: activeTopic.authorRole
                        })}
                        className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 transition-colors"
                        title="Send Direct Message to Author"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose max-w-none text-gray-700 text-base leading-relaxed font-medium bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100">
                {activeTopic.content}
              </div>

              {/* Replies Stream */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    Community Dialogue ({topicReplies.length})
                  </h3>
                </div>

                {topicReplies.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl text-gray-400 text-xs font-bold uppercase tracking-wider">
                    No replies yet. Be the first to share verified field insights!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topicReplies.map(reply => (
                      <div key={reply.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div 
                            onClick={() => openProfileModal(reply.authorUid)}
                            className="flex items-center gap-2.5 cursor-pointer group"
                          >
                            <img 
                              src={reply.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.authorName)}&background=059669&color=fff`} 
                              alt="Avatar" 
                              className="w-8 h-8 rounded-xl object-cover border border-gray-200"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="text-xs font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{reply.authorName}</span>
                              <span className="text-[10px] text-gray-400 font-bold ml-2">@{reply.authorUsername}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">
                            {reply.createdAt?.seconds ? new Date(reply.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 font-medium pl-10">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <form onSubmit={handleCreateReply} className="space-y-3 pt-4">
                  {user ? (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                        placeholder="Contribute verified scientific, agricultural, or practical insight to this thread..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs md:text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none"
                        required
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSendingReply || !newReplyContent.trim()}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                          {isSendingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                      <p className="text-xs font-bold text-emerald-900">Sign in with Google to post a response</p>
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-700"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
            /* --- TOPIC LIST VIEW & CATEGORY DIRECTORY --- */
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Forum Categories & Channels</h3>
                    <p className="text-xs text-gray-500 font-medium">Browse verified discussions by specialized domain or filter with search.</p>
                  </div>

                  {/* Search & New Topic */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTopicQuery}
                        onChange={(e) => setSearchTopicQuery(e.target.value)}
                        placeholder="Search discussions & tags..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!user) signInWithGoogle();
                        else setShowCreateTopicModal(true);
                      }}
                      className="px-5 py-2.5 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Start Discussion</span>
                    </button>
                  </div>
                </div>

                {/* Channel Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
                  {FORUM_CHANNELS.map(ch => {
                    const isSelected = forumChannel === ch.id;
                    const Icon = ch.icon;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => setForumChannel(ch.id)}
                        className={cn(
                          "p-3 rounded-2xl text-left transition-all border flex flex-col justify-between gap-2",
                          isSelected
                            ? "bg-emerald-700 text-white border-emerald-800 shadow-md shadow-emerald-700/20 scale-[1.02]"
                            : "bg-gray-50/70 hover:bg-gray-100 text-gray-700 border-gray-100"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", isSelected ? "text-emerald-200" : "text-emerald-600")} />
                        <div>
                          <span className="text-xs font-black block leading-snug">{ch.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topics Grid */}
              <div className="space-y-4">
                {topics
                  .filter(t => 
                    !searchTopicQuery.trim() || 
                    t.title.toLowerCase().includes(searchTopicQuery.toLowerCase()) || 
                    t.content.toLowerCase().includes(searchTopicQuery.toLowerCase()) ||
                    t.tags?.some(tag => tag.toLowerCase().includes(searchTopicQuery.toLowerCase()))
                  )
                  .map(topic => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group"
                      onClick={() => setActiveTopic(topic)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {topic.pinned && (
                              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-amber-200">
                                📌 Verified Report
                              </span>
                            )}
                            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                              {FORUM_CHANNELS.find(c => c.id === topic.category)?.label || topic.category}
                            </span>
                            {topic.tags?.slice(0, 4).map(tag => (
                              <span key={tag} className="text-[10px] font-bold text-gray-400">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                            {topic.title}
                          </h3>

                          <p className="text-xs md:text-sm text-gray-600 font-medium line-clamp-2 leading-relaxed">
                            {topic.content}
                          </p>

                          <div className="flex items-center gap-3 pt-2">
                            <img 
                              src={topic.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(topic.authorName)}&background=059669&color=fff`} 
                              alt="Avatar" 
                              className="w-6 h-6 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-xs font-bold text-gray-900">{topic.authorName}</span>
                            <span className="text-[10px] text-gray-400 font-bold">@{topic.authorUsername}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-[10px] text-gray-400 font-bold">
                              {topic.createdAt?.seconds ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                        </div>

                        {/* Stats Pillar */}
                        <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 bg-gray-50 px-5 py-3 md:py-4 rounded-2xl border border-gray-100 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpvoteTopic(topic);
                            }}
                            className={cn(
                              "flex items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-colors",
                              user && topic.upvotedBy?.includes(user.uid) ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"
                            )}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{topic.upvotesCount}</span>
                          </button>
                          <div className="flex items-center gap-1.5 text-xs font-black text-gray-600">
                            <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                            <span>{topic.repliesCount || 0}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* Create Topic Modal */}
          <AnimatePresence>
            {showCreateTopicModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Initiate Organic Forum Topic</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share verifiable data, research, or queries with the community</p>
                    </div>
                    <button onClick={() => setShowCreateTopicModal(false)} className="p-2 text-gray-400 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateTopicSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category Channel</label>
                      <select
                        value={newTopicCategory}
                        onChange={(e) => setNewTopicCategory(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                      >
                        {FORUM_CHANNELS.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Discussion Title</label>
                      <input
                        type="text"
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                        placeholder="e.g., Heavy Metal Lead Assays in Certified Organic Cacao..."
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Detailed Content / Field Observations</label>
                      <textarea
                        rows={5}
                        value={newTopicContent}
                        onChange={(e) => setNewTopicContent(e.target.value)}
                        placeholder="Provide methodology, lab results, batch numbers, or technical agronomy specs..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-medium text-gray-900 focus:bg-white outline-none resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Topic Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={newTopicTags}
                        onChange={(e) => setNewTopicTags(e.target.value)}
                        placeholder="Lab-Tested, ROC, Cacao, Soil-Health"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateTopicModal(false)}
                        className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-gray-500 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isCreatingTopic}
                        className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center gap-2"
                      >
                        {isCreatingTopic ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Publish Thread
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. USER GROUPS & REAL-TIME GROUP CHAT (12 Example Groups) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'groups' && (
        <div className="space-y-6">
          {activeGroup ? (
            /* --- ACTIVE GROUP CHAT INTERFACE --- */
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[720px] animate-in fade-in">
              {/* Group Chat Top Bar */}
              <div className="p-6 bg-gradient-to-r from-gray-900 to-emerald-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveGroup(null)}
                    className="p-2 hover:bg-white/10 rounded-xl text-emerald-300 hover:text-white transition-colors"
                  >
                    ← Back to 12 Groups
                  </button>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-2xl">
                    {activeGroup.icon || '🌿'}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{activeGroup.name}</h3>
                    <p className="text-xs text-emerald-300 font-bold">
                      @{activeGroup.handle} • {activeGroup.membersCount} Active Members
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleJoinGroup(activeGroup)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                      user && activeGroup.memberUids?.includes(user.uid)
                        ? "bg-white/10 hover:bg-red-500/20 text-white"
                        : "bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-md"
                    )}
                  >
                    {user && activeGroup.memberUids?.includes(user.uid) ? 'Joined (Leave)' : 'Join Group'}
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
                {groupMessages.map(msg => {
                  const isMe = user && msg.senderUid === user.uid;
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <img
                        src={msg.senderAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName)}&background=059669&color=fff`}
                        alt="Sender"
                        className="w-8 h-8 rounded-xl object-cover border border-gray-200 shrink-0 cursor-pointer"
                        onClick={() => openProfileModal(msg.senderUid)}
                        referrerPolicy="no-referrer"
                      />
                      <div className={cn("space-y-1", isMe ? "text-right" : "text-left")}>
                        <div className="flex items-center gap-2">
                          <span 
                            onClick={() => openProfileModal(msg.senderUid)}
                            className="text-xs font-black text-gray-900 cursor-pointer hover:text-emerald-600"
                          >
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">@{msg.senderUsername}</span>
                          <span className="text-[9px] text-gray-400">
                            {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "p-3.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-sm",
                            isMe 
                              ? "bg-emerald-600 text-white rounded-tr-none" 
                              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                          )}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Box */}
              <div className="p-4 bg-white border-t border-gray-100">
                {user ? (
                  <form onSubmit={handleSendGroupMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newGroupMsgText}
                      onChange={(e) => setNewGroupMsgText(e.target.value)}
                      placeholder={`Send a message to ${activeGroup.name}...`}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs md:text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!newGroupMsgText.trim()}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-3 bg-emerald-50 rounded-2xl text-center">
                    <button onClick={signInWithGoogle} className="text-xs font-bold text-emerald-800 underline">
                      Sign in with Google to participate in live group chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* --- 12 GROUPS DIRECTORY --- */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    12 Specialized Organic Groups & Coalitions
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Join technical living-soil clusters, clean formulation guilds, heirloom seed savers, and regional bulk buyer co-ops.</p>
                </div>
                <button
                  onClick={() => {
                    if (!user) signInWithGoogle();
                    else setShowCreateGroupModal(true);
                  }}
                  className="px-5 py-2.5 bg-gray-900 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Custom Group</span>
                </button>
              </div>

              {/* Groups Grid - 12 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => {
                  const isMember = user && group.memberUids?.includes(user.uid);
                  return (
                    <div
                      key={group.id}
                      className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                      onClick={() => setActiveGroup(group)}
                    >
                      <div>
                        {/* Cover image / Header */}
                        <div className="h-36 bg-gray-100 relative overflow-hidden">
                          {group.coverUrl && (
                            <img src={group.coverUrl} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-3 left-4 flex items-center gap-2">
                            <span className="text-2xl drop-shadow">{group.icon || '🌿'}</span>
                            <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white rounded-md text-[9px] font-black uppercase tracking-wider border border-white/20">
                              {group.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black text-gray-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                              {group.name}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-600 font-medium line-clamp-3 leading-relaxed">
                            {group.description}
                          </p>

                          <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit">
                            {group.membersCount} Verified Members
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-50 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleJoinGroup(group);
                          }}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                            isMember ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                          )}
                        >
                          {isMember ? 'Joined' : 'Join Group'}
                        </button>
                        <span className="text-xs font-black text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Open Live Chat →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Create Group Modal */}
          <AnimatePresence>
            {showCreateGroupModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Establish New User Group</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Launch a dedicated organic interest guild</p>
                    </div>
                    <button onClick={() => setShowCreateGroupModal(false)} className="p-2 text-gray-400 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Group Name</label>
                      <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g., Midwest Living Soil Collective"
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Handle (@slug)</label>
                      <input
                        type="text"
                        value={newGroupHandle}
                        onChange={(e) => setNewGroupHandle(e.target.value)}
                        placeholder="midwest_soil_collective"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category</label>
                      <select
                        value={newGroupCategory}
                        onChange={(e) => setNewGroupCategory(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                      >
                        <option value="Farming & Agriculture">Farming & Agriculture</option>
                        <option value="Formulation & Science">Formulation & Science</option>
                        <option value="Consumer Community">Consumer Community</option>
                        <option value="B2B Wholesale">B2B Wholesale</option>
                        <option value="Heirloom Genetics">Heirloom Genetics</option>
                        <option value="Green Building">Green Building</option>
                        <option value="Regenerative Livestock">Regenerative Livestock</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mission & Purpose</label>
                      <textarea
                        rows={3}
                        value={newGroupDesc}
                        onChange={(e) => setNewGroupDesc(e.target.value)}
                        placeholder="Describe group criteria, goals, and communication standards..."
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white outline-none resize-none"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateGroupModal(false)}
                        className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-gray-500 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isCreatingGroup}
                        className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center gap-2"
                      >
                        {isCreatingGroup ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Create Group
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. DIRECT MESSAGES (DMs) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'dms' && (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[700px] animate-in fade-in">
          {/* DM Sidebar */}
          <div className="border-r border-gray-100 flex flex-col h-full bg-gray-50/50">
            <div className="p-6 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                Direct Messages
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">1-on-1 Encrypted Member Relay</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {!user ? (
                <div className="p-6 text-center text-xs font-bold text-gray-400">
                  Please sign in to view your direct message conversations.
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-xs font-bold">No conversations yet.</p>
                  <p className="text-[10px] text-gray-400">Click "Send Direct Message" on any member profile or forum topic to begin a chat.</p>
                </div>
              ) : (
                conversations.map(conv => {
                  const otherUid = conv.participantUids.find(u => u !== user.uid) || '';
                  const otherDetails = conv.participantDetails?.[otherUid] || {
                    name: 'Organic Member',
                    username: 'user',
                    photoURL: ''
                  };
                  const isSelected = activeConvId === conv.id;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setActiveConvId(conv.id);
                        setActiveConvUser({
                          uid: otherUid,
                          name: otherDetails.name,
                          username: otherDetails.username,
                          photoURL: otherDetails.photoURL,
                          role: otherDetails.role
                        });
                      }}
                      className={cn(
                        "p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-3",
                        isSelected 
                          ? "bg-white shadow-md border border-emerald-200" 
                          : "hover:bg-white text-gray-700"
                      )}
                    >
                      <img
                        src={otherDetails.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherDetails.name)}&background=059669&color=fff`}
                        alt="Avatar"
                        className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-gray-900 truncate">{otherDetails.name}</span>
                          <span className="text-[9px] text-gray-400 font-bold">
                            {conv.lastMessageTimestamp?.seconds ? new Date(conv.lastMessageTimestamp.seconds * 1000).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold">@{otherDetails.username}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage || '...'}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* DM Active Conversation Area */}
          <div className="md:col-span-2 flex flex-col h-full bg-white">
            {activeConvUser ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 px-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div 
                    onClick={() => openProfileModal(activeConvUser.uid)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={activeConvUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeConvUser.name)}&background=059669&color=fff`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-2xl object-cover border border-gray-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{activeConvUser.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-[10px] text-emerald-600 font-bold">@{activeConvUser.username} • {activeConvUser.role || 'Member'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => openProfileModal(activeConvUser.uid)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    View Pure-ID
                  </button>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/40">
                  {dmList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 space-y-2">
                      <Lock className="w-8 h-8 text-emerald-600/40" />
                      <p className="text-xs font-bold text-gray-700">Direct Message Channel</p>
                      <p className="text-[10px] text-gray-400 max-w-xs">
                        Messages between you and @{activeConvUser.username} are stored privately.
                      </p>
                    </div>
                  ) : (
                    dmList.map(msg => {
                      const isMe = user && msg.senderUid === user.uid;
                      return (
                        <div
                          key={msg.id}
                          className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}
                        >
                          <div
                            className={cn(
                              "p-3.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-sm",
                              isMe
                                ? "bg-emerald-600 text-white rounded-tr-none"
                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                            )}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[9px] text-gray-400 font-bold mt-1 px-1">
                            {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={dmMessagesEndRef} />
                </div>

                {/* DM Input Bar */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form onSubmit={handleSendDM} className="flex gap-2">
                    <input
                      type="text"
                      value={newDMText}
                      onChange={(e) => setNewDMText(e.target.value)}
                      placeholder={`Message @${activeConvUser.username}...`}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs md:text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newDMText.trim()}
                      className="px-6 py-3 bg-gray-900 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-3">
                <MessageSquare className="w-12 h-12 text-gray-300" />
                <h4 className="text-sm font-black text-gray-700 uppercase tracking-wider">Select a conversation</h4>
                <p className="text-xs text-gray-400 max-w-sm">
                  Choose a contact from the sidebar or click "Send Direct Message" on any member profile.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. COMPANY & FARM PROFILES DIRECTORY */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'companies' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Verified Producer & Brand Registry</h3>
              <p className="text-xs text-gray-500 font-medium">Demeter biodynamic farms, ROC certified growers, and clean formulation labs.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (!user) signInWithGoogle();
                  else setShowRegisterCompanyModal(true);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Register Company / Farm</span>
              </button>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map(company => (
              <div
                key={company.id}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Banner */}
                  <div className="h-40 bg-gray-100 relative overflow-hidden">
                    <img
                      src={company.bannerUrl || 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80'}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-emerald-500 text-gray-950 font-black text-[10px] uppercase tracking-wider rounded-full shadow-lg">
                        {company.verifiedStatus === 'bob-verified' ? '★ Bob-Verified 100' : 'Certified Organic'}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <img
                        src={company.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=059669&color=fff`}
                        alt="Logo"
                        className="w-14 h-14 rounded-2xl border-2 border-white shadow-xl bg-white object-cover"
                      />
                      <div className="text-white">
                        <h4 className="text-lg font-black tracking-tight">{company.name}</h4>
                        <p className="text-xs text-emerald-300 font-bold">@{company.handle} • {company.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                      {company.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {company.location && (
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2.5 rounded-xl font-bold">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{company.location}</span>
                        </div>
                      )}
                      {company.acreage && (
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2.5 rounded-xl font-bold">
                          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{company.acreage}</span>
                        </div>
                      )}
                    </div>

                    {/* Certifications Badges */}
                    {company.certifications && company.certifications.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Seals</span>
                        <div className="flex flex-wrap gap-1.5">
                          {company.certifications.map(c => (
                            <span key={c} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-lg border border-emerald-100">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Highlights */}
                    {company.productHighlights && company.productHighlights.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Featured Harvests & Items</span>
                        <div className="flex flex-wrap gap-1.5">
                          {company.productHighlights.map(p => (
                            <span key={p} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg">
                              • {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0 flex items-center justify-between gap-3 border-t border-gray-50 pt-4">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                    </a>
                  )}

                  {user && company.ownerUid !== user.uid && (
                    <button
                      onClick={() => startDirectMessageWith({
                        uid: company.ownerUid,
                        name: company.name,
                        username: company.handle,
                        photoURL: company.logoUrl,
                        role: company.category
                      })}
                      className="px-4 py-2 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Producer</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Register Company Modal */}
          <AnimatePresence>
            {showRegisterCompanyModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-6 my-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Register Farm or Company Profile</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">List your certified operation on the official organic directory</p>
                    </div>
                    <button onClick={() => setShowRegisterCompanyModal(false)} className="p-2 text-gray-400 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCompanySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Operation Name</label>
                        <input
                          type="text"
                          value={newCompName}
                          onChange={(e) => setNewCompName(e.target.value)}
                          placeholder="e.g., Whispering Pines Biodynamic Farm"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Handle (@handle)</label>
                        <input
                          type="text"
                          value={newCompHandle}
                          onChange={(e) => setNewCompHandle(e.target.value)}
                          placeholder="whispering_pines_farm"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Operation Type</label>
                        <select
                          value={newCompCategory}
                          onChange={(e) => setNewCompCategory(e.target.value as any)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        >
                          <option value="Farm">Certified Farm / Grower</option>
                          <option value="Brand">Organic Consumer Brand</option>
                          <option value="Lab">Testing Lab / Spectrometry</option>
                          <option value="Certifier">Accredited Certifier</option>
                          <option value="Co-op">Producer Co-operative</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Location (City, State / Region)</label>
                        <input
                          type="text"
                          value={newCompLocation}
                          onChange={(e) => setNewCompLocation(e.target.value)}
                          placeholder="e.g., Sebastopol, CA"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mission, Philosophy & Scale</label>
                      <textarea
                        rows={3}
                        value={newCompDesc}
                        onChange={(e) => setNewCompDesc(e.target.value)}
                        placeholder="Detail your acreage, soil management methods, and purity guarantees..."
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white outline-none resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Certifications (comma-separated)</label>
                        <input
                          type="text"
                          value={newCompCerts}
                          onChange={(e) => setNewCompCerts(e.target.value)}
                          placeholder="USDA Organic, Demeter, ROC Gold"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Acreage or Scale</label>
                        <input
                          type="text"
                          value={newCompAcreage}
                          onChange={(e) => setNewCompAcreage(e.target.value)}
                          placeholder="e.g., 180 Acres"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Website</label>
                        <input
                          type="url"
                          value={newCompWebsite}
                          onChange={(e) => setNewCompWebsite(e.target.value)}
                          placeholder="https://yourfarm.com"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Featured Products (comma-separated)</label>
                        <input
                          type="text"
                          value={newCompProducts}
                          onChange={(e) => setNewCompProducts(e.target.value)}
                          placeholder="Raw Honey, Heirloom Garlic, Pastured Eggs"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowRegisterCompanyModal(false)}
                        className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-gray-500 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingCompany}
                        className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSavingCompany ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Publish Company Profile
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. SAVED RESULTS & BOOKMARKS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-emerald-600" />
                Saved Result Bookmarks ({savedBookmarks.length})
              </h3>
              <p className="text-xs text-gray-500 font-medium">Your customized cloud repository of bookmarked verified organic items.</p>
            </div>

            {savedBookmarks.length > 0 && (
              <button
                onClick={handleExportBookmarksPDF}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Export Bookmarks PDF</span>
              </button>
            )}
          </div>

          {!user ? (
            <div className="p-12 text-center bg-white rounded-[2.5rem] border border-gray-100 space-y-3">
              <Lock className="w-10 h-10 mx-auto text-gray-400" />
              <h4 className="text-base font-black text-gray-800 uppercase tracking-wider">Authentication Required</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Sign in with your Google account to access your cross-device saved bookmarks and research notes.
              </p>
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-700 shadow-md"
              >
                Sign In with Google
              </button>
            </div>
          ) : savedBookmarks.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-[2.5rem] border border-gray-100 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto text-emerald-600/40" />
              <h4 className="text-base font-black text-gray-800 tracking-tight">No Saved Bookmarks Yet</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                When searching for certified organic products, click the bookmark icon on any item card to save it into your folders.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedBookmarks.map(bm => (
                <div
                  key={bm.id}
                  className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-xl border border-emerald-100">
                        📁 {bm.folder || 'Favorites'}
                      </span>
                      <button
                        onClick={() => handleDeleteBookmark(bm.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-gray-900 tracking-tight">{bm.productName}</h4>
                      <p className="text-xs text-gray-500 font-bold mt-0.5">by {bm.vendor}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-black text-emerald-600 bg-emerald-50/60 px-3 py-1.5 rounded-xl w-fit">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{bm.purity}% Certified Purity</span>
                    </div>

                    {bm.notes && (
                      <p className="text-xs text-gray-600 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                        "{bm.notes}"
                      </p>
                    )}
                  </div>

                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pt-2 border-t border-gray-50">
                    Saved on {bm.savedAt?.seconds ? new Date(bm.savedAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. SEARCH MEMORY LOG */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'history' && (
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Persistent Search Memory Log
            </h3>
            <p className="text-xs text-gray-500 font-medium">Every certified search query performed on your account is indexed here for rapid recall.</p>
          </div>

          {!user ? (
            <div className="p-12 text-center text-xs font-bold text-gray-400">
              Sign in with Google to enable automatic cloud search history memory.
            </div>
          ) : searchHistoryList.length === 0 ? (
            <div className="p-12 text-center text-xs font-bold text-gray-400">
              No previous searches recorded. Try searching for "Heirloom Apples" or "Demeter Milk".
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {searchHistoryList.map(item => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {item.query}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-md">
                        {item.resultsCount} Verified Results
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000).toLocaleString() : 'Recent'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'search' }));
                        window.dispatchEvent(new CustomEvent('rerun-search', { detail: item.query }));
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Re-run Query
                    </button>
                    <button
                      onClick={() => handleDeleteHistoryItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
