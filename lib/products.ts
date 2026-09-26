export type NutritionFact = {
  name: string
  amount: string
  dv?: string
}

export type ProductNutrition = {
  servingSize: string
  servingsPerContainer: number
  calories: number
  totalFat: { amount: string; dv: string }
  satFat: { amount: string; dv: string }
  transFat: { amount: string }
  cholesterol: { amount: string; dv: string }
  sodium: { amount: string; dv: string }
  totalCarb: { amount: string; dv: string }
  dietaryFiber: { amount: string; dv: string }
  totalSugars: { amount: string; added?: string; addedDv?: string }
  protein: { amount: string }
  vitamins: NutritionFact[]
  micronutrients: NutritionFact[]
}

export type Review = {
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

export type Product = {
  slug: string
  name: string
  price: string
  accent: string
  image: string
  backImage: string
  heading: string
  description: string
  ingredients: string
  allergen: string
  nutrition: ProductNutrition
  reviews: Review[]
}

export const products: Product[] = [
  {
    slug: 'classic-sea-salt',
    name: 'Classic Sea Salt',
    price: '14.99',
    accent: '#1f393f',
    image: '/images/pouch_classic_sea_salt.png',
    backImage: '/images/ridge-root-classic-sea-salt-BACK.png',
    heading: 'Simple. Classic. Beautifully Balanced.',
    description:
      'A light touch of sea salt allows the smooth, buttery character of our roasted Kenyan macadamias to shine. Made with natural ingredients, this timeless favorite delivers pure flavor and a clean, satisfying crunch.',
    ingredients: 'Macadamia kernels, Sea salt',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 180,
      totalFat: { amount: '20g', dv: '25%' },
      satFat: { amount: '3g', dv: '15%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '45mg', dv: '2%' },
      totalCarb: { amount: '1g', dv: '0%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '1g', added: '0g', addedDv: '0%' },
      protein: { amount: '2g' },
      vitamins: [
        { name: 'Vitamin D', amount: '0mcg', dv: '0%' },
        { name: 'Calcium', amount: '92.4mg', dv: '8%' },
        { name: 'Iron', amount: '0.51mg', dv: '2%' },
        { name: 'Potassium', amount: '95mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.373mg', dv: '4%' },
        { name: 'Phosphorus', amount: '52.4mg', dv: '4%' },
        { name: 'Magnesium', amount: '32.1mg', dv: '8%' },
        { name: 'Vitamin A', amount: '0mcg', dv: '0%' },
        { name: 'Vitamin C', amount: '0.020mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Elena R.',
        rating: 5,
        date: '1 week ago',
        title: 'The gold standard of macadamias',
        comment: 'Unbelievably buttery with just the right grain of sea salt. You can truly taste how fresh the crop is from the Kenyan highlands.',
        verified: true,
      },
      {
        author: 'Marcus K.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Simple, pure perfection',
        comment: 'Crisp roasting without any greasy residue. My whole family has fallen in love with these.',
        verified: true,
      },
      {
        author: 'Sarah L.',
        rating: 5,
        date: '1 month ago',
        title: 'Addictive quality',
        comment: 'The quality of the kernel size and crunch is lightyears ahead of supermarket macadamias. Worth every penny.',
        verified: true,
      },
    ],
  },
  {
    slug: 'golden-salted-caramel',
    name: 'Golden Salted Caramel',
    price: '14.99',
    accent: '#b5551f',
    image: '/images/pouch_golden_salted_caramel.png',
    backImage: '/images/pouch_golden_salted_caramel_BACK.png',
    heading: 'Where Sweet Meets Salty',
    description:
      'Silky caramel sweetness melts into a delicate hint of salt before giving way to the buttery crunch of roasted macadamias. Made with natural ingredients, every bite is indulgent, balanced and deeply satisfying.',
    ingredients: 'Macadamia kernels, Pure cane sugar, Sea salt',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 170,
      totalFat: { amount: '18g', dv: '25%' },
      satFat: { amount: '3g', dv: '15%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '65mg', dv: '2%' },
      totalCarb: { amount: '5g', dv: '2%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '1g', added: '1g', addedDv: '2%' },
      protein: { amount: '2g' },
      vitamins: [
        { name: 'Vitamin D', amount: '1.9mcg', dv: '10%' },
        { name: 'Calcium', amount: '182.0mg', dv: '15%' },
        { name: 'Iron', amount: '0.89mg', dv: '4%' },
        { name: 'Potassium', amount: '110mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.746mg', dv: '6%' },
        { name: 'Phosphorus', amount: '57.2mg', dv: '4%' },
        { name: 'Magnesium', amount: '36.8mg', dv: '8%' },
        { name: 'Vitamin A', amount: '2.2mcg', dv: '0%' },
        { name: 'Vitamin C', amount: '0.021mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Chloe D.',
        rating: 5,
        date: '4 days ago',
        title: 'Sweet, savory, and decadent',
        comment: 'The glaze is so delicate — not thick or artificial at all. The sea salt cuts the sweetness in the most satisfying way.',
        verified: true,
      },
      {
        author: 'Anthony W.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Best evening treat',
        comment: 'Pairs gorgeously with a glass of dessert wine or espresso. Will be reordering the 6-pack!',
        verified: true,
      },
      {
        author: 'Grace M.',
        rating: 4,
        date: '1 month ago',
        title: 'Wonderful crunch and balance',
        comment: 'Lightly caramel-coated with genuine crunch. Absolutely gourmet flavor.',
        verified: true,
      },
    ],
  },
  {
    slug: 'warm-chili',
    name: 'Warm Chili',
    price: '14.99',
    accent: '#8a2b24',
    image: '/images/pouch_warm_chili.png',
    backImage: '/images/pouch_warm_chili_BACK.png',
    heading: 'A Gentle Heat That Keeps You Coming Back',
    description:
      'Warm chili spices awaken the natural buttery richness of our dry-roasted macadamias. The heat builds gently, creating a bold yet beautifully balanced snack with an irresistible crunch.',
    ingredients: 'Macadamia kernels, Pure cane sugar, Sundried red chili',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 170,
      totalFat: { amount: '18g', dv: '25%' },
      satFat: { amount: '3.5g', dv: '20%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '70mg', dv: '4%' },
      totalCarb: { amount: '5g', dv: '2%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '1g', added: '1g', addedDv: '2%' },
      protein: { amount: '2g' },
      vitamins: [
        { name: 'Vitamin D', amount: '4.2mcg', dv: '20%' },
        { name: 'Calcium', amount: '182.0mg', dv: '15%' },
        { name: 'Iron', amount: '0.93mg', dv: '6%' },
        { name: 'Potassium', amount: '115mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.746mg', dv: '6%' },
        { name: 'Phosphorus', amount: '55.6mg', dv: '4%' },
        { name: 'Magnesium', amount: '34.6mg', dv: '8%' },
        { name: 'Vitamin A', amount: '2.5mcg', dv: '0%' },
        { name: 'Vitamin C', amount: '0.027mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Daniel O.',
        rating: 5,
        date: '5 days ago',
        title: 'Incredible flavor depth',
        comment: 'Warm, savory heat that complements the buttery macadamia fat rather than overpowering it. Sensational snacking.',
        verified: true,
      },
      {
        author: 'Rachel T.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Gourmet cocktail pairing',
        comment: 'Served these at a dinner party and guests couldn\'t stop asking where I found them. Outstanding chili seasoning.',
        verified: true,
      },
      {
        author: 'Brian P.',
        rating: 4,
        date: '3 weeks ago',
        title: 'Pleasantly spicy',
        comment: 'Gentle warmth with a sweet undertone. Keeps you reaching for another nut.',
        verified: true,
      },
    ],
  },
  {
    slug: 'chocolate-luxe',
    name: 'Chocolate Luxe',
    price: '14.99',
    accent: '#3f2d20',
    image: '/images/pouch_chocolate_luxe_CENTER.png',
    backImage: '/images/pouch_chocolate_luxe_BACK.png',
    heading: 'A Richly Indulgent Pairing',
    description:
      'Smooth chocolate and creamy Kenyan macadamias come together in one luxurious bite. Crafted with natural ingredients, the deep cocoa notes and buttery crunch create a treat worth slowing down for.',
    ingredients:
      'Macadamia Nuts, Dark Chocolate Compound (Sugar, Hydrogenated Palm Kernel Oil, Alkalised Cocoa Powder, Soya Lecithin (E322), Vanillin, Natural Cocoa Powder), Cacao Powder (100%)',
    allergen: 'Contains Tree Nuts and Soya.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 160,
      totalFat: { amount: '17g', dv: '20%' },
      satFat: { amount: '4g', dv: '20%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '80mg', dv: '4%' },
      totalCarb: { amount: '8g', dv: '2%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '4g', added: '4g', addedDv: '8%' },
      protein: { amount: '2g' },
      vitamins: [
        { name: 'Vitamin D', amount: '2.7mcg', dv: '15%' },
        { name: 'Calcium', amount: '137.2mg', dv: '10%' },
        { name: 'Iron', amount: '4.01mg', dv: '20%' },
        { name: 'Potassium', amount: '95mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.373mg', dv: '4%' },
        { name: 'Phosphorus', amount: '52.4mg', dv: '4%' },
        { name: 'Magnesium', amount: '29.8mg', dv: '8%' },
        { name: 'Vitamin A', amount: '2.5mcg', dv: '0%' },
        { name: 'Vitamin C', amount: '0.019mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Victoria H.',
        rating: 5,
        date: '1 week ago',
        title: 'Dark chocolate heaven',
        comment: 'Decadent dark chocolate paired with huge, crunchy macadamias. Like an artisanal chocolatier confection.',
        verified: true,
      },
      {
        author: 'Liam B.',
        rating: 5,
        date: '2 weeks ago',
        title: 'My absolute favorite',
        comment: 'Rich cocoa coating that isn\'t overly sugary. The nut inside stays totally crisp and fresh.',
        verified: true,
      },
      {
        author: 'Jessica N.',
        rating: 5,
        date: '1 month ago',
        title: 'True luxury snack',
        comment: 'Bought two pouches as a gift, ended up keeping one for myself. Fantastic product packaging and taste.',
        verified: true,
      },
    ],
  },
  {
    slug: 'toasted-coconut',
    name: 'Toasted Coconut',
    price: '14.99',
    accent: '#1c7a82',
    image: '/images/pouch_toasted_coconut.png',
    backImage: '/images/pouch_toasted_coconut_BACK.png',
    heading: 'A Little Taste of the Tropics',
    description:
      'Delicate toasted coconut brings a naturally sweet, tropical note to rich Kenyan macadamias. Smooth, fragrant and deliciously crunchy, it is a bright and uplifting flavor made for moments of escape.',
    ingredients: 'Macadamia kernels, Pure cane sugar, Coconut, Natural coconut essence',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 170,
      totalFat: { amount: '19g', dv: '25%' },
      satFat: { amount: '3.5g', dv: '20%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '10mg', dv: '0%' },
      totalCarb: { amount: '3g', dv: '2%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '1g', added: '0g', addedDv: '0%' },
      protein: { amount: '3g' },
      vitamins: [
        { name: 'Vitamin D', amount: '0.0mcg', dv: '0%' },
        { name: 'Calcium', amount: '182.0mg', dv: '15%' },
        { name: 'Iron', amount: '2.78mg', dv: '15%' },
        { name: 'Potassium', amount: '115mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.746mg', dv: '6%' },
        { name: 'Phosphorus', amount: '60.6mg', dv: '4%' },
        { name: 'Magnesium', amount: '58.0mg', dv: '15%' },
        { name: 'Vitamin A', amount: '10.1mcg', dv: '2%' },
        { name: 'Vitamin C', amount: '0.020mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Hannah S.',
        rating: 5,
        date: '6 days ago',
        title: 'Tropical perfection',
        comment: 'Fragrant toasted coconut flakes wrapped around rich buttery nuts. Takes me right back to the Kenyan coast.',
        verified: true,
      },
      {
        author: 'George M.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Aromatic and fresh',
        comment: 'Not too sweet, perfectly balanced toasted coconut aroma. One of my favorite snacks ever.',
        verified: true,
      },
      {
        author: 'Claire V.',
        rating: 4,
        date: '3 weeks ago',
        title: 'Delightful crunch',
        comment: 'The coconut is toasted just right without being burnt. Wonderful texture.',
        verified: true,
      },
    ],
  },
  {
    slug: 'wildflower-honey-glaze',
    name: 'Honey Glazed',
    price: '14.99',
    accent: '#7a2e52',
    image: '/images/pouch_wildflower_honey_glaze.png',
    backImage: '/images/pouch_wildflower_honey_glaze_BACK.png',
    heading: 'Golden Sweetness in Every Bite',
    description:
      'A delicate honey glaze wraps each roasted macadamia in natural golden sweetness. Rich, buttery and wonderfully crisp, this irresistible combination makes every handful feel like a well-earned treat.',
    ingredients: 'Macadamia kernels, Honey, Unprocessed pure cane sugar',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 180,
      totalFat: { amount: '18g', dv: '25%' },
      satFat: { amount: '3.5g', dv: '20%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '5mg', dv: '0%' },
      totalCarb: { amount: '2g', dv: '0%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '3g', added: '3g', addedDv: '6%' },
      protein: { amount: '2g' },
      vitamins: [
        { name: 'Vitamin D', amount: '2.5mcg', dv: '15%' },
        { name: 'Calcium', amount: '15.9mg', dv: '2%' },
        { name: 'Iron', amount: '0.40mg', dv: '2%' },
        { name: 'Potassium', amount: '80mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.213mg', dv: '2%' },
        { name: 'Phosphorus', amount: '54.6mg', dv: '4%' },
        { name: 'Magnesium', amount: '25.8mg', dv: '6%' },
        { name: 'Vitamin A', amount: 'Not Detected', dv: '' },
        { name: 'Vitamin C', amount: '2.568mg', dv: '2%' },
      ],
    },
    reviews: [
      {
        author: 'Natasha W.',
        rating: 5,
        date: '1 week ago',
        title: 'Subtle, floral honey note',
        comment: 'Pure wildflower honey gives this a delicate sweetness without hiding the natural buttery flavor of the kernel.',
        verified: true,
      },
      {
        author: 'Eric K.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Crisp golden glaze',
        comment: 'Glazed to golden perfection. Makes for an exceptional mid-afternoon energy boost.',
        verified: true,
      },
      {
        author: 'Maya B.',
        rating: 5,
        date: '1 month ago',
        title: 'Exquisite quality',
        comment: 'You can taste the authenticity of the ingredients. Will definitely order again.',
        verified: true,
      },
    ],
  },
  {
    slug: 'kenyan-coffee-roast',
    name: 'Kenyan Coffee Roast',
    price: '14.99',
    accent: '#4a3123',
    image: '/images/pouch_kenyan_coffee_roast.png',
    backImage: '/images/pouch_kenyan_coffee_roast_BACK.png',
    heading: 'Two Kenyan Treasures, One Remarkable Flavor',
    description:
      'Bold Kenyan coffee meets the creamy richness of locally grown macadamias. Crafted with natural ingredients, this distinctive pairing delivers an aromatic roasted flavor, a satisfying crunch and a memorable taste of Kenya.',
    ingredients: 'Macadamia kernels, Pure cane sugar, Single origin Kenyan coffee',
    allergen: 'Contains tree nuts. Processed in a facility that may also process peanuts.',
    nutrition: {
      servingSize: '1 oz (28g)',
      servingsPerContainer: 6,
      calories: 170,
      totalFat: { amount: '19g', dv: '25%' },
      satFat: { amount: '3g', dv: '15%' },
      transFat: { amount: '0g' },
      cholesterol: { amount: '0mg', dv: '0%' },
      sodium: { amount: '30mg', dv: '2%' },
      totalCarb: { amount: '3g', dv: '2%' },
      dietaryFiber: { amount: '3g', dv: '10%' },
      totalSugars: { amount: '1g', added: '0g', addedDv: '0%' },
      protein: { amount: '3g' },
      vitamins: [
        { name: 'Vitamin D', amount: '0.0mcg', dv: '0%' },
        { name: 'Calcium', amount: '92.4mg', dv: '8%' },
        { name: 'Iron', amount: '0.30mg', dv: '2%' },
        { name: 'Potassium', amount: '95mg', dv: '2%' },
      ],
      micronutrients: [
        { name: 'Zinc', amount: '0.037mg', dv: '0%' },
        { name: 'Phosphorus', amount: '45.4mg', dv: '4%' },
        { name: 'Magnesium', amount: '33.5mg', dv: '8%' },
        { name: 'Vitamin A', amount: '0.3mcg', dv: '0%' },
        { name: 'Vitamin C', amount: '0.020mg', dv: '0%' },
      ],
    },
    reviews: [
      {
        author: 'Samuel T.',
        rating: 5,
        date: '3 days ago',
        title: 'Two Kenyan treasures combined',
        comment: 'Single-origin Kenyan AA coffee meets Kenyan highland macadamias. An absolute masterclass in roasting.',
        verified: true,
      },
      {
        author: 'Olivia C.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Incredible morning companion',
        comment: 'The coffee aroma hits you as soon as you unzip the pouch. Deep, roasted, complex flavor.',
        verified: true,
      },
      {
        author: 'Felix A.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Unbelievably good',
        comment: 'Rich coffee notes with a hint of natural caramel sweetness. Hands down the best flavored nut I have ever had.',
        verified: true,
      },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const PREMIUM_KSH_SLUGS = new Set([
  'chocolate-luxe',
  'toasted-coconut',
  'kenyan-coffee-roast',
])

export function isPremiumKshFlavour(slugOrName?: string): boolean {
  if (!slugOrName) return false
  const normalized = slugOrName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    PREMIUM_KSH_SLUGS.has(normalized) ||
    normalized.includes('chocolate-luxe') ||
    normalized.includes('toasted-coconut') ||
    normalized.includes('kenyan-coffee-roast')
  )
}

export const PRICING_CONFIG = {
  '2 oz': {
    usd: 5.49,
    kes: 220,
    label: '2 oz (57g)',
    display: '$5.49 / KSh 220',
  },
  '6 oz': {
    usd: 14.99,
    kes: 650,
    label: '6 oz (170g)',
    display: '$14.99 / KSh 650',
  },
  premium: {
    '2 oz': {
      usd: 5.49,
      kes: 250,
      label: '2 oz (57g)',
      display: '$5.49 / KSh 250',
    },
    '6 oz': {
      usd: 14.99,
      kes: 670,
      label: '6 oz (170g)',
      display: '$14.99 / KSh 670',
    },
  },
} as const

export interface Multipack {
  id: string
  name: string
  size: string
  priceUsd: number
  priceKes: number
  standardValueUsd: number
  standardValueKes: number
  displayPrice: string
  displayStandard: string
  savings: string
  description: string
  image: string
}

export const MULTIPACKS: Multipack[] = [
  {
    id: 'pick-any-6-2oz',
    name: '"Pick Any 6" 2 oz Variety Multipack',
    size: '6 × 2 oz (342g total)',
    priceUsd: 29.99,
    priceKes: 1250,
    standardValueUsd: 32.94,
    standardValueKes: 1320,
    displayPrice: '$29.99 / KSh 1,250',
    displayStandard: '$32.94 / KSh 1,320',
    savings: 'Save KSh 70',
    description:
      'Select any 6 pocket-sized 2 oz pouches across our 7 signature flavours. Perfect for exploring the entire collection or gifting friends and family.',
    image: '/images/lifestyle_pouch_pair.png',
  },
  {
    id: 'pick-any-3-6oz',
    name: '"Pick Any 3" 6 oz Sharing Multipack',
    size: '3 × 6 oz (510g total)',
    priceUsd: 42.99,
    priceKes: 1850,
    standardValueUsd: 44.97,
    standardValueKes: 1950,
    displayPrice: '$42.99 / KSh 1,850',
    displayStandard: '$44.97 / KSh 1,950',
    savings: 'Save KSh 100',
    description:
      'Choose any 3 full-sized 6 oz sharing pouches across our signature varieties. The ultimate indulgence for snacking or entertaining.',
    image: '/images/lifestyle_bowl_pouch.png',
  },
]

/**
 * Returns the fixed USD and KES unit prices for a given size/type key.
 * No exchange-rate math — all prices are fixed as per the pricing schedule.
 * - Standard single pouches: 6 oz = $14.99 / KSh 650, 2 oz = $5.49 / KSh 220
 * - Premium single pouches (Chocolate Luxe, Toasted Coconut, Kenyan Coffee Roast):
 *   6 oz = $14.99 / KSh 670, 2 oz = $5.49 / KSh 250
 * - Multipacks/bundles: untouched ($29.99 / KSh 1,250 and $42.99 / KSh 1,850)
 */
export function getPriceFixtures(
  sizeOrType: string,
  flavour?: string
): { usdUnit: number; kesUnit: number } {
  if (sizeOrType.includes('Pick Any 6') || sizeOrType === 'pick-any-6-2oz' || sizeOrType === 'bundle-6-2oz') {
    return { usdUnit: 29.99, kesUnit: 1250 }
  }
  if (sizeOrType.includes('Pick Any 3') || sizeOrType === 'pick-any-3-6oz' || sizeOrType === 'bundle-3-6oz') {
    return { usdUnit: 42.99, kesUnit: 1850 }
  }

  const isPremium = isPremiumKshFlavour(flavour) || isPremiumKshFlavour(sizeOrType)

  if (
    sizeOrType.includes('2 oz') ||
    sizeOrType === '5.49' ||
    sizeOrType === '4' ||
    sizeOrType === '4.00' ||
    sizeOrType === '2oz'
  ) {
    return { usdUnit: 5.49, kesUnit: isPremium ? 250 : 220 }
  }
  // default: 6 oz
  return { usdUnit: 14.99, kesUnit: isPremium ? 670 : 650 }
}

/** Format price as USD only: "$14.99" */
export function formatUsd(sizeOrType: string, qty: number = 1, flavour?: string): string {
  const q = Math.max(1, qty)
  const { usdUnit } = getPriceFixtures(sizeOrType, flavour)
  return `$${(usdUnit * q).toFixed(2)}`
}

/** Format price as KES only: "KSh 650" or "KSh 670" */
export function formatKes(sizeOrType: string, qty: number = 1, flavour?: string): string {
  const q = Math.max(1, qty)
  const { kesUnit } = getPriceFixtures(sizeOrType, flavour)
  return `KSh ${(kesUnit * q).toLocaleString()}`
}

/** Format price as both currencies: "$14.99 / KSh 650" (or KSh 670) */
export function formatDualPrice(sizeOrType: string, qty: number = 1, flavour?: string): string {
  return `${formatUsd(sizeOrType, qty, flavour)} / ${formatKes(sizeOrType, qty, flavour)}`
}

export type ShopCard = {
  product: Product
  price: string
  size: string
  displayPrice: string
}

export const shopCards: ShopCard[] = [
  { slug: 'classic-sea-salt', price: '14.99', size: '6 oz' },
  { slug: 'golden-salted-caramel', price: '14.99', size: '6 oz' },
  { slug: 'warm-chili', price: '14.99', size: '6 oz' },
  { slug: 'chocolate-luxe', price: '14.99', size: '6 oz' },
  { slug: 'toasted-coconut', price: '14.99', size: '6 oz' },
  { slug: 'wildflower-honey-glaze', price: '14.99', size: '6 oz' },
  { slug: 'kenyan-coffee-roast', price: '14.99', size: '6 oz' },
  { slug: 'classic-sea-salt', price: '5.49', size: '2 oz' },
  { slug: 'golden-salted-caramel', price: '5.49', size: '2 oz' },
  { slug: 'warm-chili', price: '5.49', size: '2 oz' },
  { slug: 'chocolate-luxe', price: '5.49', size: '2 oz' },
  { slug: 'toasted-coconut', price: '5.49', size: '2 oz' },
  { slug: 'wildflower-honey-glaze', price: '5.49', size: '2 oz' },
  { slug: 'kenyan-coffee-roast', price: '5.49', size: '2 oz' },
].map(({ slug, price, size }) => {
  const isPremium = PREMIUM_KSH_SLUGS.has(slug)
  const kesPrice = size === '2 oz' ? (isPremium ? 250 : 220) : (isPremium ? 670 : 650)
  return {
    product: getProduct(slug)!,
    price,
    size,
    displayPrice: `$${price} / KSh ${kesPrice}`,
  }
})

export interface WhatsAppEnquiryParams {
  productName: string
  slug: string
  size?: string
  formattedPrice?: string
  qty?: number
  productUrl?: string
}

export function buildWhatsAppEnquiry({
  productName,
  slug,
  size,
  formattedPrice,
  qty,
  productUrl,
}: WhatsAppEnquiryParams): string {
  const phone = '254182257223'
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://ridgeandroot.co.ke'
  const link = productUrl || `${origin}/shop/${slug}`

  // Append Macadamia Nuts if not already in the product name
  const fullTitle =
    productName.toLowerCase().includes('macadamia') ||
    productName.toLowerCase().includes('multipack')
      ? productName
      : `${productName} Macadamia Nuts`

  const lines: string[] = [
    `Hi Ridge & Root! I'd like to enquire about:`,
    ``,
    `Product: ${fullTitle}`,
  ]

  if (size) lines.push(`Size: ${size}`)
  if (qty && qty > 1) lines.push(`Quantity: ${qty}`)
  if (formattedPrice) lines.push(`Price: ${formattedPrice}`)

  lines.push(
    ``,
    `Product link: ${link}`,
    ``,
    `Please let me know availability and next steps.`
  )

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`
}

export function whatsappLink(
  productName: string,
  priceOrFormatted?: string,
  size?: string,
  qty?: number,
  productUrl?: string,
  slug?: string,
): string {
  const derivedSlug =
    slug ||
    productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  return buildWhatsAppEnquiry({
    productName,
    slug: derivedSlug,
    size,
    formattedPrice: priceOrFormatted,
    qty,
    productUrl,
  })
}
