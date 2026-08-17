/**
 * SOKO Online Shop Products Catalog
 * Contains product catalog data used across the storefront.
 * 9 products across 6 categories: Baskets, Textiles, Jewellery, Ceramics, Woodwork, Leather.
 */

const SOKO_PRODUCTS = [
  {
    id: "prod-1",
    name: "Handwoven Bolga Storage Basket",
    category: "Baskets",
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviewsCount: 34,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant handwoven elephant grass storage basket with durable leather wrapped handle.",
    inStock: true,
    tags: ["baskets", "storage", "handwoven", "home"]
  },
  {
    id: "prod-2",
    name: "Woven Sisal Planter Basket",
    category: "Baskets",
    price: 32.00,
    originalPrice: 40.00,
    rating: 4.6,
    reviewsCount: 19,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80",
    description: "Natural sisal fiber plant pot basket featuring subtle geometric patterns.",
    inStock: true,
    tags: ["baskets", "planter", "decor", "sisal"]
  },
  {
    id: "prod-3",
    name: "Authentic Kente Pattern Throw Blanket",
    category: "Textiles",
    price: 78.50,
    originalPrice: 95.00,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1606744888344-49423b812d02?auto=format&fit=crop&w=600&q=80",
    description: "Richly woven cotton throw blanket featuring traditional Kente heritage motifs.",
    inStock: true,
    tags: ["textiles", "kente", "blanket", "home"]
  },
  {
    id: "prod-4",
    name: "Hand-Dyed Indigo Mudcloth Cushion Cover",
    category: "Textiles",
    price: 35.00,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 28,
    badge: "Handmade",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    description: "Organic cotton cushion cover hand-dyed with natural organic indigo dye.",
    inStock: true,
    tags: ["textiles", "cushion", "indigo", "decor"]
  },
  {
    id: "prod-5",
    name: "Handcrafted Brass Statement Necklace",
    category: "Jewellery",
    price: 29.99,
    originalPrice: 42.00,
    rating: 4.8,
    reviewsCount: 41,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "Recycled polished brass collar necklace handcrafted by skilled artisans.",
    inStock: true,
    tags: ["jewellery", "brass", "necklace", "fashion"]
  },
  {
    id: "prod-6",
    name: "Traditional Beaded Maasai Bangle Set",
    category: "Jewellery",
    price: 22.50,
    originalPrice: 30.00,
    rating: 4.9,
    reviewsCount: 63,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1611591475777-233cd7542d8c?auto=format&fit=crop&w=600&q=80",
    description: "Set of three vibrant glass-beaded stackable bracelets with brass accents.",
    inStock: true,
    tags: ["jewellery", "beaded", "bangles", "accessories"]
  },
  {
    id: "prod-7",
    name: "Terracotta Clay Decorative Serving Bowl",
    category: "Ceramics",
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.5,
    reviewsCount: 15,
    badge: "Artisan",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
    description: "Hand-thrown glazed earthenware ceramic bowl ideal for centerpieces or dining.",
    inStock: true,
    tags: ["ceramics", "bowl", "terracotta", "kitchen"]
  },
  {
    id: "prod-8",
    name: "Hand-Carved Olive Wood Salad Utensils",
    category: "Woodwork",
    price: 27.50,
    originalPrice: 35.00,
    rating: 4.7,
    reviewsCount: 22,
    badge: "Natural",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80",
    description: "Sustainably harvested olive wood server set featuring rich natural grain contrast.",
    inStock: true,
    tags: ["woodwork", "utensils", "kitchen", "olivewood"]
  },
  {
    id: "prod-9",
    name: "Handstitched Full-Grain Leather Tote",
    category: "Leather",
    price: 115.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewsCount: 87,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    description: "Durable full-grain vegetable-tanned leather tote bag with internal zip pocket.",
    inStock: true,
    tags: ["leather", "tote", "bag", "fashion"]
  }
];

if (typeof window !== "undefined") {
  window.SOKO_PRODUCTS = SOKO_PRODUCTS;
}

