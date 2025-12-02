'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';
import { useEffect } from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const { addProductToHistory } = useBrowsingHistory();

  useEffect(() => {
    addProductToHistory(productId);
  }, [productId, addProductToHistory]);

  return (
    <Button
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold"
      onClick={() => addToCart(productId)}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
