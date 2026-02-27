export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type PackageItem = {
  productId: string;
  defaultQty: number;
};

export type Package = {
  slug: string;
  name: string;
  description: string;
  image: string;
  items: PackageItem[];
};

// --------------- PRODUCTS ---------------

export const products: Product[] = [
  // Mlijeko & mliječni
  {
    id: "lagano-jutro-1l",
    name: "Lagano jutro lactose-free milk 0% 1L",
    price: 3.48,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    category: "Mlijeko & mliječni",
  },
  {
    id: "dukat-mlijeko-1l",
    name: "Dukat fresh milk 3.2% 1L",
    price: 1.89,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop",
    category: "Mlijeko & mliječni",
  },
  {
    id: "jogurt-natur-180g",
    name: "Natural yogurt 180g",
    price: 0.99,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop",
    category: "Mlijeko & mliječni",
  },
  {
    id: "maslo-250g",
    name: "Butter 250g",
    price: 3.29,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop",
    category: "Mlijeko & mliječni",
  },
  {
    id: "sir-gauda-narezak",
    name: "Gouda cheese sliced 150g",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop",
    category: "Mlijeko & mliječni",
  },

  // Voda
  {
    id: "jana-1.5l",
    name: "Jana natural water 1.5L",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop",
    category: "Voda",
  },
  {
    id: "jamnica-mineral-1.5l",
    name: "Jamnica mineral water 1.5L",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1564419320461-6eb9c0ffa44c?w=200&h=200&fit=crop",
    category: "Voda",
  },
  {
    id: "jana-0.5l",
    name: "Jana natural water 0.5L",
    price: 0.89,
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea55?w=200&h=200&fit=crop",
    category: "Voda",
  },

  // Sokovi & pića
  {
    id: "coca-cola-0.33l",
    name: "Coca Cola 0.33L can",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop",
    category: "Pića",
  },
  {
    id: "coca-cola-zero-0.33l",
    name: "Coca Cola Zero 0.33L can",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=200&h=200&fit=crop",
    category: "Pića",
  },
  {
    id: "fanta-0.33l",
    name: "Fanta Orange 0.33L can",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=200&h=200&fit=crop",
    category: "Pića",
  },
  {
    id: "sprite-0.33l",
    name: "Sprite 0.33L can",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop",
    category: "Pića",
  },
  {
    id: "cedevita-naranca",
    name: "Cedevita Orange 500g",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop",
    category: "Pića",
  },
  {
    id: "sok-od-narance-1l",
    name: "Orange juice 1L",
    price: 2.79,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&h=200&fit=crop",
    category: "Pića",
  },

  // Pivo
  {
    id: "heineken-0.5l",
    name: "Heineken beer 0.5L can",
    price: 3.04,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop",
    category: "Pivo",
  },
  {
    id: "ozujsko-0.5l",
    name: "Ožujsko beer 0.5L can",
    price: 1.69,
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop",
    category: "Pivo",
  },
  {
    id: "karlovacko-0.5l",
    name: "Karlovačko beer 0.5L can",
    price: 1.69,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=200&h=200&fit=crop",
    category: "Pivo",
  },

  // Vino
  {
    id: "vino-bijelo-0.75l",
    name: "Graševina white wine 0.75L",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1566995541428-f2246e17f722?w=200&h=200&fit=crop",
    category: "Vino",
  },
  {
    id: "vino-crno-0.75l",
    name: "Plavac Mali red wine 0.75L",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop",
    category: "Vino",
  },
  {
    id: "rose-0.75l",
    name: "Rosé wine 0.75L",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=200&h=200&fit=crop",
    category: "Vino",
  },

  // Snacks
  {
    id: "chipsy-150g",
    name: "Potato chips salted 150g",
    price: 2.19,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
    category: "Snacks",
  },
  {
    id: "kikiriki-200g",
    name: "Roasted peanuts 200g",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=200&h=200&fit=crop",
    category: "Snacks",
  },
  {
    id: "keksici-napolitanke",
    name: "Napolitanke wafers 330g",
    price: 3.29,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop",
    category: "Snacks",
  },
  {
    id: "smoki-150g",
    name: "Peanut puffs 150g",
    price: 2.39,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop",
    category: "Snacks",
  },

  // Voće & povrće
  {
    id: "banane-1kg",
    name: "Bananas 1kg",
    price: 1.79,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
    category: "Voće & povrće",
  },
  {
    id: "jabuke-1kg",
    name: "Apples 1kg",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop",
    category: "Voće & povrće",
  },
  {
    id: "rajcice-1kg",
    name: "Tomatoes 1kg",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200&h=200&fit=crop",
    category: "Voće & povrće",
  },
  {
    id: "limun-500g",
    name: "Lemons 500g",
    price: 1.49,
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop",
    category: "Voće & povrće",
  },

  // Kruh & peciva
  {
    id: "toast-kruh",
    name: "Toast bread 500g",
    price: 1.59,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=200&h=200&fit=crop",
    category: "Kruh & peciva",
  },
  {
    id: "pecivo-kifle-6kom",
    name: "Croissants 6 pcs",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=200&fit=crop",
    category: "Kruh & peciva",
  },

  // Namazi & konzerve
  {
    id: "nutella-400g",
    name: "Nutella 400g",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop",
    category: "Namazi & konzerve",
  },
  {
    id: "tuna-konzerva",
    name: "Tuna in olive oil 160g",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=200&h=200&fit=crop",
    category: "Namazi & konzerve",
  },
  {
    id: "masline-zelene-200g",
    name: "Green olives 200g",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1474085693589-aa0c999af4e2?w=200&h=200&fit=crop",
    category: "Namazi & konzerve",
  },

  // Jaja & meso
  {
    id: "jaja-10kom",
    name: "Fresh eggs 10 pcs",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
    category: "Jaja & meso",
  },
  {
    id: "pilece-prsa-500g",
    name: "Chicken breast 500g",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=200&h=200&fit=crop",
    category: "Jaja & meso",
  },
  {
    id: "kulen-narezak-100g",
    name: "Kulen sliced 100g",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop",
    category: "Jaja & meso",
  },

  // Začini & ostalo
  {
    id: "maslinovo-ulje-0.5l",
    name: "Extra virgin olive oil 0.5L",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eabd7875faf?w=200&h=200&fit=crop",
    category: "Začini & ostalo",
  },
  {
    id: "sol-1kg",
    name: "Sea salt 1kg",
    price: 0.99,
    image: "https://images.unsplash.com/photo-1518110925495-5fe2c8dcf2f5?w=200&h=200&fit=crop",
    category: "Začini & ostalo",
  },
  {
    id: "kava-250g",
    name: "Ground coffee 250g",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    category: "Začini & ostalo",
  },
  {
    id: "secer-1kg",
    name: "Sugar 1kg",
    price: 1.29,
    image: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=200&h=200&fit=crop",
    category: "Začini & ostalo",
  },
];

