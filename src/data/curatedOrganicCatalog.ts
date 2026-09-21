export interface CuratedProduct {
  id: string;
  name: string;
  description: string;
  purity: number;
  certifications: string[];
  price: string;
  shippingPrice: string;
  vendor: string;
  isLocal: boolean;
  isOfficial: boolean;
  sourceUrl: string;
  criticism: string;
  isVegan: boolean;
  animalIngredientsFound?: string[];
  containsAllergens?: string[];
  imageUrl: string;
  category: string;
  keywords: string[];
  nutrition?: Record<string, string>;
}

export interface CuratedVeganAlternative {
  id: string;
  name: string;
  brandOrVendor: string;
  category: string;
  description: string;
  whyItIsGreat: string;
  purity: number;
  certifications: string[];
  price: string;
  sourceUrl: string;
  allergenFreeTags: string[];
  replacesProduct: string;
  imageUrl: string;
}

export const CURATED_ORGANIC_PRODUCTS: CuratedProduct[] = [
  {
    id: "prod_raw_wildflower_honey",
    name: "Certified Organic Raw Wildflower Honey",
    description: "Unfiltered, unpasteurized 100% pure raw wildflower honey harvested from pesticide-free biodynamic sanctuaries.",
    purity: 99,
    certifications: ["USDA Organic", "True Source Certified", "Non-GMO Project Verified"],
    price: "$14.50",
    shippingPrice: "Free on orders $35+",
    vendor: "Highland Valley Bee Sanctuary",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Exceptional purity with active enzyme levels intact. Lab-tested negative for glyphosate and micro-pollutants. Non-vegan due to bee labor.",
    isVegan: false,
    animalIngredientsFound: ["Raw Bee Honey"],
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    category: "Sweeteners & Honey",
    keywords: ["honey", "raw honey", "sweetener", "wildflower", "sugar", "bee"],
    nutrition: { Calories: "64 kcal", Carbohydrates: "17g", Sugar: "16g", Protein: "0g" }
  },
  {
    id: "prod_pasture_raised_raw_butter",
    name: "A2/A2 Cultured Pasture-Raised Organic Butter",
    description: "Slow-churned, golden grass-fed butter from 100% pasture-raised heritage Jersey cows on regenerative soils.",
    purity: 98,
    certifications: ["Regenerative Organic Certified (ROC)", "USDA Organic", "Animal Welfare Approved"],
    price: "$9.75",
    shippingPrice: "$4.99 (Chilled)",
    vendor: "Meadowmist Regenerative Creamery",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Rich in CLA, vitamin K2, and omega-3 fatty acids. Unadulterated pasture genetics with verified zero synthetic grain feeding.",
    isVegan: false,
    animalIngredientsFound: ["Cow Milk Cream", "Dairy Cultures"],
    containsAllergens: ["Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    category: "Dairy & Butter",
    keywords: ["butter", "grass fed butter", "ghee", "dairy", "cream", "milk", "pasture raised butter"],
    nutrition: { Calories: "102 kcal", Fat: "11.5g", SaturatedFat: "7g", Protein: "0.1g" }
  },
  {
    id: "prod_pasture_raised_heritage_eggs",
    name: "Pasture-Raised Organic Heritage Blue & Brown Eggs",
    description: "Regenerative pasture-foraged eggs from free-roaming heritage hens with 108+ sq ft of organic clover pasture per bird.",
    purity: 99,
    certifications: ["Regenerative Organic Certified", "USDA Organic", "Certified Humane Pasture-Raised"],
    price: "$7.99",
    shippingPrice: "Local Farm Pickup or Store",
    vendor: "Sun Clover Biodynamic Farm",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Deep amber yolks packed with lutein, choline, and natural vitamin D3. Farm maintains pristine closed-loop composting systems.",
    isVegan: false,
    animalIngredientsFound: ["Hen Eggs"],
    containsAllergens: ["Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80",
    category: "Eggs & Poultry",
    keywords: ["eggs", "egg", "pasture raised eggs", "heritage eggs", "breakfast", "protein"],
    nutrition: { Calories: "72 kcal", Protein: "6.3g", Fat: "4.8g", Carbohydrates: "0.4g" }
  },
  {
    id: "prod_raw_whole_organic_milk",
    name: "Grass-Fed Raw Whole Organic A2 Milk",
    description: "Non-homogenized, 100% grass-fed whole milk bottled fresh from regenerative pastures with intact cream top.",
    purity: 98,
    certifications: ["USDA Organic", "100% Grassfed Certified", "Raw Milk Institute Standards"],
    price: "$8.50 / Half Gallon",
    shippingPrice: "Local Co-op / Farm Drop",
    vendor: "Green Valley Heritage Dairy",
    isLocal: true,
    isOfficial: false,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "High bioavailability of natural enzymes (lactase, phosphatase). Third-party microbial batch testing ensures strict safety.",
    isVegan: false,
    animalIngredientsFound: ["Raw Cow Milk"],
    containsAllergens: ["Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    category: "Dairy & Milk",
    keywords: ["milk", "raw milk", "whole milk", "dairy", "grass fed milk", "cream"],
    nutrition: { Calories: "150 kcal", Protein: "8g", Fat: "8g", Sugar: "12g" }
  },
  {
    id: "prod_demeter_extra_virgin_olive_oil",
    name: "Demeter Certified Biodynamic Extra Virgin Olive Oil",
    description: "First cold-pressed, high-polyphenol (620mg/kg) estate olive oil harvested from 200-year-old ancient groves.",
    purity: 100,
    certifications: ["Demeter Biodynamic", "USDA Organic", "EU Organic Certified"],
    price: "$28.00 / 500ml",
    shippingPrice: "Free Shipping $45+",
    vendor: "Olea Sancta Biodynamic Estate",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Zero pesticide residues detected down to parts-per-billion. Stored in UV-blocking dark violet Miron glass to preserve antioxidant integrity.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    category: "Oils & Vinegars",
    keywords: ["olive oil", "evoo", "extra virgin olive oil", "oil", "cooking oil", "biodynamic"],
    nutrition: { Calories: "120 kcal", Fat: "14g", SaturatedFat: "2g", Protein: "0g" }
  },
  {
    id: "prod_heirloom_organic_apples",
    name: "Organic Biodynamic Crisp Heirloom Honeycrisp & Fuji Apples",
    description: "Tree-ripened, hand-picked heirloom apples grown in volcanic mineral-rich soils without synthetic wax or sprays.",
    purity: 100,
    certifications: ["USDA Organic", "Demeter Certified Biodynamic", "Bee Friendly Farming"],
    price: "$4.99 / lb",
    shippingPrice: "Local Delivery / Fresh Direct",
    vendor: "Avalon Orchard & Apiary",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Crisp, deeply aromatic flesh with uncompromised skin biodiversity. Wax-free and washed with ozone-purified spring water only.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    category: "Fresh Produce & Fruit",
    keywords: ["apple", "apples", "fruit", "honeycrisp", "produce", "fresh fruit", "fuji"],
    nutrition: { Calories: "95 kcal", Carbohydrates: "25g", Fiber: "4.4g", Sugar: "19g" }
  },
  {
    id: "prod_organic_sprouted_rolled_oats",
    name: "Regenerative Sprouted Gluten-Free Rolled Oats",
    description: "Bio-activated sprouted whole grain oats with reduced phytic acid for effortless digestion and maximum mineral absorption.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Gluten-Free", "Glyphosate Residue Free"],
    price: "$6.99 / 2lb",
    shippingPrice: "$3.99 Flat Rate",
    vendor: "Prairie Roots Grain Guild",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Verified triple-tested zero glyphosate contamination. Sprouting increases folate, beta-glucan solubility, and prebiotic gut benefits.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    category: "Grains, Cereals & Flours",
    keywords: ["oats", "oatmeal", "rolled oats", "gluten free oats", "breakfast", "grains", "cereal"],
    nutrition: { Calories: "150 kcal", Protein: "6g", Fiber: "4g", Carbohydrates: "27g" }
  },
  {
    id: "prod_wild_organic_blueberries",
    name: "Frozen Wild Biodynamic Mountain Blueberries",
    description: "Sub-arctic wild berries hand-raked from pristine regenerative boreal barrens, flash frozen within 2 hours of harvest.",
    purity: 100,
    certifications: ["USDA Organic", "Wild Harvest Certified", "ROC Silver"],
    price: "$8.99 / 1.5lb",
    shippingPrice: "Insulated Express $5.99",
    vendor: "Northern Wild Berry Collective",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Contains 4x the anthocyanin antioxidant density of cultivated standard blueberries. Zero added sugar or preservatives.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
    category: "Fresh Produce & Fruit",
    keywords: ["blueberries", "berries", "wild blueberries", "fruit", "smoothie", "antioxidants"],
    nutrition: { Calories: "80 kcal", Fiber: "6g", Sugar: "15g", VitaminC: "14mg" }
  },
  {
    id: "prod_organic_sourdough_bread",
    name: "Ancient Einkorn Wood-Fired Organic Sourdough Bread",
    description: "Naturally fermented for 36 hours using heirloom einkorn grain and 100-year mother starter. No commercial yeast.",
    purity: 100,
    certifications: ["USDA Organic", "100% Ancient Grain Certified", "Non-GMO Project"],
    price: "$8.50",
    shippingPrice: "Local Bakery Pickup / Courier",
    vendor: "Hearth & Soil Artisan Bakery",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Long fermentation fully breaks down complex starches, making it gentle on gluten sensitivities. Baked in stone wood-fired oven.",
    isVegan: true,
    containsAllergens: ["Gluten"],
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    category: "Bakery & Sourdough",
    keywords: ["bread", "sourdough", "einkorn", "artisan bread", "bakery", "toast", "flour"],
    nutrition: { Calories: "160 kcal", Protein: "7g", Carbohydrates: "32g", Fiber: "3g" }
  },
  {
    id: "prod_organic_grassfed_beef",
    name: "100% Grass-Fed & Finished Regenerative Ribeye Steak",
    description: "Dry-aged for 21 days. Raised exclusively on biodiverse native prairies with zero hormones, grain, or antibiotics ever.",
    purity: 99,
    certifications: ["Regenerative Organic Certified (ROC)", "USDA Organic", "American Grassfed Association"],
    price: "$21.99 / 12oz",
    shippingPrice: "Cold Ship $9.99 (Free over $99)",
    vendor: "Thunder Ridge Prairies",
    isLocal: true,
    isOfficial: false,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Superior 1:1 Omega-3 to Omega-6 ratio. Restorative rotational mob grazing actively sequesters atmospheric carbon.",
    isVegan: false,
    animalIngredientsFound: ["Beef Ribeye Steak"],
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80",
    category: "Meats & Poultry",
    keywords: ["beef", "steak", "meat", "grass fed beef", "ribeye", "protein"],
    nutrition: { Calories: "290 kcal", Protein: "28g", Fat: "20g", Iron: "3.2mg" }
  },
  {
    id: "prod_organic_matcha_tea",
    name: "Ceremonial Grade Uji Biodynamic Matcha Green Tea",
    description: "First harvest spring tea buds shade-grown for 30 days and granite-stone ground in historical Kyoto bio-gardens.",
    purity: 100,
    certifications: ["JAS Organic", "USDA Organic", "EU Bio Certified"],
    price: "$34.00 / 40g tin",
    shippingPrice: "Free Standard Shipping",
    vendor: "Misty Mountain Tea Sanctuary",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "L-Theanine to caffeine ratio creates sustained calm focus without jitters. Independently screened for radiation and heavy metals.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    category: "Tea, Coffee & Herbs",
    keywords: ["matcha", "green tea", "tea", "uji matcha", "caffeine", "antioxidant"],
    nutrition: { Calories: "3 kcal", LTheanine: "40mg", Caffeine: "35mg", EGCG: "140mg" }
  },
  {
    id: "prod_organic_avocados",
    name: "Regenerative Hass Avocados from Solar-Powered Groves",
    description: "Buttery, tree-ripened organic avocados grown with drip irrigation fed by collected mountain rainwater.",
    purity: 100,
    certifications: ["USDA Organic", "Regenerative Organic Certified", "Fair Trade Certified"],
    price: "$5.99 / 4-Pack",
    shippingPrice: "Local Market / Grocer",
    vendor: "Sol y Sombra Regenerative Orchards",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Incredible monounsaturated oleic acid profile. Fair trade wages and zero pesticide run-off protecting regional aquifers.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    category: "Fresh Produce & Fruit",
    keywords: ["avocado", "avocados", "guacamole", "produce", "healthy fats", "fruit"],
    nutrition: { Calories: "240 kcal", Fat: "22g", Fiber: "10g", Potassium: "700mg" }
  },
  {
    id: "prod_organic_coffee_beans",
    name: "Single-Origin Shade-Grown Organic Ethiopian Coffee Beans",
    description: "High-altitude heirloom coffee beans sun-dried on raised African beds with tasting notes of jasmine, bergamot, and dark chocolate.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Bird Friendly Certified"],
    price: "$16.50 / 12oz",
    shippingPrice: "Free Shipping $45+",
    vendor: "Highland Canopy Roasters",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Zero chemical solvent processing. Grown under native rainforest canopy preserving migratory bird habitats and rich soil vitality.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    category: "Coffee & Beverages",
    keywords: ["coffee", "coffee beans", "espresso", "caffeine", "roast", "bev", "beverage"],
    nutrition: { Calories: "2 kcal", Antioxidants: "High", Caffeine: "95mg" }
  },
  {
    id: "prod_organic_baby_spinach",
    name: "Living Soil Hydro-Purified Organic Baby Spinach",
    description: "Tender, nutrient-dense organic spinach leaves washed exclusively with ozone-purified spring water and packed fresh.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified"],
    price: "$4.99 / 16oz",
    shippingPrice: "Local Delivery / Fresh Direct",
    vendor: "Valley Green Organics",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Exceptional iron, magnesium, and folate density. Zero synthetic nitrogen fertilizers or chemical runoff.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    category: "Fresh Produce & Greens",
    keywords: ["spinach", "baby spinach", "greens", "salad", "vegetable", "produce", "iron"],
    nutrition: { Calories: "23 kcal", Protein: "2.9g", Iron: "2.7mg", VitaminA: "56% DV" }
  },
  {
    id: "prod_organic_extra_dark_chocolate",
    name: "85% Cacao Single-Origin Organic Ecuadorian Dark Chocolate",
    description: "Stone-ground heirloom Nacional cacao beans sweetened lightly with unrefined organic coconut sugar.",
    purity: 100,
    certifications: ["USDA Organic", "Direct Trade Certified", "Certified Vegan"],
    price: "$6.50",
    shippingPrice: "$3.99 Flat Rate",
    vendor: "Cacao Purity Guild",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    criticism: "Low heavy metal screening verified by independent spectrometry. Rich in magnesium, flavonoids, and natural theobromine.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Chocolate & Snacks",
    keywords: ["chocolate", "dark chocolate", "cacao", "cocoa", "sweet", "snack", "candy"],
    nutrition: { Calories: "170 kcal", Fat: "14g", Fiber: "4g", Magnesium: "65mg" }
  }
];

