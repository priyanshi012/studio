import { Product, Category, Order } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Fashion', slug: 'fashion' },
  { id: '3', name: 'Home Goods', slug: 'home-goods' },
];

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Quantum-Core Laptop',
    description: 'Next-generation laptop with a quantum processor, 16-inch OLED display, and all-day battery life. Perfect for professionals and creators.',
    price: 1499.99,
    category: 'electronics',
    images: ['laptop-1', 'laptop-2'],
    rating: 4.8,
    reviews: [
      { id: 'rev_001', rating: 5, text: 'Incredibly fast and the display is stunning!', author: 'TechGuru', date: '2023-10-15' },
      { id: 'rev_002', rating: 4, text: 'Great performance, but a bit pricey.', author: 'Jane D.', date: '2023-10-20' },
    ],
    stock: 50,
  },
  {
    id: 'prod_002',
    name: 'SonicStream Wireless Headphones',
    description: 'Immerse yourself in high-fidelity audio with these noise-cancelling wireless headphones. 30-hour playback and crystal-clear microphone.',
    price: 249.99,
    category: 'electronics',
    images: ['headphones-1', 'headphones-2'],
    rating: 4.7,
    reviews: [
       { id: 'rev_003', rating: 5, text: 'Best noise cancellation I have ever experienced.', author: 'AudioPhile', date: '2023-11-01' },
    ],
    stock: 120,
  },
  {
    id: 'prod_003',
    name: 'Urban Explorer Jacket',
    description: 'A stylish and durable waterproof jacket designed for the modern adventurer. Features multiple pockets and a breathable inner lining.',
    price: 189.99,
    category: 'fashion',
    images: ['jacket-1', 'jacket-2'],
    rating: 4.5,
    reviews: [],
    stock: 80,
  },
  {
    id: 'prod_004',
    name: 'Classic Leather Watch',
    description: 'A timeless analog watch with a genuine leather strap and stainless steel case. Minimalist design suitable for any occasion.',
    price: 159.99,
    category: 'fashion',
    images: ['watch-1', 'watch-2'],
    rating: 4.9,
    reviews: [],
    stock: 200,
  },
  {
    id: 'prod_005',
    name: 'AeroPress Coffee Maker',
    description: 'The revolutionary coffee press that brews smooth, rich coffee without bitterness. Fast, easy to clean, and portable.',
    price: 39.99,
    category: 'home-goods',
    images: ['coffee-maker-1', 'coffee-maker-2'],
    rating: 4.9,
    reviews: [],
    stock: 300,
  },
  {
    id: 'prod_006',
    name: 'ErgoComfort Office Chair',
    description: 'Ergonomic office chair with adjustable lumbar support, armrests, and seat height. Promotes healthy posture for long work hours.',
    price: 349.99,
    category: 'home-goods',
    images: ['chair-1', 'chair-2'],
    rating: 4.6,
    reviews: [],
    stock: 40,
  },
  {
    id: 'prod_007',
    name: '4K Ultra HD Smart TV',
    description: '55-inch Smart TV with vibrant 4K resolution, HDR support, and built-in streaming apps. An immersive cinematic experience at home.',
    price: 599.99,
    category: 'electronics',
    images: ['tv-1', 'tv-2'],
    rating: 4.7,
    reviews: [],
    stock: 60,
  },
  {
    id: 'prod_008',
    name: 'TrailBlazer Hiking Boots',
    description: 'Waterproof and breathable hiking boots for all terrains. Provides excellent ankle support and grip for your next adventure.',
    price: 139.99,
    category: 'fashion',
    images: ['boots-1', 'boots-2'],
    rating: 4.8,
    reviews: [],
    stock: 150,
  },
];

// Mock database functions
// In a real app, these would be async and fetch from Firebase/Firestore

export async function getProducts(filters?: { category?: string; query?: string }): Promise<Product[]> {
  let filteredProducts = products;

  if (filters?.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }

  if (filters?.query) {
    const query = filters.query.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  }
  
  return filteredProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

// Mock function for getting orders. 
// In a real app, this would query Firestore.
// For this mock, we return an empty array or some static data.
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  // This is where you would interact with localStorage or a mock data store.
  // For now, we'll return an empty array.
  try {
    const orders = JSON.parse(localStorage.getItem('shopwave-orders') || '[]') as Order[];
    return orders.filter(o => o.userId === userId);
  } catch (e) {
    return [];
  }
}
