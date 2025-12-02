'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@/hooks/use-cart';
import { getProductById } from '@/lib/data';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import UpdateQuantityButtons from './update-quantity-buttons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type CartItemWithProduct = {
  product: Product;
  quantity: number;
};

export default function CartContents() {
  const { items, clearCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      const detailedItems: CartItemWithProduct[] = [];
      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          detailedItems.push({ product, quantity: item.quantity });
        }
      }
      setCartItems(detailedItems);
      setIsLoading(false);
    };

    fetchCartItems();
  }, [items]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
            <div className="lg:col-span-1">
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg flex flex-col items-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold font-headline">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(({ product, quantity }) => {
          const image = PlaceHolderImages.find(p => p.id === product.images[0]);
          return (
            <Card key={product.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
                  {image && (
                    <Image src={image.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint={image.imageHint}/>
                  )}
                </div>
                <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                    <div className='flex-grow'>
                        <Link href={`/products/${product.id}`} className="font-semibold hover:underline">{product.name}</Link>
                        <p className="text-muted-foreground text-sm mt-1">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:justify-between">
                        <UpdateQuantityButtons productId={product.id} quantity={quantity} />
                        <p className="font-semibold sm:text-lg">{formatPrice(product.price * quantity)}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Button variant="outline" size="sm" onClick={clearCart}>Clear Cart</Button>
      </div>
      <div className="lg:col-span-1 sticky top-24">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-headline font-semibold">Order Summary</h2>
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
