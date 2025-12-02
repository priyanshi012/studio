'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

interface UpdateQuantityButtonsProps {
  productId: string;
  quantity: number;
}

export default function UpdateQuantityButtons({
  productId,
  quantity,
}: UpdateQuantityButtonsProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(productId, quantity - 1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(productId, quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={() => removeFromCart(productId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
