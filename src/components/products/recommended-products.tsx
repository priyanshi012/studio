'use client';

import { useState, useEffect } from 'react';
import ProductCard from './product-card';
import { Product } from '@/lib/types';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';
import { getRecommendations } from '@/actions/ai';
import { Skeleton } from '@/components/ui/skeleton';

const RecommendedProducts = () => {
  const { history, isLoaded } = useBrowsingHistory();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    
    const fetchRecommendations = async () => {
      setIsLoading(true);
      if (history.length > 0) {
        try {
          const recommendedProducts = await getRecommendations(history);
          setRecommendations(recommendedProducts.slice(0, 4)); // Show top 4
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          setRecommendations([]);
        }
      }
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [history, isLoaded]);
  
  if (!isLoaded || history.length === 0) {
    return null; // Don't show the section if there's no history
  }

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-10">Just For You</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Could not load recommendations at this time.</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedProducts;