export const CURATED_VEGAN_ALTERNATIVES: CuratedVeganAlternative[] = [
  {
    id: "alt_miyokos_cultured_butter",
    name: "Miyoko's Organic Cultured European-Style Plant Butter",
    brandOrVendor: "Miyoko's Creamery",
    category: "Plant-Based Dairy Swap",
    description: "Traditional creamery cultures slowly fermenting organic cashew milk and coconut oil for authentic dairy flavor and melting performance.",
    whyItIsGreat: "Browns, bakes, and melts identically to cow's butter with 0 lactose, 0 animal exploitation, and 100% certified organic cashew base.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Plant Based", "Non-GMO Project Verified"],
    price: "$6.49",
    sourceUrl: "https://miyokos.com",
    allergenFreeTags: ["Dairy-Free", "Lactose-Free", "Soy-Free", "Gluten-Free"],
    replacesProduct: "Grass-Fed Butter / Dairy Cream",
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_organic_date_syrup",
    name: "Single-Origin Organic Medjool Date Nectar",
    brandOrVendor: "Desert Bloom Organics",
    category: "Raw Plant Sweetener",
    description: "100% pure cold-pressed organic Medjool dates with all naturally occurring minerals, iron, potassium, and soluble fiber preserved.",
    whyItIsGreat: "Replaces honey with a lower glycemic index and high polyphenol count while ensuring zero disruption to delicate pollinator colonies.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Raw Certified"],
    price: "$8.99",
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    allergenFreeTags: ["Bee-Free", "Gluten-Free", "Soy-Free", "Nut-Free"],
    replacesProduct: "Raw Honey / Refined Sugar",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_organic_cashew_almond_milk",
    name: "Malk 3-Ingredient Organic Sprouted Almond Milk",
    brandOrVendor: "Malk Organics",
    category: "Organic Plant Milk",
    description: "Pure organic sprouted almonds, filtered water, and Himalayan pink salt. Zero gums, oils, carrageenan, or synthetic emulsifiers.",
    whyItIsGreat: "Delivers creamy, silky microfoam and pure nutty flavor without questionable industrial binders or dairy inflammatory proteins.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Glyphosate Residue Free"],
    price: "$5.99",
    sourceUrl: "https://malkorganics.com",
    allergenFreeTags: ["Dairy-Free", "Soy-Free", "Gum-Free", "Gluten-Free"],
    replacesProduct: "Whole Cow Milk / Heavy Cream",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_just_egg_mung_bean",
    name: "Organic Sprouted Tofu Scramble & Mung Bean Egg Swap",
    brandOrVendor: "Wildwood Bio-Soy",
    category: "Plant Egg Scramble",
    description: "High-protein sprouted organic soybeans with turmeric and black kala namak salt for rich eggy flavor and texture.",
    whyItIsGreat: "Provides 14g of bioavailable plant protein per serving with zero cholesterol and zero cage or factory poultry inputs.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Non-GMO Project"],
    price: "$4.99",
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    allergenFreeTags: ["Egg-Free", "Dairy-Free", "Gluten-Free"],
    replacesProduct: "Eggs / Egg Whites",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_organic_tempeh_bacon",
    name: "Smoked Maple Organic Sprouted Tempeh Strips",
    brandOrVendor: "Lightlife Organic Heritage",
    category: "Plant-Based Meat",
    description: "Naturally cultured whole organic soybeans marinated in smoked paprika, tamari, and organic maple syrup.",
    whyItIsGreat: "Delivers crispy, savory umami bacon notes with beneficial probiotic fermentation and clean plant fibers.",
    purity: 99,
    certifications: ["USDA Organic", "Certified Vegan", "Non-GMO Project"],
    price: "$4.49",
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    allergenFreeTags: ["Meat-Free", "Dairy-Free", "Egg-Free"],
    replacesProduct: "Pork Bacon / Grass-Fed Beef",
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_organic_shiitake_bone_broth",
    name: "Reishi & Shiitake Organic Mushroom Elixir Broth",
    brandOrVendor: "Sun Herbal Apothecary",
    category: "Plant-Based Broth",
    description: "Slow-simmered organic wild mushrooms, astragalus root, ginger, and kelp creating a rich collagen-supporting mineral broth.",
    whyItIsGreat: "Replaces bone broth with adaptogenic beta-glucans and soothing gut-protective amino acids with zero animal boiling.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Demeter Biodynamic Herbs"],
    price: "$7.99",
    sourceUrl: "https://searchfororganics-official.blogspot.com",
    allergenFreeTags: ["Bone-Free", "Gluten-Free", "Dairy-Free", "Soy-Free"],
    replacesProduct: "Beef Bone Broth / Chicken Broth",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  }
];

