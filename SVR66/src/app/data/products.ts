export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Image served from public/images/product-{slug}.webp
   *  Apni image ko is naam se rename karke public/images/ mein daalo */
  image: string;
  category: string;
  emoji: string;
  tagline: string;
  description: string;
  benefits: string[];
  usage: { home: string; professional: string };
  color: string;
}

export const products: Product[] = [
  {
    id: "1", name: "PlantSmör Butter", slug: "plant-based-margarine",
    image: "/images/product-plant-based-margarine.webp",
    category: "Spreads", emoji: "spread",
    tagline: "Spreads like silk, tastes like butter.",
    description: "Rich, creamy, and crafted entirely from plants. Our butter delivers the indulgent texture you love — dairy-free, cholesterol-free, and absolutely luxurious.",
    benefits: ["100% Dairy Free", "Zero Cholesterol", "Rich & Creamy"],
    usage: { home: "Toast, paratha, sandwiches.", professional: "Bakery and professional cooking." },
    color: "#FDF6E3",
  },
  {
    id: "2", name: "PlantSmör Mayonnaise", slug: "vegan-mayonnaise",
    image: "/images/product-vegan-mayonnaise.webp",
    category: "Condiments", emoji: "dip",
    tagline: "Thick, glossy, indulgent.",
    description: "Egg-free and 100% vegan, our mayonnaise achieves the creamy thickness you expect — without compromise. Every spoonful is pure plant perfection.",
    benefits: ["Egg Free", "100% Vegan", "Creamy Texture"],
    usage: { home: "Sandwiches, burgers.", professional: "Dips and gourmet dressings." },
    color: "#FAFAF0",
  },
  {
    id: "3", name: "PlantSmör Cooking Cream", slug: "vegan-cooking-cream",
    image: "/images/product-vegan-cooking-cream.webp",
    category: "Cooking Essentials", emoji: "cook",
    tagline: "Creamy like dairy. Clean like plants.",
    description: "Heat-stable and silky smooth — our cooking cream elevates every dish it touches. From pasta to curries, it performs flawlessly in the professional kitchen.",
    benefits: ["Heat Stable", "Cholesterol Free", "Plant-Based"],
    usage: { home: "Curries and pasta.", professional: "Gravies and gourmet sauces." },
    color: "#F5F0FB",
  },
  {
    id: "4", name: "Frozen Soya Chaap", slug: "frozen-soya-chaap",
    image: "/images/product-frozen-soya-chaap.webp",
    category: "Plant Protein", emoji: "protein",
    tagline: "High protein. Zero compromise.",
    description: "The meat-like texture and high-protein content of our Soya Chaap makes it the perfect plant-based protein for curries, grills, and snacks.",
    benefits: ["High Protein", "Meat-like Texture", "Plant-Based"],
    usage: { home: "Curries and snacks.", professional: "Main dish protein." },
    color: "#FFF8F0",
  },
  {
    id: "5", name: "Frozen Sweet Corn", slug: "frozen-sweet-corn",
    image: "/images/product-frozen-sweet-corn.webp",
    category: "Frozen Vegetables", emoji: "corn",
    tagline: "Sweet, pure, farm-fresh.",
    description: "Flash-frozen at peak freshness to lock in natural sweetness and nutrition. No preservatives. No compromise.",
    benefits: ["No Preservatives", "Ready to Cook", "Farm Fresh"],
    usage: { home: "Soups and snacks.", professional: "Pizza and salads." },
    color: "#FFFBF0",
  },
  {
    id: "6", name: "Frozen Green Peas", slug: "frozen-green-peas",
    image: "/images/product-frozen-green-peas.webp",
    category: "Frozen Vegetables", emoji: "peas",
    tagline: "Farm to table. Frozen at their finest.",
    description: "Vibrant, nutritious, and bursting with natural flavour. Our green peas bring the garden to your plate, every time.",
    benefits: ["High Fiber", "Nutritious", "No Preservatives"],
    usage: { home: "Sabzi and pulao.", professional: "Indian gravies." },
    color: "#F0FBF2",
  },
  {
    id: "7", name: "Frozen Mix Veg", slug: "frozen-mix-veg",
    image: "/images/product-frozen-mix-veg.webp",
    category: "Frozen Vegetables", emoji: "mix",
    tagline: "Balanced. Nourishing. Effortless.",
    description: "A curated blend of premium vegetables, frozen to preserve every nutrient. Complete nutrition in every handful.",
    benefits: ["Balanced Nutrition", "Quick Cook", "No Additives"],
    usage: { home: "Curries and rice.", professional: "Buffet dishes." },
    color: "#F0FAF5",
  },
  {
    id: "8", name: "Tomato Ketchup", slug: "tomato-ketchup",
    image: "/images/product-tomato-ketchup.webp",
    category: "Condiments", emoji: "ketchup",
    tagline: "Sweet. Tangy. Purely plant-based.",
    description: "Classic sweet and tangy ketchup — crafted without artificial colours. 100% vegan and irresistibly good with everything.",
    benefits: ["No Artificial Colors", "100% Vegan", "Classic Taste"],
    usage: { home: "Snacks and fries.", professional: "Table condiment." },
    color: "#FFF0F0",
  },
  {
    id: "9", name: "Sea Buckthorn & Mango", slug: "sea-buckthorn-mango-juice",
    image: "/images/product-sea-buckthorn-mango-juice.webp",
    category: "Wellness Drinks", emoji: "mango",
    tagline: "The Himalayan superfruit meets tropical mango.",
    description: "A delicious wellness drink blending the Himalayan superfruit with ripe, sun-ripened mango. Antioxidant-rich. Preservative-free. Extraordinary.",
    benefits: ["Rich in Vitamin C", "Antioxidant Rich", "No Added Preservatives"],
    usage: { home: "Serve chilled or add to smoothies.", professional: "Wellness menus, cafes & hotels." },
    color: "#FFF8F0",
  },
  {
    id: "10", name: "Sea Buckthorn & Mix Fruits", slug: "sea-buckthorn-mix-fruit-juice",
    image: "/images/product-sea-buckthorn-mix-fruit-juice.webp",
    category: "Wellness Drinks", emoji: "blend",
    tagline: "A superfruit symphony for daily vitality.",
    description: "A powerful superfruit blend for daily immunity and energy. Every bottle is a ritual of wellness — designed for those who demand more from nature.",
    benefits: ["Boosts Immunity", "Superfruit Blend", "No Added Preservatives"],
    usage: { home: "Daily morning wellness drink.", professional: "Nutrition programs & juice bars." },
    color: "#F5F0FF",
  },
  {
    id: "11", name: "Sea Buckthorn & Orange", slug: "sea-buckthorn-orange-juice",
    image: "/images/product-sea-buckthorn-orange-juice.webp",
    category: "Wellness Drinks", emoji: "orange",
    tagline: "Citrus brightness meets Himalayan depth.",
    description: "Refreshing citrus freshness meets the extraordinary goodness of sea buckthorn. A taste that awakens the senses and nourishes the soul.",
    benefits: ["High Vitamin C", "Refreshing Citrus", "No Added Preservatives"],
    usage: { home: "Drink chilled anytime.", professional: "Hotels, resorts & cafes." },
    color: "#FFF5EC",
  },
];

export const categoryOrder = [
  "Wellness Drinks", "Frozen Vegetables", "Plant Protein",
  "Spreads", "Condiments", "Cooking Essentials"
];
