import { getProducts, getCategories } from '@/lib/data';
import ProductCard from '@/components/products/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

export const metadata = {
  title: 'Products | ShopWave',
  description: 'Browse our collection of high-quality products.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const query = typeof searchParams.query === 'string' ? searchParams.query : undefined;

  const products = await getProducts({ category, query });
  const categories = await getCategories();

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">
          {category ? categories.find(c => c.slug === category)?.name : 'All Products'}
        </h1>
        <p className="text-muted-foreground mt-2">Discover your next favorite item from our curated collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-20 p-4 bg-card rounded-lg shadow-sm">
            <h3 className="font-headline font-semibold mb-4">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products"
                className={cn(
                  'px-3 py-2 rounded-md text-sm transition-colors',
                  !category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm transition-colors',
                    category === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="md:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-lg">
              <h2 className="text-2xl font-semibold font-headline">No Products Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Clear Filters</Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