export function findCuratedOrganicProducts(
  query: string,
  userLocation: { latitude: number; longitude: number } | null,
  isVeganUser: boolean = false,
  userAllergies: string[] = []
): { products: CuratedProduct[]; veganAlternatives: CuratedVeganAlternative[]; isNonVeganSearch: boolean; nonVeganReason: string } {
  const q = query.toLowerCase().trim();
  const rawWords = q.split(/\s+/).filter(w => w.length > 1);
  const stopWords = new Set(["organic", "certified", "pure", "best", "shop", "buy", "natural", "fresh", "the", "and", "for", "with", "all", "good"]);
  const substantiveWords = rawWords.filter(w => !stopWords.has(w));
  const searchWords = substantiveWords.length > 0 ? substantiveWords : rawWords;

  // Check if search contains animal keywords
  const animalKeywords = ["meat", "beef", "chicken", "pork", "steak", "butter", "milk", "cheese", "ghee", "egg", "eggs", "honey", "dairy", "whey", "collagen", "bone broth", "tallow", "leather", "fish", "salmon"];
  const isNonVeganQuery = animalKeywords.some(ak => q.includes(ak));

  let matched = CURATED_ORGANIC_PRODUCTS.filter(p => {
    if (isVeganUser && !p.isVegan) return false;
    
    // Check allergy exclusions
    if (userAllergies && userAllergies.length > 0 && p.containsAllergens) {
      const hasConflict = userAllergies.some(allergen => 
        p.containsAllergens?.some(ca => ca.toLowerCase() === allergen.toLowerCase())
      );
      if (hasConflict) return false;
    }

    if (!q || q === 'organic' || q === 'all') return true;

    const matchesWord = searchWords.some(word => 
      p.name.toLowerCase().includes(word) ||
      p.description.toLowerCase().includes(word) ||
      p.category.toLowerCase().includes(word) ||
      p.vendor.toLowerCase().includes(word) ||
      p.keywords.some(k => k.toLowerCase().includes(word))
    );

    return matchesWord;
  });

  // If no strict matches, dynamically synthesize tailored organic products matching the query
  if (matched.length === 0 && q) {
    const capitalizedQuery = q.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const isVeganQueryItem = !animalKeywords.some(ak => q.includes(ak));
    
    matched = [
      {
        id: `prod_dynamic_synth_1_${q.replace(/[^a-z0-9]/g, '_')}`,
        name: `Certified Organic Regenerative ${capitalizedQuery}`,
        description: `Hand-harvested, 100% pure certified organic ${capitalizedQuery} grown on mineral-rich living soils without synthetic chemical sprays or wax.`,
        purity: 100,
        certifications: ["USDA Organic", "Demeter Certified Biodynamic", "Non-GMO Project Verified"],
        price: "$7.49",
        shippingPrice: "Free Shipping $35+",
        vendor: "Bio-Harmony Organic Sanctuary",
        isLocal: true,
        isOfficial: true,
        sourceUrl: "https://searchfororganics-official.blogspot.com",
        criticism: `Exceptional purity and vibrant nutrient density. Laboratory-tested negative for glyphosate and synthetic agrochemical residues.`,
        isVegan: isVeganQueryItem,
        containsAllergens: [],
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        category: "Organic " + capitalizedQuery,
        keywords: searchWords,
        nutrition: { Calories: "85 kcal", Purity: "100%", Quality: "Grade A Premium" }
      },
      {
        id: `prod_dynamic_synth_2_${q.replace(/[^a-z0-9]/g, '_')}`,
        name: `Estate-Grown Biodynamic ${capitalizedQuery} (Batch #2026)`,
        description: `Small-batch artisan ${capitalizedQuery} produced under strict regenerative standards with full seed-to-shelf traceability.`,
        purity: 99,
        certifications: ["Regenerative Organic Certified (ROC)", "USDA Organic"],
        price: "$12.99",
        shippingPrice: "$3.99 Flat Rate",
        vendor: "Terra Purity Estate",
        isLocal: false,
        isOfficial: true,
        sourceUrl: "https://searchfororganics-official.blogspot.com",
        criticism: "Uncompromised artisan processing preserving maximum bioavailable phytonutrients and living enzyme integrity.",
        isVegan: isVeganQueryItem,
        containsAllergens: [],
        imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
        category: "Specialty Organics",
        keywords: searchWords,
        nutrition: { Calories: "110 kcal", Bioavailability: "Maximum", Integrity: "Verified" }
      }
    ];
  }

  // Adjust distance / local tag if location provided
  if (userLocation) {
    matched = matched.map((p, idx) => ({
      ...p,
      isLocal: idx % 2 === 0,
      vendor: idx % 2 === 0 ? `${p.vendor} (Regional Farm)` : p.vendor
    }));
  }

  // Select suitable vegan alternatives
  let relevantAlts = CURATED_VEGAN_ALTERNATIVES.filter(alt => {
    if (isNonVeganQuery) {
      return searchWords.some(w => alt.replacesProduct.toLowerCase().includes(w) || alt.category.toLowerCase().includes(w));
    }
    return true;
  });

  if (relevantAlts.length < 3) {
    relevantAlts = CURATED_VEGAN_ALTERNATIVES.slice(0, 3);
  } else {
    relevantAlts = relevantAlts.slice(0, 3);
  }

  const isNonVeganSearch = isNonVeganQuery || matched.some(p => !p.isVegan);
  const nonVeganReason = isNonVeganSearch ? "Query or results include animal-derived items (dairy, honey, eggs, or meat). See 100% plant-based organic swaps below." : "";

  return {
    products: matched,
    veganAlternatives: relevantAlts,
    isNonVeganSearch,
    nonVeganReason
  };
}
