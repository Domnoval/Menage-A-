/**
 * Shopify Storefront API Client
 *
 * To connect your store:
 * 1. Go to Shopify Admin → Settings → Apps and sales channels
 * 2. Click "Develop apps" → Create an app
 * 3. Configure Storefront API scopes (read products, read/write checkouts)
 * 4. Get your Storefront API access token
 * 5. Add to .env file
 */

// Store configuration - update with your store details
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'tonic-thought-studios-2.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

const STOREFRONT_API_VERSION = '2024-01';

export const shopifyConfig = {
  storeDomain: SHOPIFY_STORE_DOMAIN,
  storefrontToken: SHOPIFY_STOREFRONT_TOKEN,
  apiVersion: STOREFRONT_API_VERSION,
};

/**
 * Make a request to the Shopify Storefront API
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL Errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL Error');
  }

  return json.data as T;
}

/**
 * Check if Shopify is configured
 */
export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STOREFRONT_TOKEN);
}
