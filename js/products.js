/**
 * SOKO Online Shop Products Catalog
 * Contains product catalog data used across the storefront.
 */

const SOKO_PRODUCTS = [
  {
    id: "prod-101",
    name: "Soko SoundPulse Wireless Headphones",
    category: "electronics",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviewsCount: 142,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Experience premium active noise cancellation with 40-hour battery life and ultra-comfortable memory foam ear cushions.",
    inStock: true,
    tags: ["audio", "wireless", "headphones", "bluetooth"]
  },
  {
    id: "prod-102",
    name: "Minimalist Modern Chronograph Watch",
    category: "accessories",
    price: 89.50,
    originalPrice: 120.00,
    rating: 4.6,
    reviewsCount: 89,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Sleek stainless steel watch with Japanese quartz movement, genuine leather strap, and 30m water resistance.",
    inStock: true,
    tags: ["watch", "fashion", "accessories"]
  },
  {
    id: "prod-103",
    name: "Urban Explorer Ergonomic Backpack",
    category: "fashion",
    price: 64.99,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "Water-resistant commuter backpack with dedicated 15.6-inch laptop compartment and hidden anti-theft pocket.",
    inStock: true,
    tags: ["backpack", "travel", "fashion", "bags"]
  },
  {
    id: "prod-104",
    name: "Aura Home Smart LED Ambient Lamp",
    category: "home",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewsCount: 64,
    badge: "Smart",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "RGB light strip ambient lamp controllable via mobile app or voice assistants. 16 million colors with music sync mode.",
    inStock: true,
    tags: ["home", "lighting", "smart", "decor"]
  },
  {
    id: "prod-105",
    name: "AirFlow Pro Athletic Running Shoes",
    category: "fashion",
    price: 110.00,
    originalPrice: 145.00,
    rating: 4.7,
    reviewsCount: 175,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-lightweight mesh running shoes engineered for maximum cushioning, high energy return, and breathability.",
    inStock: true,
    tags: ["shoes", "footwear", "sports", "fashion"]
  },
  {
    id: "prod-106",
    name: "Soko TechFit Active Smartwatch",
    category: "electronics",
    price: 159.00,
    originalPrice: 199.99,
    rating: 4.7,
    reviewsCount: 98,
    badge: "New Arrival",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant AMOLED touch display featuring heart rate tracking, SpO2 monitoring, GPS workout tracking, and 7-day battery life.",
    inStock: true,
    tags: ["smartwatch", "fitness", "tech", "electronics"]
  },
  {
    id: "prod-107",
    name: "Artisan Ceramic Pour-Over Coffee Set",
    category: "home",
    price: 39.99,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Handmade",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted ceramic dripper and heat-resistant glass carafe designed for precise specialty coffee extraction.",
    inStock: true,
    tags: ["coffee", "kitchen", "home", "craft"]
  },
  {
    id: "prod-108",
    name: "Retro Style UV400 Polarized Sunglasses",
    category: "accessories",
    price: 29.99,
    originalPrice: 45.00,
    rating: 4.4,
    reviewsCount: 53,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    description: "Classic vintage sunglasses with high-definition polarized lenses that block 100% of UVA/UVB rays.",
    inStock: true,
    tags: ["sunglasses", "eyewear", "accessories", "style"]
  }
];

if (typeof window !== "undefined") {
  window.SOKO_PRODUCTS = SOKO_PRODUCTS;
}
