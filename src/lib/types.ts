export type User = {
  id: string;
  email: string;
  name?: string;
  address?: string;
  city?: string;
  zip?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductReview = {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviews: ProductReview[];
  stock: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
  createdAt: number; // timestamp
};
