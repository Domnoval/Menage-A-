import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { shopifyFetch, isShopifyConfigured } from '../lib/shopify';
import {
  CREATE_CART,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_LINE,
  REMOVE_FROM_CART,
} from '../lib/queries';

// Types
interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartLine[];
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  isConfigured: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'tonic-cart-id';

// Helper to parse cart response
function parseCart(cartData: any): Cart | null {
  if (!cartData) return null;

  return {
    id: cartData.id,
    checkoutUrl: cartData.checkoutUrl,
    totalQuantity: cartData.totalQuantity,
    cost: cartData.cost,
    lines: cartData.lines.edges.map((edge: any) => edge.node),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isConfigured = isShopifyConfigured();

  // Initialize cart on mount
  useEffect(() => {
    if (!isConfigured) return;

    const initCart = async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);

      if (savedCartId) {
        try {
          const data = await shopifyFetch<{ cart: any }>({
            query: GET_CART,
            variables: { cartId: savedCartId },
          });

          if (data.cart) {
            setCart(parseCart(data.cart));
            return;
          }
        } catch (error) {
          console.error('Failed to fetch existing cart:', error);
          localStorage.removeItem(CART_ID_KEY);
        }
      }

      // Create new cart if none exists
      try {
        const data = await shopifyFetch<{ cartCreate: { cart: any } }>({
          query: CREATE_CART,
          variables: { lines: [] },
        });

        if (data.cartCreate.cart) {
          const newCart = parseCart(data.cartCreate.cart);
          if (newCart) {
            setCart(newCart);
            localStorage.setItem(CART_ID_KEY, newCart.id);
          }
        }
      } catch (error) {
        console.error('Failed to create cart:', error);
      }
    };

    initCart();
  }, [isConfigured]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      if (!cart || !isConfigured) return;

      setIsLoading(true);
      try {
        const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>({
          query: ADD_TO_CART,
          variables: {
            cartId: cart.id,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });

        if (data.cartLinesAdd.userErrors.length > 0) {
          console.error('Add to cart errors:', data.cartLinesAdd.userErrors);
          return;
        }

        setCart(parseCart(data.cartLinesAdd.cart));
        setIsOpen(true); // Open cart drawer after adding
      } catch (error) {
        console.error('Failed to add to cart:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, isConfigured]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart || !isConfigured) return;

      setIsLoading(true);
      try {
        const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>({
          query: UPDATE_CART_LINE,
          variables: {
            cartId: cart.id,
            lines: [{ id: lineId, quantity }],
          },
        });

        if (data.cartLinesUpdate.userErrors.length > 0) {
          console.error('Update cart errors:', data.cartLinesUpdate.userErrors);
          return;
        }

        setCart(parseCart(data.cartLinesUpdate.cart));
      } catch (error) {
        console.error('Failed to update cart:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, isConfigured]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart || !isConfigured) return;

      setIsLoading(true);
      try {
        const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>({
          query: REMOVE_FROM_CART,
          variables: {
            cartId: cart.id,
            lineIds: [lineId],
          },
        });

        if (data.cartLinesRemove.userErrors.length > 0) {
          console.error('Remove from cart errors:', data.cartLinesRemove.userErrors);
          return;
        }

        setCart(parseCart(data.cartLinesRemove.cart));
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, isConfigured]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        isConfigured,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
