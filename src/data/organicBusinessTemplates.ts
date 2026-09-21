import { BusinessPlan } from "../../types";

export interface OrganicBusinessTemplate {
  id: string;
  category: "Farming & Agriculture" | "Food & Hospitality" | "CPG & Retail" | "Professional & Digital Services";
  title: string;
  businessName: string;
  niche: string;
  goals: string;
  summary: string;
  startupCostEst: string;
  projectedMargin: string;
  keyCertifications: string[];
  iconType: string;
  defaultPlan: BusinessPlan;
}

export const ORGANIC_BUSINESS_TEMPLATES: OrganicBusinessTemplate[] = [
  // --- Category 1: Farming & Agriculture ---
  {
    id: "microgreens-urban-farm",
    category: "Farming & Agriculture",
    title: "Urban Vertical Microgreens & Sprout Lab",
    businessName: "Verdant Canopy Vertical Micro-Farm",
    niche: "Controlled-environment certified organic microgreens, pea shoots, and live culinary herbs for fine dining and farmers markets.",
    goals: "Achieve $18,000 MRR within 9 months using 800 sq ft of modular vertical racks with 100% organic living soil medium and zero synthetic lights/nutrients.",
    summary: "High-turnover, high-margin urban agriculture leveraging multi-tier LED racks and certified organic kelp/worm casting inputs.",
    startupCostEst: "$12,000 - $25,000",
    projectedMargin: "65% - 75%",
    keyCertifications: ["USDA Organic", "Real Organic Project", "GAP Certified"],
    iconType: "Sprout",
    defaultPlan: {
      businessName: "Verdant Canopy Vertical Micro-Farm",
      vision: "To cultivate the densest concentration of bioavailable phytonutrients per square foot in urban hubs while operating on closed-loop organic soil regeneration.",
      targetMarket: "High-end farm-to-table restaurants, health-conscious urban professionals, local juice bars, and weekly neighborhood subscribers.",
      revenueModel: "Tiered weekly CSA-style live flat subscriptions ($25/wk), restaurant wholesale standing orders ($18/lb), and weekend farmers market retail punnets ($6-$10/pack).",
      supplyChainStrategy: "Direct partnership with certified organic non-GMO seed cooperatives (Johnny's Selected Seeds, High Mowing) and OMRI-listed compost suppliers within a 50-mile radius.",
      purityCommitment: "100% soil-grown (no synthetic inert rockwool), zero chemical sanitizers, pure triple-filtered non-chlorinated spring well water, and living microbiome compost tea feeds.",
      marketingApproach: "Sample drops to Michelin-rated local chefs, live interactive harvesting displays at flagship farmers markets, and Instagram harvest timelapse reels.",
      financialProjections: "Year 1 Gross Revenue: $140,000 ($90k net); Year 2: $260,000 across 3 decentralized modular micro-hubs.",
      riskMitigation: "Dual-redundant climate HVAC with HEPA filtration to eliminate mold risks; batch succession planting schedule to hedge against demand spikes.",
      nextSteps: [
        "Secure 800 sq ft climate-controlled commercial lease with floor drains.",
        "Submit USDA NOP organic handler and grower certification application with CCOF.",
        "Install 12 NSF multi-tier racks and full-spectrum LED fixtures.",
        "Initiate tasting pilot with top 10 metropolitan chefs."
      ]
    }
  },
  {
    id: "heirloom-orchard-coop",
    category: "Farming & Agriculture",
    title: "Heritage Heirloom Berry & Orchard Co-op",
    businessName: "Bramble & Bough Heritage Orchard",
    niche: "Rare heirloom apples, stone fruit, and antioxidant-rich elderberries grown via biodynamic agroforestry.",
    goals: "Establish 15 acres of multi-strata perennial food forest generating premium direct-to-consumer and value-added cider revenues.",
    summary: "Biodynamic perennial orchard combining fresh seasonal harvest with high-shelf-life value-added organic preserves and heritage cider.",
    startupCostEst: "$45,000 - $90,000",
    projectedMargin: "50% - 62%",
    keyCertifications: ["Demeter Biodynamic", "USDA Organic", "Bee Better Certified"],
    iconType: "Apple",
    defaultPlan: {
      businessName: "Bramble & Bough Heritage Orchard",
      vision: "Preserving endangered antique fruit genetics through restorative perennial agriculture and pollinator-first biodiversity corridors.",
      targetMarket: "Artisanal cideries, specialty natural grocery stores, agritourism visitors, and heritage fruit connoisseurs.",
      revenueModel: "Fresh seasonal pick-your-own agritourism, wholesale supply contracts to artisanal bakeries, and high-margin estate-bottled raw organic vinegar and preserves.",
      supplyChainStrategy: "On-site rootstock grafting, on-farm multi-species animal rotational grazing for weed management, and locally sourced biochar amendments.",
      purityCommitment: "Zero systemic fungicides or synthetic foliar sprays. Exclusively beneficial insect release, sulfur/copper minimal organic management, and biodynamic preparations 500-508.",
      marketingApproach: "Annual Blossom Festivals, heirloom tasting boxes shipped direct via cold mailers, and partnerships with craft fermentation guilds.",
      financialProjections: "Year 1 (establishment/preserves): $65,000; Year 3 (full fruiting maturity): $280,000 at 58% operating margin.",
      riskMitigation: "Diverse multi-species planting (18 varieties) prevents single-crop pathogen vulnerability; frost-protection micro-sprinklers.",
      nextSteps: [
        "Complete baseline soil fungal-to-bacterial biomass lab analysis.",
        "Plant 2,200 grafted heirloom dwarf rootstocks and windbreak hedgerows.",
        "Install drip irrigation with solar-powered pressure fertigation.",
        "Host inaugural autumn heritage tasting preview."
      ]
    }
  },
  {
    id: "regenerative-mushroom-lab",
    category: "Farming & Agriculture",
    title: "Mushroom Apothecary & Mycelium Cultivation Lab",
    businessName: "MycoPure Regenerative Fungi Lab",
    niche: "Certified organic Lion's Mane, Reishi, Cordyceps, and Shiitake cultivated on organic hardwood sawdust and agricultural byproduct substrates.",
    goals: "Produce 800 lbs/week of gourmet fresh fruiting bodies and 500 units/mo of dual-extracted organic tinctures.",
    summary: "High-tech sterile laboratory for medicinal and culinary mushroom production with zero synthetic inputs.",
    startupCostEst: "$28,000 - $60,000",
    projectedMargin: "70% - 80%",
    keyCertifications: ["USDA Organic", "Certified B Corp", "Non-GMO Project Verified"],
    iconType: "Layers",
    defaultPlan: {
      businessName: "MycoPure Regenerative Fungi Lab",
      vision: "Elevating human cognitive performance and immune resilience through 100% whole-fruiting-body organic fungal medicine.",
      targetMarket: "Integrative healthcare clinics, nootropic consumers, high-end culinary grocers, and natural wellness retailers.",
      revenueModel: "Fresh culinary wholesale to restaurants ($12-$16/lb), e-commerce medicinal dual-extract tinctures ($38/bottle), and DIY home grow-kit boxes ($28/kit).",
      supplyChainStrategy: "Certified organic hardwood sawdust sourced from local sustainable mills and organic wheat bran from regional organic grain growers.",
      purityCommitment: "Zero mycelium-on-grain starch fillers; 100% organic certified grain alcohol for ultrasonic dual-extraction; strict heavy metal third-party testing.",
      marketingApproach: "Educational webinars on neurogenesis and fungal biology, practitioner wholesale affiliate portal, and culinary masterclass content.",
      financialProjections: "Year 1: $185,000; Year 2: $420,000 driven by e-commerce tincture subscription scale.",
      riskMitigation: "Cleanroom HEPA filtration positive pressure zones; multi-strain tissue culture banking in -80°C liquid nitrogen.",
      nextSteps: [
        "Construct ISO Class 7 cleanroom and sterilization autoclave bay.",
        "Obtain USDA organic handling certification for dietary supplement extraction.",
        "Launch Shopify DTC subscription storefront with batch lab transparency QR codes.",
        "Partner with 15 functional medicine practitioners for clinical sampling."
      ]
    }
  },
  {
    id: "pastured-dairy-creamery",
    category: "Farming & Agriculture",
    title: "Pastured Grass-Fed & Organic Dairy Creamery",
    businessName: "Clover Crest Pastured Creamery",
    niche: "100% A2/A2 grass-fed certified organic raw milk cheeses, cultured European-style butter, and unhomogenized yogurt.",
    goals: "Transform milk from 40 rotational Jersey cows into award-winning farmstead artisan cheeses with a 3x premium over bulk raw milk prices.",
    summary: "Farmstead value-added dairy operation maximizing rotational pasture forage and artisanal micro-batch cheese making.",
    startupCostEst: "$75,000 - $180,000",
    projectedMargin: "45% - 55%",
    keyCertifications: ["USDA Organic", "A2/A2 Certified", "Animal Welfare Approved", "Grassfed Alliance"],
    iconType: "Milk",
    defaultPlan: {
      businessName: "Clover Crest Pastured Creamery",
      vision: "Revitalizing pasture ecosystems through intensive herd grazing while delivering nutrient-dense, easily digestible cultured dairy foods.",
      targetMarket: "Gourmet cheese counters, specialty delis, health-minded families seeking A2/A2 dairy, and farmstead buyers.",
      revenueModel: "Wheel & wedge aged cheese wholesale ($24-$32/lb), cultured butter direct sales, and weekly farm gate raw/pasteurized dairy shares.",
      supplyChainStrategy: "Closed-loop 120-acre rotational pasture with zero grain supplementation; on-site gravity-fed micro-creamery vat processing.",
      purityCommitment: "Zero hormones, antibiotics, or synthetic wormers; exclusively native grasses, red clover, and organic herbal hay supplements.",
      marketingApproach: "Cheese-pairing masterclasses, farm picnic days, regional ACS (American Cheese Society) competition entries, and CSA subscriptions.",
      financialProjections: "Year 1: $210,000; Year 2: $380,000 as cave-aged reserves reach prime maturation.",
      riskMitigation: "Strict on-site microbiological pathogen testing on every batch; diversified product line (quick-turn yogurt vs long-aged hard cheeses).",
      nextSteps: [
        "Finalize state Grade A milk plant and artisan processing license.",
        "Install 200-gallon pasteurizer/cheese vat and humidity-controlled aging cave.",
        "Complete herd genetic validation for 100% homozygous A2/A2 beta-casein.",
        "Launch regional retail rollout with 12 specialty cheesemongers."
      ]
    }
  },
  {
    id: "apiculture-raw-honey",
    category: "Farming & Agriculture",
    title: "Organic Apiculture & Wild Botanical Sanctuary",
    businessName: "Nectar & Pollen Pure Honey Sanctuary",
    niche: "Single-origin raw wildcrafted organic honey, raw propolis tinctures, and royal jelly harvested from chemical-free sanctuaries.",
    goals: "Manage 250 organic treatment-free hives producing 15,000 lbs of varietal raw honey and premium hive medicine.",
    summary: "Treatment-free natural beekeeping with verified pesticide-free forage radii and medicinal hive products.",
    startupCostEst: "$22,000 - $50,000",
    projectedMargin: "60% - 72%",
    keyCertifications: ["Certified Naturally Grown", "USDA Organic (Wildcrafted)", "True Source Honey"],
    iconType: "Sun",
    defaultPlan: {
      businessName: "Nectar & Pollen Pure Honey Sanctuary",
      vision: "Restoring native pollinator vitality through zero-chemical treatment-free genetics and pristine wildflower floral corridors.",
      targetMarket: "Holistic wellness seekers, gourmet food lovers, natural apothecary brands, and specialty grocers.",
      revenueModel: "Single-varietal raw honey jars ($18-$26/jar), apothecary propolis/royal jelly elixirs ($32/bottle), and queen bee breeding stock ($45/queen).",
      supplyChainStrategy: "Apiaries placed exclusively on certified organic farms, nature preserves, and conservation trust lands with 3-mile buffer zones.",
      purityCommitment: "Never heated above hive temperature (95°F); coarse-filtered only to preserve live enzymes and bee pollen grains; zero synthetic miticides.",
      marketingApproach: "Varietal floral tasting flights (Basswood, Wild Blackberry, Goldenrod), honey-of-the-month club, and pollination impact storytelling.",
      financialProjections: "Year 1: $95,000; Year 2: $180,000 with expanded value-added throat sprays and skincare bases.",
      riskMitigation: "Overwintering cold-hardy survivor genetics; distributed yard locations to isolate seasonal drought or localized forage loss.",
      nextSteps: [
        "Secure 6 organic land-use apiary agreements across protected watershed parcels.",
        "Construct solar-powered honey extraction house and bottling clean-room.",
        "Deploy 120 Langstroth and Top-Bar natural comb hives.",
        "Open direct-to-consumer e-commerce pre-orders for spring harvest."
      ]
    }
  },
  {
    id: "regenerative-hemp-fiber",
    category: "Farming & Agriculture",
    title: "Regenerative Hemp & Industrial Phytoremediation Farm",
    businessName: "TerraFibre Regenerative Hemp Co.",
    niche: "Dual-crop organic industrial hemp producing high-tensile organic fiber for sustainable textiles and organic seed for cold-pressed oil.",
    goals: "Cultivate 100 acres of certified organic hemp, sequestering 800 tons of CO2 while supplying regional clean textile mills.",
    summary: "Large-scale regenerative crop utilizing industrial hemp for soil carbon drawdown, bio-composite building materials, and food oil.",
    startupCostEst: "$60,000 - $140,000",
    projectedMargin: "40% - 52%",
    keyCertifications: ["USDA Organic", "Regenerative Organic Certified (ROC)", "Oeko-Tex Standard 100"],
    iconType: "Leaf",
    defaultPlan: {
      businessName: "TerraFibre Regenerative Hemp Co.",
      vision: "Industrializing regenerative bio-materials to replace petroleum synthetics in construction and apparel.",
      targetMarket: "Sustainable apparel brands, hemp-lime green building contractors, and organic functional food manufacturers.",
      revenueModel: "Processed bast fiber bales ($0.85/lb), hemp hurd for eco-insulation/hempcrete ($0.45/lb), and certified organic cold-pressed culinary oil ($14/L).",
      supplyChainStrategy: "Contract farming with regional decortication processing facilities; zero irrigation rain-fed agronomy.",
      purityCommitment: "Strict crop rotation with legumes; zero synthetic defoliants; full field heavy-metal baseline certification.",
      marketingApproach: "Carbon-offset corporate sponsorships, technical whitepapers for green architects, and presence at circular textile expos.",
      financialProjections: "Year 1: $190,000; Year 2: $480,000 as decortication volume throughput triples.",
      riskMitigation: "Pre-season grain & fiber off-take purchase agreements with textile mills before spring drilling.",
      nextSteps: [
        "Submit state industrial hemp grower licensing and USDA organic certification.",
        "Purchase certified European monoecious high-fiber seed varieties.",
        "Contract mechanical harvesting and specialized swathing equipment.",
        "Sign 3-year off-take agreement with regional sustainable bio-materials consortium."
      ]
    }
  },

  // --- Category 2: Food & Hospitality ---
  {
    id: "farm-to-table-bistro",
    category: "Food & Hospitality",
    title: "Farm-to-Table Organic Bistro & Zero-Waste Eatery",
    businessName: "Roots & Embers Organic Kitchen",
    niche: "Hyper-seasonal 100% certified organic dining featuring hyper-local heirloom ingredients and zero-landfill kitchen workflows.",
    goals: "Establish a 65-seat dining room and garden patio achieving $1.2M gross revenue with a 18% restaurant net margin.",
    summary: "Culinary sanctuary serving wood-fired seasonal dishes with complete traceability back to local partner farms.",
    startupCostEst: "$120,000 - $280,000",
    projectedMargin: "16% - 22%",
    keyCertifications: ["Certified Organic Restaurant (CCOF)", "Green Restaurant Certified 4-Star", "Slow Food Approved"],
    iconType: "Utensils",
    defaultPlan: {
      businessName: "Roots & Embers Organic Kitchen",
      vision: "Reconnecting urban diners to the rhythm of living soil through uncompromised organic gastronomy and radical hospitality.",
      targetMarket: "Discerning food enthusiasts, health-conscious urbanites, eco-tourists, and ethical corporate event planners.",
      revenueModel: "Lunch & dinner dine-in ticket averages ($48/person lunch, $92/person dinner), weekend brunch, and private chef organic banquets.",
      supplyChainStrategy: "Direct contracts with 14 local organic growers within 60 miles; daily harvest drop-offs; in-house hyper-seasonal preservation and fermentation pantry.",
      purityCommitment: "100% certified organic produce and proteins, 100% cold-pressed organic olive/avocado oil (zero canola or industrial seed oils), filtered structured water.",
      marketingApproach: "Monthly 'Meet the Farmer' collaborative dinners, seasonal menu drop newsletters, and Michelin Green Star rating campaign.",
      financialProjections: "Year 1: $850,000 ($145k net); Year 2: $1,250,000 with private catering expansion.",
      riskMitigation: "Flexible daily blackboard menu structure allows immediate adaptation to micro-climate crop availability from farms.",
      nextSteps: [
        "Secure heritage commercial brick-and-mortar space with open wood-fired hearth.",
        "Obtain CCOF Certified Organic Restaurant handling validation.",
        "Install commercial composting and anaerobic food-waste digester system.",
        "Host soft launch preview for local agricultural partners and culinary press."
      ]
    }
  },
  {
    id: "ancient-grain-bakery",
    category: "Food & Hospitality",
    title: "Artisanal Sourdough & Ancient Grain Micro-Bakery",
    businessName: "Heritage Hearth Ancient Grains",
    niche: "Stone-milled sourdough breads, viennoiserie, and crackers crafted exclusively from 100% organic regional heritage wheats (Einkorn, Emmer, Spelt).",
    goals: "Bake 1,500 loaves/week on stone-deck ovens with zero commercial baker's yeast and complete grain traceability.",
    summary: "Traditional sourdough bakery utilizing on-site stone milling to preserve germ and whole-grain enzymes.",
    startupCostEst: "$35,000 - $85,000",
    projectedMargin: "48% - 58%",
    keyCertifications: ["USDA Organic", "Real Bread Campaign", "Biodynamic Grain Partner"],
    iconType: "Coffee",
    defaultPlan: {
      businessName: "Heritage Hearth Ancient Grains",
      vision: "Reviving ancestral bread traditions that heal gut microbiomes and support regional organic grain economies.",
      targetMarket: "Digestive-sensitive consumers, artisan bread aficionados, natural food stores, and specialty morning coffee lovers.",
      revenueModel: "Direct bakery storefront sales ($9-$14/loaf), restaurant standing wholesale orders, and weekly bread CSA subscription club.",
      supplyChainStrategy: "Direct bulk sourcing of heritage organic berries (Red Fife, Khorasan, Einkorn) from regional regenerative grain growers; on-site stone milling daily.",
      purityCommitment: "Only 3 ingredients in core sourdough: fresh-milled organic grain, filtered water, unrefined sea salt; 36-hour slow wild fermentation.",
      marketingApproach: "Sourdough masterclasses, aromatic early-morning neighborhood window sales, and collaborations with specialty coffee roasters.",
      financialProjections: "Year 1: $160,000; Year 2: $310,000 at 52% gross product margin.",
      riskMitigation: "Grain stored in climate-monitored hermetic silos with continuous organic pest deterrent monitoring.",
      nextSteps: [
        "Commission Austrian New Mill stone grain grinder and 3-deck electric stone hearth oven.",
        "Develop and mature 100-year-old heritage sourdough mother culture.",
        "Launch 'Daily Bread Guild' 250-member monthly prepaid subscription.",
        "Establish wholesale delivery routes to 10 artisan cafes."
      ]
    }
  },
  {
    id: "raw-juice-adaptogen-bar",
    category: "Food & Hospitality",
    title: "Raw Cold-Pressed Juice & Botanical Adaptogen Bar",
    businessName: "Solar Vitality Organic Elixir Bar",
    niche: "Hydraulic cold-pressed certified organic raw juices, functional wellness shots, and botanical adaptogenic tonics.",
    goals: "Open 2 high-traffic urban storefronts generating $45,000 MRR each with zero HPP (High Pressure Processing) heat degradation.",
    summary: "Fresh, unpasteurized live enzyme juices and functional adaptogenic wellness tonics served in returnable glass bottles.",
    startupCostEst: "$40,000 - $95,000",
    projectedMargin: "58% - 68%",
    keyCertifications: ["USDA Organic", "Zero Waste Certified", "Clean Label Project"],
    iconType: "Activity",
    defaultPlan: {
      businessName: "Solar Vitality Organic Elixir Bar",
      vision: "Flooding the body with cellular-level living micronutrients and adaptogenic herbal intelligence in their most bioavailable raw state.",
      targetMarket: "Health-conscious commuters, athletic fitness professionals, detox and juice cleanse seekers, and holistic lifestyle shoppers.",
      revenueModel: "Grab-and-go storefront retail ($10-$14/bottle), 3-day to 7-day custom juice cleanse bundles ($180-$350), and workplace wellness subscriptions.",
      supplyChainStrategy: "Direct procurement of 'ugly' but perfectly nutritious USDA organic fruits/greens from regional organic farms at 30% discount.",
      purityCommitment: "100% certified organic, 100% hydraulic cold-press (no centrifugal heat), zero added sugars or synthetic ascorbic acid; 100% recycled glass bottles with deposit system.",
      marketingApproach: "Partnerships with premier boutique yoga/Pilates studios, 7-Day New Year Cleanse challenges, and wellness influencer brand ambassador program.",
      financialProjections: "Year 1: $290,000; Year 2: $580,000 across 2 locations with 62% average product gross margin.",
      riskMitigation: "On-demand daily pressing batches strictly calibrated to POS forecasting algorithms to minimize perishable spoilage (<4%).",
      nextSteps: [
        "Acquire Goodnature X-1 commercial hydraulic cold-press system.",
        "Implement glass bottle return deposit loop ($2 store credit per bottle return).",
        "Sign organic contract farming delivery schedules for winter root vegetables.",
        "Launch online cleanse booking engine with refrigerated local delivery."
      ]
    }
  },
  {
    id: "organic-meal-prep",
    category: "Food & Hospitality",
    title: "Organic Fast-Casual & Meal-Prep Delivery",
    businessName: "MacroPure Organic Meal Labs",
    niche: "Chef-curated, macro-balanced certified organic weekly meal prep catering to Paleo, Keto, and Vegan athletes and busy executives.",
    goals: "Reach 500 active weekly recurring meal prep subscribers delivering 5,000 organic meals per week.",
    summary: "Subscription-first organic kitchen delivering ready-to-eat nutrient-dense meals in 100% compostable packaging.",
    startupCostEst: "$50,000 - $110,000",
    projectedMargin: "35% - 44%",
    keyCertifications: ["USDA Organic", "Certified Gluten-Free", "Certified B Corp"],
    iconType: "Package",
    defaultPlan: {
      businessName: "MacroPure Organic Meal Labs",
      vision: "Eliminating the friction of clean organic nutrition for high-performing individuals through delicious, scientifically balanced meals.",
      targetMarket: "Corporate executives, crossfit/endurance athletes, biohackers, and busy dual-income families.",
      revenueModel: "Weekly auto-renew subscriptions (5-meal plan $85/wk, 10-meal plan $160/wk, 15-meal plan $225/wk) and corporate wellness catering.",
      supplyChainStrategy: "Bulk wholesale purchase agreements with organic grower cooperatives and regional pasture-raised protein distributors.",
      purityCommitment: "Strict adherence to 100% organic ingredients, certified gluten-free dedicated commercial commissary kitchen, zero microplastic sous-vide bags.",
      marketingApproach: "Performance athlete sponsorship, corporate lunch-and-learn sponsorships, and targeted geo-fenced Instagram conversion funnels.",
      financialProjections: "Year 1: $520,000; Year 2: $1,400,000 based on 450 recurring subscribers.",
      riskMitigation: "Sunday/Wednesday split production schedule maintains peak peak freshness and optimizes kitchen labor overhead.",
      nextSteps: [
        "Lease shared commercial commissary kitchen space with blast chillers.",
        "Build recurring subscription billing engine with dietary preference customization.",
        "Secure eco-friendly insulated packaging with biodegradable gel ice packs.",
        "Roll out initial 50-subscriber beta trial in metropolitan target zone."
      ]
    }
  },
  {
    id: "plant-based-fermentory",
    category: "Food & Hospitality",
    title: "Plant-Based Vegan Cheese & Fermentation Lab",
    businessName: "Culture & Flora Botanical Creamery",
    niche: "Cultured organic cashew and macadamia artisanal aged cheeses, probiotic coconut kefirs, and bioactive krauts.",
    goals: "Distribute across 80 natural grocery retail doors while operating an on-site tasting room and fermentation workshop.",
    summary: "Traditional European affinage cheese aging techniques applied to 100% organic cultured botanical nuts and seeds.",
    startupCostEst: "$38,000 - $80,000",
    projectedMargin: "55% - 65%",
    keyCertifications: ["USDA Organic", "Certified Plant-Based", "Non-GMO Project"],
    iconType: "Sparkles",
    defaultPlan: {
      businessName: "Culture & Flora Botanical Creamery",
      vision: "Honoring ancient cheese-making microbiology using botanical organic ingredients to create artisanal culinary indulgence without animal exploitation.",
      targetMarket: "Vegans, lactose-intolerant gourmands, natural food connoisseurs, and eco-conscious culinary consumers.",
      revenueModel: "Wholesale wheel/block retail distribution ($11-$16/unit wholesale, $18-$24 MSRP), DTC temperature-controlled e-commerce, and weekend tasting room flights.",
      supplyChainStrategy: "Direct trade fair-trade certified organic raw cashews from verified ethical cooperatives in Vietnam and West Africa.",
      purityCommitment: "Zero modified food starches, palm oil, or synthetic flavorings; 100% active bacterial cultures (*Penicillium camemberti*, *Lactobacillus*) and organic whole food ingredients.",
      marketingApproach: "Artisanal charcuterie board styling workshops, natural wine bar pairing pop-ups, and natural product expo showcases (Expo West).",
      financialProjections: "Year 1: $140,000; Year 2: $360,000 as regional grocery distribution expands.",
      riskMitigation: "Precision humidity and temperature-controlled aging chambers eliminate unwanted wild molds and ensure batch-to-batch consistency.",
      nextSteps: [
        "Construct food-grade stainless cheese production lab with dual aging caves.",
        "Finalize shelf-life microbial challenge studies with accredited food laboratory.",
        "Secure retail distributor agreements with regional natural grocery chains.",
        "Launch DTC cheese box subscription with insulated biodegradable mailers."
      ]
    }
  },
  {
    id: "organic-coffee-roastery",
    category: "Food & Hospitality",
    title: "Shade-Grown Organic Coffee Roastery & Tea Atelier",
    businessName: "Canopy & Cloud Regenerative Roasters",
    niche: "100% shade-grown, bird-friendly certified organic specialty coffees and organic single-estate biodynamic loose-leaf teas.",
    goals: "Roast and distribute 4,000 lbs/month of zero-defect organic specialty coffees with complete farmer direct-trade revenue transparency.",
    summary: "Eco-conscious specialty micro-roastery prioritizing regenerative shade-grown agroforestry origins and clean air roasters.",
    startupCostEst: "$45,000 - $110,000",
    projectedMargin: "50% - 60%",
    keyCertifications: ["USDA Organic", "Smithsonian Bird Friendly", "Fair Trade Certified", "Rainforest Alliance"],
    iconType: "Coffee",
    defaultPlan: {
      businessName: "Canopy & Cloud Regenerative Roasters",
      vision: "Transforming the morning ritual into a global forest conservation engine through ethically roasted, ultra-clean organic beans.",
      targetMarket: "Specialty coffee connoisseurs, eco-conscious offices, boutique cafes, and health-focused daily coffee drinkers.",
      revenueModel: "DTC coffee subscriptions ($19-$24/bag), wholesale cafe espresso programs ($13-$16/lb), and office coffee service subscriptions.",
      supplyChainStrategy: "Direct trade partnerships with smallholder farmer cooperatives in Ethiopia, Colombia, and Guatemala practicing agroforestry.",
      purityCommitment: "Third-party tested for mold/mycotoxins, ochratoxin A, and pesticide residue; roasted on zero-emission electric clean air roasters.",
      marketingApproach: "Origin documentary shorts, cupping workshops, subscription unboxing storytelling cards, and B Corp business gifting programs.",
      financialProjections: "Year 1: $220,000; Year 2: $510,000 with strong 78% DTC customer retention.",
      riskMitigation: "Pre-contract green coffee purchases on multi-year fixed pricing above Fair Trade minimums to insulate against market commodity volatility.",
      nextSteps: [
        "Install Bellwether zero-emission electric commercial roaster.",
        "Import inaugural container of Smithsonian Bird Friendly specialty green beans.",
        "Launch e-commerce storefront with customized roast profile quiz.",
        "Sign 15 local creative agency office coffee accounts."
      ]
    }
  },

  // --- Category 3: CPG & Retail ---
  {
    id: "zero-waste-refillery",
    category: "CPG & Retail",
    title: "Zero-Waste Organic Bulk Pantry & Refillery",
    businessName: "The Conscious Cupboard & Refillery",
    niche: "Package-free certified organic dry pantry staples, organic oils, vinegar, botanical cleaning agents, and personal care liquids.",
    goals: "Divert 100,000 single-use containers in Year 1 while generating $35,000 MRR from a vibrant neighborhood storefront.",
    summary: "Community hub for conscious grocery shopping where customers bring their own jars to refill premium certified organic essentials.",
    startupCostEst: "$35,000 - $75,000",
    projectedMargin: "45% - 55%",
    keyCertifications: ["USDA Organic", "Zero Waste Business Associate", "Leaping Bunny"],
    iconType: "ShoppingBag",
    defaultPlan: {
      businessName: "The Conscious Cupboard & Refillery",
      vision: "Making package-free organic living effortless, affordable, and joyful for everyday families.",
      targetMarket: "Eco-conscious urban families, zero-waste lifestyle advocates, minimalist shoppers, and ingredient-conscious home cooks.",
      revenueModel: "In-store bulk per-ounce sales, tare-weight jar deposit program, and curated zero-waste sustainable home goods retail.",
      supplyChainStrategy: "Purchasing 25lb to 50lb bulk sacks from organic growers and 55-gallon closed-loop returnable drums from liquid soap/oil makers.",
      purityCommitment: "Every consumable item certified USDA Organic or Non-GMO Project Verified; cruelty-free and non-toxic household cleaning supplies only.",
      marketingApproach: "Neighborhood jar swap drives, zero-waste living workshops, community compost drop-off partnership, and local eco-business cross promotions.",
      financialProjections: "Year 1: $240,000 ($60k net); Year 2: $410,000 with expansion of online click-and-collect in sanitized returnable jars.",
      riskMitigation: "High inventory turnover on gravity dispenser bins with strict date labeling and automated tare scales to eliminate cashier bottleneck.",
      nextSteps: [
        "Secure 1,200 sq ft retail lease in walkable eco-minded shopping district.",
        "Install custom wooden gravity dispensers and certified trade-legal tare scales.",
        "Onboard 150 core bulk organic SKUs across grains, legumes, spices, and liquids.",
        "Host neighborhood Grand Opening ribbon-cutting and zero-waste mixer."
      ]
    }
  },
  {
    id: "herbal-apothecary-skincare",
    category: "CPG & Retail",
    title: "Wildcrafted Organic Skincare & Herbal Apothecary",
    businessName: "Botanica Sylvan Wild Apothecary",
    niche: "Small-batch organic facial oils, botanical serums, herbal salves, and adaptogenic tinctures formulated with wildcrafted alpine botanicals.",
    goals: "Build a $600,000 DTC organic beauty brand with a 72% gross margin and global organic purity certifications.",
    summary: "Luxury botanical skincare and herbal wellness line merging folk herbalism with clean clinical cosmetic science.",
    startupCostEst: "$18,000 - $45,000",
    projectedMargin: "70% - 82%",
    keyCertifications: ["USDA Organic", "Ecocert COSMOS Organic", "Cruelty-Free Leaping Bunny"],
    iconType: "Heart",
    defaultPlan: {
      businessName: "Botanica Sylvan Wild Apothecary",
      vision: "Formulating bio-compatible skin food that nourishes cellular vitality while respecting fragile botanical ecosystems.",
      targetMarket: "Holistic beauty consumers, clean skincare enthusiasts, women seeking non-toxic aging solutions, and eco-luxury gift shoppers.",
      revenueModel: "Direct-to-consumer Shopify sales ($42-$88/serum), curated high-end spa wholesale accounts, and seasonal botanical beauty boxes.",
      supplyChainStrategy: "Estate-grown calendula, chamomile, and comfrey combined with ethically wildcrafted arnica and certified organic cold-pressed seed oils.",
      purityCommitment: "100% waterless formulations (hydro-distilled herbal hydrosols instead of plain water), zero synthetic preservatives, parabens, phthalates, or artificial fragrance.",
      marketingApproach: "ASMR formulation TikTok/Reels content, clean beauty influencer unboxings, dermatology and esthetician sampling program.",
      financialProjections: "Year 1: $175,000; Year 2: $480,000 propelled by high customer replenishment reorder rates (42%).",
      riskMitigation: "Formulations undergo rigorous 3-month stability and microbial challenge testing (PET) with accredited third-party laboratories.",
      nextSteps: [
        "Finalize COSMOS Organic certified formulation dossiers and stability testing.",
        "Source violet Miron glass packaging to naturally protect botanical potency.",
        "Launch direct-to-consumer flagship storefront with digital skin consultation quiz.",
        "Partner with 10 luxury clean beauty boutique spas for treatment integration."
      ]
    }
  },
  {
    id: "organic-baby-nutrition",
    category: "CPG & Retail",
    title: "Regenerative Organic Baby Food & Toddler Nutrition",
    businessName: "Little Sprout Pure Nutrition",
    niche: "Flash-frozen, nutrient-dense organic baby purees and finger foods with zero heavy metals and 100% single-origin vegetable/fruit transparency.",
    goals: "Become the trusted clean-label organic infant nutrition brand for 10,000 parents seeking zero-compromise early childhood feeding.",
    summary: "Fresh, low-temperature cooked baby meals rich in healthy fats and diverse veggies delivered direct to parents' doorsteps.",
    startupCostEst: "$40,000 - $95,000",
    projectedMargin: "45% - 55%",
    keyCertifications: ["Clean Label Project Purity Award", "USDA Organic", "Non-GMO Project", "Demeter Biodynamic"],
    iconType: "Smile",
    defaultPlan: {
      businessName: "Little Sprout Pure Nutrition",
      vision: "Cultivating lifelong vibrant health and adventurous palates from baby's very first bite through pure, heavy-metal-tested soil nutrition.",
      targetMarket: "Millennial and Gen-Z parents, working professionals, holistic pediatricians, and health-conscious grandparents.",
      revenueModel: "Weekly/monthly custom stage-based subscription boxes ($45-$85/box) and premium natural retail grocery freezer placement.",
      supplyChainStrategy: "Partnering with certified regenerative organic farms tested specifically for zero detectable lead, arsenic, cadmium, or mercury in soil.",
      purityCommitment: "No shelf-stable heat pouch destruction; gentle flash freezing locks in 95% of volatile vitamins; third-party lab results published on every batch QR code.",
      marketingApproach: "Pediatrician and lactation consultant affiliate network, parenting podcast sponsorships, and organic weaning recipe guides.",
      financialProjections: "Year 1: $210,000; Year 2: $650,000 with expansion into national cold-chain logistics.",
      riskMitigation: "Rigorous batch-by-batch ICP-MS heavy metal testing before packaging release; insulated dry-ice thermal shipping guarantees.",
      nextSteps: [
        "Complete Clean Label Project certification and third-party laboratory audits.",
        "Commission custom multi-cavity silicone freezer portioning molds.",
        "Launch direct-to-parent online subscription portal with stage-based onboarding.",
        "Secure endorsements from 25 leading pediatric nutritionists."
      ]
    }
  },
  {
    id: "organic-pet-nutrition",
    category: "CPG & Retail",
    title: "Organic Pet Nutrition & Freeze-Dried Treat Kitchen",
    businessName: "WildPaws Organic Pet Pantry",
    niche: "Human-grade, certified organic freeze-dried raw pet treats, bone broths, and herbal meal toppers for dogs and cats.",
    goals: "Capture a fast-growing market of pet parents investing in holistic, cancer-preventative nutrition for their companion animals.",
    summary: "Human-grade pet nutrition crafting freeze-dried organic organ meats, wild blueberries, and restorative bone broths.",
    startupCostEst: "$32,000 - $70,000",
    projectedMargin: "58% - 68%",
    keyCertifications: ["USDA Organic", "Human Grade Certified", "Animal Welfare Certified"],
    iconType: "ShieldCheck",
    defaultPlan: {
      businessName: "WildPaws Organic Pet Pantry",
      vision: "Extending the healthspan and vitality of our beloved four-legged family members with species-appropriate, chemical-free raw nutrition.",
      targetMarket: "Dedicated pet parents, holistic veterinarians, canine agility trainers, and pet boutique retailers.",
      revenueModel: "DTC treat subscriptions ($24-$45/mo), independent pet boutique wholesale distribution, and vet clinic retail displays.",
      supplyChainStrategy: "Upcycling nutrient-rich certified organic organ meats (beef liver, heart, bone marrow) from humane organic livestock farms.",
      purityCommitment: "Zero grain fillers, rendered meals, synthetic preservatives (BHA/BHT), or carrageenan; human-grade USDA kitchen processing.",
      marketingApproach: "Viral pet TikTok/Instagram reaction videos, holistic vet co-marketing, and event booths at high-end dog shows and farmers markets.",
      financialProjections: "Year 1: $165,000; Year 2: $390,000 with 62% average product gross margin.",
      riskMitigation: "Freeze-drying technology eliminates pathogen risk (Salmonella/Listeria) while preserving heat-sensitive enzymes without chemical preservatives.",
      nextSteps: [
        "Install industrial Harvest Right commercial freeze-dryers.",
        "Formulate recipes with Board Certified Veterinary Nutritionists.",
        "Obtain state Department of Agriculture commercial feed manufacturing licensing.",
        "Launch Kickstarter campaign to fund initial custom eco-pouch run."
      ]
    }
  },
  {
    id: "organic-hemp-botanicals",
    category: "CPG & Retail",
    title: "Certified Organic Hemp & Full-Spectrum Botanical Lab",
    businessName: "Cannavida Pure Botanical Laboratories",
    niche: "USDA Certified Organic full-spectrum CBD tinctures, organic hemp-based joint topicals, and sleep gummies infused with organic botanical terpenes.",
    goals: "Establish a trusted clinical-grade organic CBD wellness brand generating $80,000 MRR with 100% farm-to-bottle traceability.",
    summary: "Purity-first cannabinoid lab leveraging solventless organic ethanol or subcritical CO2 extraction from domestic organic hemp.",
    startupCostEst: "$45,000 - $120,000",
    projectedMargin: "65% - 78%",
    keyCertifications: ["USDA Organic", "U.S. Hemp Authority Certified", "Current GMP (cGMP)"],
    iconType: "Atom",
    defaultPlan: {
      businessName: "Cannavida Pure Botanical Laboratories",
      vision: "Restoring human endocannabinoid balance using the pure therapeutic spectrum of organic sun-grown hemp plants.",
      targetMarket: "Adults 35-65 seeking natural stress and sleep relief, seniors managing joint inflammation, and holistic healthcare practitioners.",
      revenueModel: "DTC monthly recurring subscriptions ($55-$95/mo), integrative pharmacy distribution, and chiropractor/physical therapy clinic accounts.",
      supplyChainStrategy: "Direct contracts with USDA certified organic hemp farms in Oregon and Colorado; third-party verified soil health.",
      purityCommitment: "100% certified organic ingredients down to the organic MCT coconut carrier oil and organic essential oils; zero residual heavy metals or pesticides.",
      marketingApproach: "Educational content on endocannabinoid science, doctor testimonials, podcast sponsorships, and compliant search engine marketing.",
      financialProjections: "Year 1: $320,000; Year 2: $840,000 with strong 64% subscription lifetime value.",
      riskMitigation: "Triple-testing every batch from harvest, raw crude, and finished bottle with ISO 17025 accredited labs; QR code on every box linking directly to full COAs.",
      nextSteps: [
        "Finalize cGMP facility certification and USDA organic handler audits.",
        "Produce initial 5,000 unit production run across 3 core formulations.",
        "Deploy high-converting Shopify store with compliant payment gateway.",
        "Onboard 40 chiropractic and integrative wellness clinic retail accounts."
      ]
    }
  },
  {
    id: "organic-cotton-apparel",
    category: "CPG & Retail",
    title: "Organic Fair-Trade Cotton & Plant-Dyed Apparel Line",
    businessName: "EarthWeave Ethical Organic Garments",
    niche: "Capsule collections of everyday loungewear, baby clothes, and bed linens made from GOTS-certified organic cotton and dyed with natural plant extracts.",
    goals: "Produce 10,000 toxic-free, microplastic-free ethical garments annually while generating $450,000 gross revenue.",
    summary: "Clean circular apparel brand replacing toxic synthetic azo dyes and pesticide-heavy conventional cotton with pure organic plant-dyed textiles.",
    startupCostEst: "$30,000 - $75,000",
    projectedMargin: "52% - 62%",
    keyCertifications: ["Global Organic Textile Standard (GOTS)", "Fair Trade Certified", "Oeko-Tex Standard 100"],
    iconType: "Layers",
    defaultPlan: {
      businessName: "EarthWeave Ethical Organic Garments",
      vision: "Dressing humanity in breathable, non-toxic organic fibers that celebrate human artisans and restore clean waterways.",
      targetMarket: "Conscious fashion consumers, parents wanting chemical-free clothing for babies, eco-friendly lifestyle advocates.",
      revenueModel: "Direct-to-consumer e-commerce drops ($48-$120/garment) and curated distribution in sustainable luxury lifestyle boutiques.",
      supplyChainStrategy: "Fair-trade organic cotton farmer cooperatives in India and Turkey, low-water botanical dye houses, and plastic-free manufacturing.",
      purityCommitment: "Zero heavy-metal mordants, zero formaldehyde finishes, zero synthetic elastane/polyester blends (100% natural organic cotton and natural rubber trims).",
      marketingApproach: "Behind-the-scenes dye house storytelling, 'Cost Per Wear' educational guides, and circular buyback / repair program.",
      financialProjections: "Year 1: $190,000; Year 2: $480,000 as capsule drop volume increases.",
      riskMitigation: "Pre-order capsule drop model prevents excess inventory write-downs and matches fabric milling directly to consumer demand.",
      nextSteps: [
        "Sample and fit-test initial 8-piece capsule wardrobe patterns.",
        "Secure GOTS scope certificate validation from fabric mill partner.",
        "Launch Kickstarter campaign with $50,000 funding goal to underwrite first production run.",
        "Establish plastic-free fulfillment packaging with recycled kraft mailers."
      ]
    }
  },

  // --- Category 4: Professional & Digital Services ---
  {
    id: "organic-seo-digital-agency",
    category: "Professional & Digital Services",
    title: "Organic & Eco-Brand SEO & Growth Marketing Practice",
    businessName: "Wild Harvest Organic SEO & Digital Lab",
    niche: "Specialized technical SEO, semantic authority building, and content strategy for certified organic brands, regenerative farms, and clean CPG companies.",
    goals: "Build an agile 8-person digital consultancy generating $50,000 MRR from high-retention retainer clients in the natural products sector.",
    summary: "Digital growth agency helping legitimate organic brands outrank greenwashed competitors and corporate giants.",
    startupCostEst: "$5,000 - $15,000",
    projectedMargin: "70% - 85%",
    keyCertifications: ["Google Certified Partner", "Search For Organics Verified Auditor", "1% for the Planet"],
    iconType: "BarChart",
    defaultPlan: {
      businessName: "Wild Harvest Organic SEO & Digital Lab",
      vision: "Amplifying the digital voice of genuine organic changemakers to displace greenwashed mega-corporations on search engines.",
      targetMarket: "Emerging organic CPG brands, regional farm cooperatives, eco-eCommerce stores, and natural health wellness clinics.",
      revenueModel: "Monthly recurring SEO & content retainers ($3,500-$7,500/mo), one-off Technical & Greenwash Authority Audits ($2,500), and affiliate performance bonuses.",
      supplyChainStrategy: "100% remote carbon-neutral digital infrastructure; sustainable cloud hosting powered by renewable energy (GreenGeeks, GCP).",
      purityCommitment: "Zero black-hat manipulation; we only accept clients with verified third-party organic, non-GMO, or regenerative certifications.",
      marketingApproach: "Publishing benchmark industry reports on greenwashing in search results, speaking at Natural Products Expo, and Search For Organics directory partnerships.",
      financialProjections: "Year 1: $240,000 ($180k net); Year 2: $550,000 with 14 recurring brand retainers.",
      riskMitigation: "Diversified client roster across food, beauty, agriculture, and wellness prevents sector-specific economic vulnerability.",
      nextSteps: [
        "Develop proprietary 'Organic Authority Index' algorithmic audit template.",
        "Publish 3 flagship case studies showing 300%+ organic traffic growth for clean CPG clients.",
        "Launch inbound content flywheel dissecting greenwashing claims on Google.",
        "Sign 4 founding organic brand retainer agreements."
      ]
    }
  },
  {
    id: "organic-certification-consultancy",
    category: "Professional & Digital Services",
    title: "USDA Organic & Regenerative Certification Consultancy",
    businessName: "Integrity Agri-Compliance Advisory",
    niche: "Guiding conventional farmers and food processors through the 3-year USDA Organic transition, OSP preparation, and ROC (Regenerative Organic Certified) audits.",
    goals: "Successfully transition 50,000 acres to certified organic and guide 30 food processors to USDA NOP compliance within 24 months.",
    summary: "Expert regulatory compliance advisory simplifying Organic System Plans (OSP) and USDA inspection readiness.",
    startupCostEst: "$8,000 - $20,000",
    projectedMargin: "65% - 78%",
    keyCertifications: ["IOIA Certified Organic Inspector", "ROC Approved Consultant", "SQF Practitioner"],
    iconType: "Shield",
    defaultPlan: {
      businessName: "Integrity Agri-Compliance Advisory",
      vision: "Accelerating global farmland regeneration by de-risking and simplifying the regulatory pathway to organic certification.",
      targetMarket: "Transitioning crop and livestock farmers, commercial food manufacturers, packing houses, and import/export grain brokers.",
      revenueModel: "Fixed-fee transition packages ($5,000-$15,000), hourly regulatory audit defense ($175/hr), and ongoing annual OSP update retainers ($2,500/yr).",
      supplyChainStrategy: "Proprietary digital cloud software for automated record-keeping, input material verification (OMRI/WSDA), and seed search logging.",
      purityCommitment: "Rigorous standards enforcement; 100% compliance with USDA 7 CFR Part 205 and international equivalence standards (EU/COR).",
      marketingApproach: "Workshops at regional agricultural extension offices, webinars in partnership with organic certifiers (CCOF, Tilth), and USDA grant navigation assistance.",
      financialProjections: "Year 1: $180,000; Year 2: $420,000 as multi-year farm transition contracts mature.",
      riskMitigation: "Pre-audit mock inspections eliminate unexpected non-compliances before official accredited certifying agent visits.",
      nextSteps: [
        "Publish comprehensive '3-Year Organic Farm Transition Blueprint' guide.",
        "Establish referral partnerships with regional organic farm lenders and certifiers.",
        "Launch client portal for real-time Organic System Plan documentation management.",
        "Sign initial cohort of 8 transitioning grain and berry growers."
      ]
    }
  },
  {
    id: "farm-coldchain-logistics",
    category: "Professional & Digital Services",
    title: "Sustainable Farm-to-Fork Logistics & Cold-Chain Co-op",
    businessName: "AgroRoute Clean Electric Cold-Chain",
    niche: "Refrigerated electric van freight and consolidated micro-fulfillment connecting regional organic farms to urban restaurants, grocers, and buying clubs.",
    goals: "Operate a 6-vehicle electric refrigerated fleet moving 30,000 lbs of fresh organic harvest weekly with <1% transit loss.",
    summary: "Shared-economy logistics network solving the critical 'last 100 miles' distribution gap for independent organic growers.",
    startupCostEst: "$65,000 - $150,000",
    projectedMargin: "28% - 38%",
    keyCertifications: ["SmartWay Transport Partner", "USDA Organic Handler", "HACCP Certified"],
    iconType: "Navigation",
    defaultPlan: {
      businessName: "AgroRoute Clean Electric Cold-Chain",
      vision: "Eliminating food waste and fossil fuel emissions in food distribution through intelligent, shared organic cold-chain routing.",
      targetMarket: "Independent organic farms, CSA organizers, farm-to-table restaurants, and boutique natural grocery cooperatives.",
      revenueModel: "Per-pallet pickup and drop-off delivery fees ($35-$85/drop), monthly standing route subscriptions, and temperature-controlled cross-docking storage fees.",
      supplyChainStrategy: "Route optimization algorithms cluster farm pickups by geographic watershed; solar-supplemented refrigeration units.",
      purityCommitment: "Strict USDA organic handling protocols to prevent co-mingling or cross-contamination with conventional chemically treated produce.",
      marketingApproach: "Direct outreach to organic grower associations, regional food hub consortiums, and chef buying co-ops.",
      financialProjections: "Year 1: $260,000; Year 2: $680,000 as fleet density expands across 3 adjacent metropolitan corridors.",
      riskMitigation: "Dual-temperature compartment monitoring with real-time IoT temperature logging accessible via client web dashboard.",
      nextSteps: [
        "Lease centralized cross-docking refrigerated warehouse bay.",
        "Acquire initial 2 refrigerated electric commercial delivery vans.",
        "Integrate GPS routing and temperature telemetry software.",
        "Launch pilot distribution route serving 12 partner organic farms."
      ]
    }
  },
  {
    id: "soil-restoration-landscaping",
    category: "Professional & Digital Services",
    title: "Eco-Friendly Landscaping & Native Soil Restoration Agency",
    businessName: "Living Earth Regenerative Landscapes",
    niche: "Conversion of pesticide-heavy suburban lawns and corporate campuses into native biodiverse meadows, edible organic gardens, and rain gardens.",
    goals: "Transform 80 residential and commercial properties annually, eliminating 10,000 lbs of synthetic fertilizer and pesticide runoff.",
    summary: "Ecological landscaping and soil microbiology company restoring residential soil health and biodiversity.",
    startupCostEst: "$25,000 - $55,000",
    projectedMargin: "48% - 58%",
    keyCertifications: ["NOFA Organic Land Care Accredited", "Certified Wildlife Habitat Partner"],
    iconType: "Leaf",
    defaultPlan: {
      businessName: "Living Earth Regenerative Landscapes",
      vision: "Healing the earth one yard at a time by replacing sterile chemical lawns with thriving, carbon-sequestering living ecosystems.",
      targetMarket: "Homeowners in high-income eco-conscious suburbs, corporate campuses with ESG goals, schools, and civic botanical spaces.",
      revenueModel: "Turnkey landscape installation projects ($8,000-$35,000) and recurring seasonal organic soil inoculant maintenance plans ($250-$600/mo).",
      supplyChainStrategy: "Locally sourced native perennial nurseries, on-site compost tea brewing from organic thermophilic compost, and battery-electric zero-emission mowers.",
      purityCommitment: "100% zero synthetic pesticides, glyphosate, or petroleum fertilizers; exclusively biology-first soil food web amendments.",
      marketingApproach: "Yard sign campaigns ('This Lawn is a Living Organic Sanctuary'), garden tour events, and educational pollinator habitat workshops.",
      financialProjections: "Year 1: $220,000 ($85k net); Year 2: $490,000 with strong 80% maintenance contract retention.",
      riskMitigation: "Native plant selections specifically matched to local soil texture and hydrological contours ensure 95%+ plant survival rates without excessive irrigation.",
      nextSteps: [
        "Acquire commercial compost tea brewing vortex extractor and electric utility truck.",
        "Obtain NOFA Organic Land Care professional accreditation.",
        "Build portfolio showcase of 5 showcase residential transformations.",
        "Launch spring 'Ditch the Lawn' neighborhood marketing campaign."
      ]
    }
  },
  {
    id: "organic-culinary-school",
    category: "Professional & Digital Services",
    title: "Organic Culinary School & Permaculture Retreat Center",
    businessName: "Earth Hearth Culinary & Agro-Ecology Academy",
    niche: "Immersive farm-based culinary workshops, sourdough masterclasses, natural fermentation intensives, and corporate leadership retreats.",
    goals: "Host 1,200 students annually across weekend intensives and online digital culinary masterclasses.",
    summary: "Experiential education center teaching soil-to-table cookery, fermentation, and sustainable living skills on a functioning organic farm.",
    startupCostEst: "$55,000 - $130,000",
    projectedMargin: "55% - 68%",
    keyCertifications: ["International Association of Culinary Professionals (IACP)", "Permaculture Design Certified"],
    iconType: "BookOpen",
    defaultPlan: {
      businessName: "Earth Hearth Culinary & Agro-Ecology Academy",
      vision: "Empowering a generation of home cooks and professional chefs with the ancestral culinary skills and ecological wisdom to heal the food system.",
      targetMarket: "Enthusiastic home cooks, career-shifting culinary professionals, eco-tourists, and corporate teams seeking creative wellness retreats.",
      revenueModel: "Weekend intensive tickets ($450-$850/person), corporate team building retreats ($5,000-$12,000/day), and digital streaming video courses ($19/mo).",
      supplyChainStrategy: "All workshop ingredients harvested directly from on-site 10-acre organic permaculture gardens and neighboring local organic farms.",
      purityCommitment: "100% organic, seasonal, and whole-food; wood-fired and low-energy cooking technologies; zero single-use plastics.",
      marketingApproach: "Viral culinary technique videos, guest chef collaborative residencies, and featured articles in premier food and travel publications.",
      financialProjections: "Year 1: $195,000; Year 2: $480,000 with full weekend retreat bookings and online course scale.",
      riskMitigation: "Year-round indoor commercial teaching kitchen with outdoor wood-fired kitchen allows seamless operation regardless of weather.",
      nextSteps: [
        "Outfit 12-station professional culinary demonstration kitchen with video streaming.",
        "Design curriculum for 6 flagship workshops (Sourdough, Fermentation, Wood-Fired Cookery, Foraging).",
        "Launch retreat booking website with online deposit system.",
        "Host inaugural press & influencer culinary retreat."
      ]
    }
  },
  {
    id: "clean-food-carbon-auditing",
    category: "Professional & Digital Services",
    title: "Clean Food Carbon Auditing & ESG Compliance Advisory",
    businessName: "BioScope Carbon & Regenerative ESG Lab",
    niche: "Life Cycle Assessment (LCA), on-farm soil carbon measurement, and Scope 3 emissions verification for organic food companies and agricultural funds.",
    goals: "Conduct 40 complete farm-to-shelf carbon audits and generate $350,000 in professional advisory fees in Year 1.",
    summary: "Science-backed environmental impact quantification helping organic brands measure, verify, and monetize their carbon and biodiversity metrics.",
    startupCostEst: "$15,000 - $35,000",
    projectedMargin: "68% - 80%",
    keyCertifications: ["ISO 14040/44 LCA Certified", "Verra Carbon Standard Accredited", "GHG Protocol Practitioner"],
    iconType: "Target",
    defaultPlan: {
      businessName: "BioScope Carbon & Regenerative ESG Lab",
      vision: "Providing unassailable scientific proof of the environmental superiority and carbon drawdown power of organic and regenerative agriculture.",
      targetMarket: "Mid-to-large organic food manufacturers, regenerative investment funds, agricultural cooperatives, and institutional ESG compliance officers.",
      revenueModel: "Comprehensive Brand LCA Audits ($12,000-$30,000), on-farm soil carbon sampling verification ($3,500/farm), and annual Scope 3 monitoring retainers.",
      supplyChainStrategy: "Satellite remote sensing combined with certified on-the-ground soil core laboratory testing (dry combustion elemental analysis).",
      purityCommitment: "Strict adherence to ISO 14064 GHG accounting and Verra methodology; zero greenwashing, fully transparent data methodologies.",
      marketingApproach: "Whitepapers published in collaboration with academic universities, presentations at Sustainable Foods Summit, and carbon ROI calculator tools.",
      financialProjections: "Year 1: $280,000; Year 2: $620,000 as mandatory corporate Scope 3 ESG reporting regulations take effect.",
      riskMitigation: "Methodology backed by peer-reviewed soil science models (DayCent, COMET-Farm) ensures complete regulatory audit resilience.",
      nextSteps: [
        "Formalize soil testing lab partnership with university spectroscopy department.",
        "Publish open-source 'Organic Carbon Advantage' whitepaper.",
        "Present carbon quantification case study at Sustainable Food Summit.",
        "Sign 3 anchor corporate food brand LCA contracts."
      ]
    }
  }
];