// --------------- PACKAGES ---------------

export const packages: Package[] = [
  {
    slug: "start-sailing-premium",
    name: "Start Sailing Premium",
    description:
      "Complete provisioning for a week-long sailing trip. Everything your crew needs — from breakfast essentials to evening drinks.",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop",
    items: [
      { productId: "lagano-jutro-1l", defaultQty: 4 },
      { productId: "dukat-mlijeko-1l", defaultQty: 2 },
      { productId: "jogurt-natur-180g", defaultQty: 8 },
      { productId: "maslo-250g", defaultQty: 2 },
      { productId: "sir-gauda-narezak", defaultQty: 4 },
      { productId: "jana-1.5l", defaultQty: 18 },
      { productId: "jamnica-mineral-1.5l", defaultQty: 6 },
      { productId: "jana-0.5l", defaultQty: 12 },
      { productId: "coca-cola-0.33l", defaultQty: 6 },
      { productId: "coca-cola-zero-0.33l", defaultQty: 6 },
      { productId: "heineken-0.5l", defaultQty: 18 },
      { productId: "ozujsko-0.5l", defaultQty: 12 },
      { productId: "vino-bijelo-0.75l", defaultQty: 3 },
      { productId: "vino-crno-0.75l", defaultQty: 2 },
      { productId: "chipsy-150g", defaultQty: 4 },
      { productId: "kikiriki-200g", defaultQty: 2 },
      { productId: "banane-1kg", defaultQty: 2 },
      { productId: "jabuke-1kg", defaultQty: 2 },
      { productId: "rajcice-1kg", defaultQty: 2 },
      { productId: "limun-500g", defaultQty: 2 },
      { productId: "toast-kruh", defaultQty: 3 },
      { productId: "pecivo-kifle-6kom", defaultQty: 2 },
      { productId: "nutella-400g", defaultQty: 1 },
      { productId: "tuna-konzerva", defaultQty: 4 },
      { productId: "masline-zelene-200g", defaultQty: 2 },
      { productId: "jaja-10kom", defaultQty: 2 },
      { productId: "pilece-prsa-500g", defaultQty: 2 },
      { productId: "kulen-narezak-100g", defaultQty: 3 },
      { productId: "maslinovo-ulje-0.5l", defaultQty: 1 },
      { productId: "sol-1kg", defaultQty: 1 },
      { productId: "kava-250g", defaultQty: 2 },
      { productId: "secer-1kg", defaultQty: 1 },
    ],
  },
  {
    slug: "weekend-getaway",
    name: "Weekend Getaway",
    description:
      "Perfect for a 2-3 day trip. Light essentials, refreshing drinks, and easy snacks for a short coastal adventure.",
    image: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=800&h=500&fit=crop",
    items: [
      { productId: "dukat-mlijeko-1l", defaultQty: 2 },
      { productId: "jogurt-natur-180g", defaultQty: 4 },
      { productId: "sir-gauda-narezak", defaultQty: 2 },
      { productId: "jana-1.5l", defaultQty: 8 },
      { productId: "jana-0.5l", defaultQty: 6 },
      { productId: "coca-cola-0.33l", defaultQty: 6 },
      { productId: "sprite-0.33l", defaultQty: 6 },
      { productId: "heineken-0.5l", defaultQty: 6 },
      { productId: "ozujsko-0.5l", defaultQty: 6 },
      { productId: "vino-bijelo-0.75l", defaultQty: 1 },
      { productId: "rose-0.75l", defaultQty: 1 },
      { productId: "chipsy-150g", defaultQty: 2 },
      { productId: "banane-1kg", defaultQty: 1 },
      { productId: "toast-kruh", defaultQty: 1 },
      { productId: "tuna-konzerva", defaultQty: 2 },
      { productId: "jaja-10kom", defaultQty: 1 },
      { productId: "kava-250g", defaultQty: 1 },
    ],
  },
  {
    slug: "party-box",
    name: "Party Box",
    description:
      "Stocked for a great time — beers, cocktail mixers, snacks, and all the essentials for onboard celebrations.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=500&fit=crop",
    items: [
      { productId: "jana-1.5l", defaultQty: 6 },
      { productId: "jana-0.5l", defaultQty: 12 },
      { productId: "coca-cola-0.33l", defaultQty: 12 },
      { productId: "coca-cola-zero-0.33l", defaultQty: 6 },
      { productId: "fanta-0.33l", defaultQty: 6 },
      { productId: "sprite-0.33l", defaultQty: 6 },
      { productId: "sok-od-narance-1l", defaultQty: 3 },
      { productId: "heineken-0.5l", defaultQty: 24 },
      { productId: "ozujsko-0.5l", defaultQty: 18 },
      { productId: "karlovacko-0.5l", defaultQty: 12 },
      { productId: "vino-bijelo-0.75l", defaultQty: 2 },
      { productId: "vino-crno-0.75l", defaultQty: 2 },
      { productId: "rose-0.75l", defaultQty: 2 },
      { productId: "chipsy-150g", defaultQty: 6 },
      { productId: "kikiriki-200g", defaultQty: 4 },
      { productId: "smoki-150g", defaultQty: 4 },
      { productId: "masline-zelene-200g", defaultQty: 3 },
      { productId: "limun-500g", defaultQty: 3 },
    ],
  },
  {
    slug: "custom",
    name: "Custom Box",
    description:
      "Build your own box from scratch. Choose exactly what you need, adjust quantities, and we deliver it to your marina.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=500&fit=crop",
    items: [],
  },
];

// --------------- HELPERS ---------------

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function calculatePackagePrice(pkg: Package): number {
  return pkg.items.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.price * item.defaultQty : 0);
  }, 0);
}

export function getAllCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}
