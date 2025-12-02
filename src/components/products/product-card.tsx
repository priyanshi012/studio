'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';

import { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const primaryImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product.id);
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={primaryImage.imageHint}
              />
            ) : (
               <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg font-headline leading-tight mb-2 h-14 overflow-hidden">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <span className="text-xl font-bold font-headline text-primary">{formatPrice(product.price)}</span>
          <Button size="icon" variant="outline" className="shrink-0" onClick={handleAddToCart}>
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
