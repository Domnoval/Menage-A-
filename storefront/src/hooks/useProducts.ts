import { useState, useEffect } from 'react';
import { shopifyFetch, isShopifyConfigured } from '../lib/shopify';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_HANDLE } from '../lib/queries';

// Types
export interface ProductImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  productType: string;
  createdAt: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: ProductImage | null;
  images: ProductImage[];
  variants: ProductVariant[];
  options: {
    name: string;
    values: string[];
  }[];
}

// Parse product from GraphQL response
function parseProduct(node: any): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    tags: node.tags,
    productType: node.productType,
    createdAt: node.createdAt,
    priceRange: node.priceRange,
    compareAtPriceRange: node.compareAtPriceRange,
    featuredImage: node.featuredImage,
    images: node.images.edges.map((edge: any) => edge.node),
    variants: node.variants.edges.map((edge: any) => edge.node),
    options: node.options,
  };
}

// Hook to fetch all products
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isShopifyConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
          query: GET_ALL_PRODUCTS,
        });

        const parsedProducts = data.products.edges.map((edge) =>
          parseProduct(edge.node)
        );
        setProducts(parsedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isConfigured]);

  return { products, isLoading, error, isConfigured };
}

// Hook to fetch single product by handle
export function useProduct(handle: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isShopifyConfigured();

  useEffect(() => {
    if (!isConfigured || !handle) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await shopifyFetch<{ product: any }>({
          query: GET_PRODUCT_BY_HANDLE,
          variables: { handle },
        });

        if (data.product) {
          setProduct(parseProduct(data.product));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle, isConfigured]);

  return { product, isLoading, error, isConfigured };
}

// Helper to format price
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// Helper to check if product is new (created in last 30 days)
export function isNewProduct(createdAt: string): boolean {
  const created = new Date(createdAt);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return created > thirtyDaysAgo;
}

// Helper to get product category from tags or type
export function getProductCategory(product: Product): string {
  // Check tags first
  const categoryTags = ['prints', 'apparel', 'objects', 'digital'];
  const foundTag = product.tags.find((tag) =>
    categoryTags.includes(tag.toLowerCase())
  );
  if (foundTag) return foundTag.toLowerCase();

  // Fall back to product type
  const type = product.productType.toLowerCase();
  if (type.includes('print')) return 'prints';
  if (type.includes('apparel') || type.includes('shirt') || type.includes('hoodie'))
    return 'apparel';
  if (type.includes('digital')) return 'digital';

  return 'objects';
}
