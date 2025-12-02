'use server';

import { getPersonalizedRecommendations, PersonalizedRecommendationsInput } from '@/ai/flows/personalized-product-recommendations';
import { getProductById, getProducts } from '@/lib/data';

/**
 * Gets personalized product recommendations for a user based on their browsing history.
 *
 * This server action fetches the entire product catalog, combines it with the user's
 * browsing history, and then calls the `getPersonalizedRecommendations` AI flow
 * to generate a list of recommended product IDs. It then fetches the full product
 * details for the recommended IDs and returns them.
 *
 * @param browsingHistory An array of product IDs representing the user's browsing history.
 * @returns A promise that resolves to an array of recommended Product objects.
 */
export async function getRecommendations(browsingHistory: string[]) {
  // In a real-world scenario with a large catalog, you wouldn't fetch all products.
  // Instead, you'd have a more sophisticated system, perhaps using embeddings or
  // a dedicated recommendations service. For this project, fetching all is acceptable.
  const allProducts = await getProducts();

  const input: PersonalizedRecommendationsInput = {
    browsingHistory,
    catalog: allProducts.map(p => ({ productId: p.id, description: p.description })),
  };

  try {
    const result = await getPersonalizedRecommendations(input);
    const recommendedProductIds = result.productIds || [];

    // Fetch full product details for the recommended IDs
    const recommendedProducts = await Promise.all(
      recommendedProductIds.map(id => getProductById(id))
    );

    // Filter out any nulls (if a product ID was invalid) and return
    return recommendedProducts.filter(p => p !== undefined);

  } catch (error) {
    console.error("AI recommendation flow failed:", error);
    // As a fallback, you could return popular products or a default list
    return [];
  }
}
