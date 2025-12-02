import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, CheckCircle, Truck, Shield } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import AddToCartButton from '@/components/cart/add-to-cart-button';
import { Separator } from '@/components/ui/separator';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} | ShopWave`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const productImages = product.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {productImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 aspect-square relative">
                      {image && (
                         <Image
                          src={image.imageUrl}
                          alt={`${product.name} - image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {productImages.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        </div>

        <div className="flex flex-col gap-6">
          <div className='space-y-2'>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">({product.reviews.length} reviews)</span>
              </div>
              <Separator orientation='vertical' className='h-4' />
              <div className="text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>In Stock ({product.stock} available)</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-base">{product.description}</p>
          
          <div className="space-y-4">
             <p className="text-4xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
            <AddToCartButton productId={product.id} />
          </div>

          <Card>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" />
                  <div>
                      <p className="font-semibold">Free Shipping</p>
                      <p className="text-muted-foreground">On orders over $50</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                      <p className="font-semibold">Secure Payments</p>
                      <p className="text-muted-foreground">1-Year Warranty</p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold font-headline mb-4">Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                       <p className="font-semibold">{review.author}</p>
                       <div className="flex items-center">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                         ))}
                       </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
          )}
      </div>
    </div>
  );
}
