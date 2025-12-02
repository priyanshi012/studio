import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import CartContents from '@/components/cart/cart-contents';

export const metadata = {
  title: 'Shopping Cart | ShopWave',
};

export default function CartPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Your Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">Review your items and proceed to checkout.</p>
      </div>
      
      <CartContents />
    </div>
  );
}
