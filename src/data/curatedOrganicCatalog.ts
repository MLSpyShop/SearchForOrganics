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
    id: "prod_organic_valley_pasture_butter",
    name: "Organic Valley Cultured Pasture-Raised Butter",
    description: "USDA Certified Organic butter made from pasture-raised cows on family farms. Churned with live cultures for exceptional culinary flavor.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Available at natural grocers & online retail",
    vendor: "Organic Valley Family of Farms",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.organicvalley.coop",
    criticism: "Top-tier organic dairy integrity from farmer-owned cooperative. Cows spend significant time on certified organic pastures with zero synthetic hormones or toxic pesticides.",
    isVegan: false,
    animalIngredientsFound: ["Organic Pasteurized Cream (Milk)", "Cultures"],
    containsAllergens: ["Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    category: "Dairy & Butter",
    keywords: ["butter", "grass fed butter", "pasture raised butter", "dairy", "cream", "organic valley"],
    nutrition: { Calories: "100 kcal", Fat: "11g", SaturatedFat: "7g", Protein: "0g" }
  },
  {
    id: "prod_organic_valley_whole_milk",
    name: "Organic Valley Grassmilk Whole Milk",
    description: "100% grass-fed organic whole milk from cows that eat only fresh organic pasture grasses and dried forages. Never fed grains or corn.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Grass-Fed Organic", "Non-GMO"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Chilled Grocery Pickup & Distribution",
    vendor: "Organic Valley",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.organicvalley.coop",
    criticism: "Verified 100% grass-fed organic standard. Higher naturally occurring omega-3 fatty acids and conjugated linoleic acid (CLA) compared to conventional milk.",
    isVegan: false,
    animalIngredientsFound: ["Organic Whole Milk"],
    containsAllergens: ["Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    category: "Dairy & Milk",
    keywords: ["milk", "whole milk", "raw milk", "grass fed milk", "dairy", "grassmilk"],
    nutrition: { Calories: "150 kcal", Fat: "8g", Protein: "8g", Calcium: "300mg" }
  },
  {
    id: "prod_vital_farms_organic_eggs",
    name: "Vital Farms Certified Pasture-Raised Organic Eggs",
    description: "Pasture-raised eggs from small family farms where each hen receives a minimum of 108 square feet of certified organic open pasture.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Humane Raised & Handled", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    shippingPrice: "In-store fresh grocery availability",
    vendor: "Vital Farms",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.vitalfarms.com",
    criticism: "Industry benchmark for transparent pasture-raised organic egg production. Rich amber yolks reflecting foraging diet on pesticide-free pastures.",
    isVegan: false,
    animalIngredientsFound: ["Hen Eggs"],
    containsAllergens: ["Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80",
    category: "Eggs & Poultry",
    keywords: ["eggs", "pasture raised eggs", "organic eggs", "vital farms", "breakfast", "protein"],
    nutrition: { Calories: "70 kcal", Protein: "6g", Fat: "5g", Choline: "150mg" }
  },
  {
    id: "prod_wholesome_raw_organic_honey",
    name: "Wholesome Sweeteners Organic Raw Unfiltered Honey",
    description: "100% pure raw, unfiltered organic honey harvested from protected pesticide-free hives deep in organic forest reserves.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Grocery Retail",
    vendor: "Wholesome Sweeteners",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.wholesomesweet.com",
    criticism: "Strictly tested for zero pesticide residues and zero artificial syrups. Gently strained to preserve live enzymes, antioxidants, and bee pollen.",
    isVegan: false,
    animalIngredientsFound: ["Raw Honey"],
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    category: "Sweeteners & Honey",
    keywords: ["honey", "raw honey", "organic honey", "sweetener", "wholesome", "bee"],
    nutrition: { Calories: "60 kcal", Carbohydrates: "17g", Sugar: "16g", Protein: "0g" }
  },
  {
    id: "prod_natures_path_rolled_oats",
    name: "Nature's Path Organic Old Fashioned Rolled Oats",
    description: "100% whole grain organic oats grown sustainably without glyphosate or synthetic fertilizers. Heart-healthy and high in beta-glucan fiber.",
    purity: 100,
    certifications: ["USDA Organic", "Canada Organic", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Online & In-Store",
    vendor: "Nature's Path Organic",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.naturespath.com",
    criticism: "Pioneer independent organic brand with rigorous glyphosate residue testing and organic crop stewardship across North America.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    category: "Grains & Cereals",
    keywords: ["oats", "rolled oats", "oatmeal", "cereal", "grains", "breakfast", "natures path"],
    nutrition: { Calories: "150 kcal", Fiber: "4g", Protein: "5g", Iron: "1.5mg" }
  },
  {
    id: "prod_eden_foods_black_beans",
    name: "Eden Foods Organic Black Beans (Pressure-Cooked & BPA-Free)",
    description: "USA-grown certified organic black beans, soaked overnight and pressure-cooked with kombu sea vegetable in BPA/BPS-free cans.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Kombu Digestive Standard"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Nationwide Retail & Co-op Shipping",
    vendor: "Eden Foods",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.edenfoods.com",
    criticism: "Gold standard for canned legume integrity. First company to eliminate toxic bisphenol can liners; kombu improves mineral assimilation.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    category: "Pantry & Legumes",
    keywords: ["beans", "black beans", "legumes", "protein", "eden foods", "pantry"],
    nutrition: { Calories: "110 kcal", Protein: "8g", Fiber: "8g", Sodium: "15mg" }
  },
  {
    id: "prod_lundberg_wild_rice",
    name: "Lundberg Family Farms Regenerative Organic Rice",
    description: "Sustainably grown California short and long grain brown and wild rice cultivated with regenerative organic soil and waterfowl habitat conservation.",
    purity: 100,
    certifications: ["Regenerative Organic Certified (ROC)", "USDA Organic", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Nationwide Retail & Grocery Delivery",
    vendor: "Lundberg Family Farms",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.lundberg.com",
    criticism: "Premier regenerative organic farm. ROC certified ensuring rigorous soil biology renewal, field biodiversity, and fair worker standards.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    category: "Grains & Rice",
    keywords: ["rice", "brown rice", "wild rice", "grains", "lundberg", "regenerative"],
    nutrition: { Calories: "160 kcal", Carbohydrates: "34g", Fiber: "2g", Protein: "3g" }
  },
  {
    id: "prod_bragg_raw_apple_cider_vinegar",
    name: "Bragg Organic Raw Unfiltered Apple Cider Vinegar",
    description: "Made from delicious certified organic apples. Raw, unfiltered, unheated, unpasteurized and 5% acidity, featuring the miraculous 'Mother'.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Global Grocery Availability",
    vendor: "Bragg Live Food Products",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.bragg.com",
    criticism: "Classic authentic raw vinegar containing beneficial acetic acid, living enzymatic strands, and prebiotic gut-supporting polyphenols.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    category: "Oils & Vinegars",
    keywords: ["vinegar", "apple cider vinegar", "acv", "bragg", "digestive", "apples"],
    nutrition: { Calories: "0 kcal", Potassium: "11mg", Acidity: "5%" }
  },
  {
    id: "prod_dr_bronners_virgin_coconut_oil",
    name: "Dr. Bronner's Regenerative Organic Virgin Coconut Oil",
    description: "Fair trade, cold-pressed organic whole kernel virgin coconut oil sourced from regenerative organic smallholder farms in Sri Lanka.",
    purity: 100,
    certifications: ["Regenerative Organic Certified (ROC)", "USDA Organic", "Fair For Life Fair Trade"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Global Delivery & Retail Grocery",
    vendor: "Dr. Bronner's",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.drbronner.com",
    criticism: "Highest ethical and environmental standard in the tropical oil sector. ROC certified supporting regenerative agroforestry and small family farmers.",
    isVegan: true,
    containsAllergens: ["Coconut"],
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    category: "Oils & Healthy Fats",
    keywords: ["coconut oil", "oil", "cooking oil", "dr bronners", "virgin coconut oil", "healthy fats"],
    nutrition: { Calories: "120 kcal", Fat: "14g", LauricAcid: "7g", Carbohydrates: "0g" }
  },
  {
    id: "prod_straus_family_creamery_yogurt",
    name: "Straus Family Creamery Organic Whole Milk Greek Yogurt",
    description: "European-style organic Greek yogurt slowly pasteurized and cultured with live enzymes. Zero thickeners, gums, stabilizers, or added sweeteners.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Certified Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Chilled West Coast & Natural Grocer Distribution",
    vendor: "Straus Family Creamery",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.strausfamilycreamery.com",
    criticism: "First 100% certified organic creamery in the United States. Minimal vat pasteurization protects milk structure, yielding thick, clean tartness.",
    isVegan: false,
    animalIngredientsFound: ["Organic Pasteurized Whole Milk", "Live Active Cultures"],
    containsAllergens: ["Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80",
    category: "Dairy & Yogurt",
    keywords: ["yogurt", "greek yogurt", "dairy", "milk", "straus", "probiotic"],
    nutrition: { Calories: "170 kcal", Protein: "10g", Fat: "9g", Calcium: "260mg" }
  },
  {
    id: "prod_traditional_medicinals_chamomile",
    name: "Traditional Medicinals Organic Chamomile Tea",
    description: "Certified Organic and Fair Trade pharmacopoeial-grade herbal tea formulated by herbalists to soothe digestion and support nervous system calm.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Non-GMO Project Verified", "Certified B Corp"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Global Retail",
    vendor: "Traditional Medicinals",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.traditionalmedicinals.com",
    criticism: "Strict pharmacopoeial quality testing verifying high levels of essential chamomile oils and luteolin with zero heavy metals or synthetic pesticide residues.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    category: "Herbal Teas & Beverages",
    keywords: ["tea", "chamomile", "herbal tea", "beverage", "organic tea", "traditional medicinals"],
    nutrition: { Calories: "0 kcal", ChamomileFlower: "1300mg" }
  },
  {
    id: "prod_cascadian_farm_blueberries",
    name: "Cascadian Farm Organic Frozen Wild Blueberries",
    description: "Quick-frozen USDA Organic wild blueberries picked at peak ripeness from certified organic berry orchards. Loaded with anthocyanin antioxidants.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Available in grocery frozen organic aisles",
    vendor: "Cascadian Farm",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.cascadianfarm.com",
    criticism: "Excellent frozen organic fruit standard preserving cellular antioxidant integrity with zero added syrups, preservatives, or chemical washes.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    category: "Produce & Berries",
    keywords: ["blueberries", "berries", "fruit", "wild blueberries", "frozen fruit", "cascadian farm"],
    nutrition: { Calories: "80 kcal", Sugar: "15g", Fiber: "4g", VitaminC: "10mg" }
  },
  {
    id: "prod_bobs_red_mill_organic_flour",
    name: "Bob's Red Mill Organic Unbleached White Flour",
    description: "Enriched stone-ground organic baking flour milled from premium certified organic hard red wheat. Never bromated, bleached, or chemically treated.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & In-Store Baking Aisles",
    vendor: "Bob's Red Mill",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.bobsredmill.com",
    criticism: "Classic heritage miller. Zero potassium bromate, zero chlorine dioxide bleach, zero synthetic enrichment additives.",
    isVegan: true,
    containsAllergens: ["Gluten", "Wheat"],
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    category: "Baking & Grains",
    keywords: ["flour", "baking", "wheat", "sourdough", "bread", "bobs red mill"],
    nutrition: { Calories: "110 kcal", Carbohydrates: "23g", Protein: "4g" }
  },
  {
    id: "prod_alter_eco_blackout_chocolate",
    name: "Alter Eco Organic Classic Deep Dark Chocolate (85% Cacao)",
    description: "USDA Certified Organic and Fair Trade Swiss-crafted deep dark chocolate made from single-origin Ecuadorian heirloom cacao beans and organic cocoa butter.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Non-GMO Project Verified", "Certified B Corp", "Climate Neutral"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Global Natural Grocers",
    vendor: "Alter Eco",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://www.alterecofoods.com",
    criticism: "Exemplary ethical and organic purity in confectionery. Sourced from regenerative agroforestry smallholder co-ops in Ecuador; zero artificial emulsifiers, soy lecithin, or refined cane sugar.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Organic Chocolate & Sweets",
    keywords: ["chocolate", "dark chocolate", "organic chocolate", "cacao", "cocoa", "alter eco", "fair trade chocolate", "candy", "sweets"],
    nutrition: { Calories: "180 kcal", Fat: "17g", SaturatedFat: "10g", Carbohydrates: "11g", Fiber: "5g", Sugars: "4g", Iron: "4mg" }
  },
  {
    id: "prod_theo_organic_dark_chocolate",
    name: "Theo Chocolate Organic Pure 85% Dark Chocolate Bar",
    description: "Pioneering organic bean-to-bar chocolate crafted from certified fair trade organic cocoa beans with rich notes of roasted cocoa and dried fruit.",
    purity: 100,
    certifications: ["USDA Organic", "Fair for Life Certified", "Non-GMO Project Verified", "Certified Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Online & Natural Food Aisles",
    vendor: "Theo Chocolate",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://theochocolate.com",
    criticism: "First Fair for Life and USDA Organic certified chocolate maker in North America. Strict third-party traceability from smallholder cacao farmers in the Congo and Peru directly to the factory.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Organic Chocolate & Sweets",
    keywords: ["chocolate", "dark chocolate", "organic dark chocolate", "theo chocolate", "cocoa", "cacao", "fair trade", "vegan chocolate"],
    nutrition: { Calories: "200 kcal", Fat: "16g", Fiber: "6g", Protein: "4g", Sugars: "5g" }
  },
  {
    id: "prod_hu_kitchen_simple_chocolate",
    name: "Hu Kitchen Simple Organic Dark Chocolate (70% Cacao)",
    description: "Paleo, vegan, and certified organic dark chocolate made with just 3 clean organic ingredients: organic cacao, unrefined organic coconut sugar, and organic fair-trade cocoa butter.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Certified Gluten-Free", "Non-GMO"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Retail Grocers & Direct Shipping",
    vendor: "Hu Kitchen",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://hukitchen.com",
    criticism: "Industry-leading ultra-clean chocolate formulation. Completely free of palm oil, soy lecithin, cane sugar, dairy, and emulsifiers.",
    isVegan: true,
    containsAllergens: ["Coconut"],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Organic Chocolate & Sweets",
    keywords: ["chocolate", "hu chocolate", "dark chocolate", "organic chocolate", "cacao", "paleo chocolate", "vegan chocolate", "candy"],
    nutrition: { Calories: "180 kcal", Fat: "13g", Carbohydrates: "13g", Sugars: "7g", Fiber: "3g" }
  },
  {
    id: "prod_navitas_organic_cacao_powder",
    name: "Navitas Organics Certified Organic Raw Cacao Powder",
    description: "100% pure, unroasted organic cacao powder cold-pressed from raw cacao beans to preserve delicate antioxidant flavonoids and magnesium.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Non-GMO Project Verified", "Certified B Corp"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Nationwide Pantry & Natural Grocery",
    vendor: "Navitas Organics",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://navitasorganics.com",
    criticism: "Premier nutrient-dense raw chocolate superfood. Unroasted cold-pressing yields substantially higher polyphenols and theobromine than alkalized Dutch cocoa.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Superfoods & Cacao",
    keywords: ["cacao", "cacao powder", "cocoa", "chocolate", "hot chocolate", "baking cocoa", "navitas", "raw cacao", "superfood"],
    nutrition: { Calories: "20 kcal", Magnesium: "41mg", Flavonols: "733mg", Fiber: "2g", Iron: "1.3mg" }
  },
  {
    id: "prod_equal_exchange_dark_chocolate",
    name: "Equal Exchange Organic Extra Dark Chocolate (80% Cacao)",
    description: "Small farmer-grown organic extra dark chocolate made through authentic democratic fair trade partnerships with cacao cooperatives in Latin America.",
    purity: 100,
    certifications: ["USDA Organic", "Small Farmer Certified Fair Trade", "Kosher"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Independent Co-op Grocers",
    vendor: "Equal Exchange",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://equalexchange.coop",
    criticism: "Worker-owned cooperative setting gold standards for farmer equity. No chemical processing or alkalization; rich complex chocolate finish.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Organic Chocolate & Sweets",
    keywords: ["chocolate", "dark chocolate", "equal exchange", "organic chocolate", "cocoa", "cacao", "coop chocolate"],
    nutrition: { Calories: "210 kcal", Fat: "17g", Fiber: "5g", Sugars: "8g", Protein: "3g" }
  },
  {
    id: "prod_pascha_organic_chocolate_chips",
    name: "Pascha Organic 85% Cacao Dark Chocolate Chips (Allergen-Free)",
    description: "Dedicated top-8 allergen-free organic dark chocolate chips made from single-origin Criollo cacao beans for clean baking and snacking.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Certified Vegan", "UTZ Certified Cacao"],
    price: "Check Local Store / Market Price",
    shippingPrice: "Direct Shipping & Natural Grocers",
    vendor: "Pascha Chocolate",
    isLocal: false,
    isOfficial: true,
    sourceUrl: "https://paschachocolate.com",
    criticism: "Manufactured in a certified peanut-free, nut-free, dairy-free, soy-free, and gluten-free facility. Zero cross-contamination risk for sensitive households.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    category: "Baking & Chocolate",
    keywords: ["chocolate chips", "dark chocolate chips", "baking chocolate", "chocolate", "pascha", "allergen free chocolate", "vegan chocolate"],
    nutrition: { Calories: "160 kcal", Fat: "13g", Sugars: "4g", Fiber: "4g" }
  },
  {
    id: "prod_codiac_organics_nb",
    name: "Codiac Organics - Certified Organic Farm & CSA",
    description: "Certified organic urban farm and seasonal market in Greater Moncton, NB producing seasonal organic potatoes, greens, roots, and vegetables.",
    purity: 100,
    certifications: ["Canada Organic", "Ecocert Certified", "Buy Local NB"],
    price: "Visit Local Farm Market for Pricing",
    shippingPrice: "Local Farm Stand & Moncton Community Pickup",
    vendor: "Codiac Organics",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://codiacorganics.ca",
    criticism: "Authentic Atlantic Canadian organic certified grower. Year-round food hub supporting soil health and local Moncton community food resilience.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
    category: "Local Organic Produce",
    keywords: ["potato", "potatoes", "moncton", "new brunswick", "csa", "codiac organics", "vegetables"],
    nutrition: { OrganicStatus: "100% Certified Ecocert Canada Organic", Region: "Moncton, NB" }
  },
  {
    id: "prod_natures_route_farm_nb",
    name: "Nature's Route Farm - Certified Organic Produce & CSA",
    description: "Family-run certified organic vegetable and small fruit farm serving Moncton, Dieppe, and southeastern New Brunswick with fresh organic harvest boxes.",
    purity: 100,
    certifications: ["Canada Organic", "Ecocert Canada Certified"],
    price: "Check Farm CSA Shares / Market Pricing",
    shippingPrice: "Regional Drop-Off & Farmers Market Pickup",
    vendor: "Nature's Route Farm",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://www.naturesroutefarm.ca",
    criticism: "Verified Ecocert Canada certified producer growing nutrient-rich organic heirloom varieties with biological pest control and active cover cropping.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    category: "Local Organic Produce",
    keywords: ["csa", "vegetables", "moncton", "farm", "produce", "natures route farm", "new brunswick"],
    nutrition: { OrganicStatus: "Ecocert Canada Organic Certified", Region: "Sackville / Moncton, NB" }
  },
  {
    id: "prod_sequoia_natural_market",
    name: "Sequoia Natural Organics & Whole Foods",
    description: "Independent regional natural market stocking certified organic produce, bulk organic grains, organic groceries, and ecological wellness products.",
    purity: 98,
    certifications: ["Canada Organic Standard", "Non-GMO Retailer"],
    price: "In-Store & Local Delivery",
    shippingPrice: "Moncton Metro In-Store & Delivery",
    vendor: "Sequoia Organics",
    isLocal: true,
    isOfficial: true,
    sourceUrl: "https://sequoiaorganics.ca",
    criticism: "Longstanding community organic grocer providing strict label auditing and verified organic food transparency across New Brunswick.",
    isVegan: true,
    containsAllergens: [],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    category: "Organic Grocery Store",
    keywords: ["market", "grocer", "moncton", "sequoia", "store", "organic groceries"],
    nutrition: { OrganicAudited: "Yes", Region: "Moncton & Dieppe, NB" }
  }
];

export const CURATED_VEGAN_ALTERNATIVES: CuratedVeganAlternative[] = [
  {
    id: "alt_miyokos_cultured_butter",
    name: "Miyoko's Organic Cultured European-Style Plant Butter",
    brandOrVendor: "Miyoko's Creamery",
    category: "Plant-Based Dairy Swap",
    description: "Traditional creamery cultures fermenting certified organic cashew milk and organic coconut oil for authentic dairy culinary performance.",
    whyItIsGreat: "Browns, bakes, and melts like butter with zero lactose, zero dairy hormones, and 100% USDA Organic certified whole-food cashew base.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Plant Based", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    sourceUrl: "https://miyokos.com",
    allergenFreeTags: ["Dairy-Free", "Lactose-Free", "Soy-Free", "Gluten-Free"],
    replacesProduct: "Butter / Dairy Cream",
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_malk_organic_almond_milk",
    name: "Malk 3-Ingredient Organic Sprouted Almond Milk",
    brandOrVendor: "Malk Organics",
    category: "Organic Plant Milk",
    description: "Pure organic sprouted almonds, filtered water, and Himalayan pink salt. Zero gums, oils, carrageenan, or synthetic emulsifiers.",
    whyItIsGreat: "Silky texture with genuine nutty flavor and clean micronutrients, entirely free from industrial thickeners or dairy allergen proteins.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Glyphosate Residue Free"],
    price: "Check Local Store / Market Price",
    sourceUrl: "https://malkorganics.com",
    allergenFreeTags: ["Dairy-Free", "Soy-Free", "Gum-Free", "Gluten-Free"],
    replacesProduct: "Cow Milk / Dairy Milk",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_forager_cashew_yogurt",
    name: "Forager Project Organic Probiotic Cashew Milk Yogurt",
    brandOrVendor: "Forager Project",
    category: "Organic Plant Yogurt",
    description: "Slow-fermented organic cashew milk infused with live probiotic cultures for human gut microbiome diversity.",
    whyItIsGreat: "Rich and creamy plant-based yogurt providing beneficial active strains without dairy inflammation, dairy hormones, or synthetic stabilizers.",
    purity: 100,
    certifications: ["USDA Organic", "Certified Vegan", "Non-GMO Project Verified"],
    price: "Check Local Store / Market Price",
    sourceUrl: "https://www.foragerproject.com",
    allergenFreeTags: ["Dairy-Free", "Soy-Free", "Gluten-Free"],
    replacesProduct: "Dairy Greek Yogurt / Sour Cream",
    imageUrl: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_wholesome_agave_nectar",
    name: "Wholesome Organic Fair Trade Blue Agave Nectar",
    brandOrVendor: "Wholesome Sweeteners",
    category: "Organic Plant Sweetener",
    description: "100% pure organic nectar cold-extracted from Mexican blue agave tequilana plants. Naturally low glycemic index.",
    whyItIsGreat: "Delicious natural 100% plant-based liquid sweetener that substitutes for honey without interfering with pollinator bee colonies.",
    purity: 100,
    certifications: ["USDA Organic", "Fair Trade Certified", "Certified Vegan", "Non-GMO"],
    price: "Check Local Store / Market Price",
    sourceUrl: "https://www.wholesomesweet.com",
    allergenFreeTags: ["Bee-Free", "Gluten-Free", "Soy-Free", "Nut-Free"],
    replacesProduct: "Raw Honey / Refined Sugar",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alt_nutiva_organic_coconut_oil",
    name: "Nutiva Organic Cold-Pressed Virgin Coconut Oil",
    brandOrVendor: "Nutiva",
    category: "Plant Cooking Fat",
    description: "Freshly cold-pressed from organic coconuts within hours of harvest. Rich in medium chain triglycerides (MCTs).",
    whyItIsGreat: "Replaces lard, tallow, and butter in high-heat sautéing and baking with zero animal fats and high thermal stability.",
    purity: 100,
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Fair Trade Certified"],
    price: "Check Local Store / Market Price",
    sourceUrl: "https://www.nutiva.com",
    allergenFreeTags: ["Dairy-Free", "Lard-Free", "Soy-Free"],
    replacesProduct: "Lard / Tallow / Ghee",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
  }
];

export function searchCuratedProducts(
  query: string,
  userLocation: { latitude: number; longitude: number } | null = null,
  isVeganUser: boolean = false,
  userAllergies: string[] = []
): {
  products: CuratedProduct[];
  veganAlternatives: CuratedVeganAlternative[];
  isNonVeganSearch: boolean;
  nonVeganReason: string;
} {
  const q = (query || '').toLowerCase().trim();
  const rawWords = q.split(/\s+/).filter(w => w.length > 2);
  const stopWords = new Set(["organic", "certified", "pure", "best", "shop", "buy", "natural", "fresh", "the", "and", "for", "with", "all", "good", "local"]);
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

  // DO NOT INVENT OR GENERATE FAKE PRODUCTS. If no authentic products match, return empty array.

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
