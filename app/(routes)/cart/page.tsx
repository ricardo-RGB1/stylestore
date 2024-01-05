"use client";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const cart = useCart();
  // *** This code is a workaround for a common issue in Next.js related to hydration. ***
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  // *** This code is a workaround for a common issue in Next.js related to hydration. ***

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {/* Show message if there are no cart items */}
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              {/* Show cart items */}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

// This code is a workaround for a common issue in Next.js related to hydration.

// Hydration is the process where client-side JavaScript makes the static HTML returned by the server fully interactive. If the client-side JavaScript expects a different state than what the server has rendered, it can cause hydration issues.

// In this code, a state variable isMounted is used to track whether the component has mounted on the client side. Initially, isMounted is set to false.

// The useEffect hook is used to change the isMounted state to true after the first render of the component on the client side. The empty dependency array [] ensures this effect runs only once after the initial render.

// If isMounted is false (which means the component is still in the process of first render or server-side render), the component returns null and nothing is rendered. This prevents the client-side JavaScript from trying to interact with elements that are not yet fully rendered, thus avoiding hydration issues.

// Once the component is mounted, isMounted becomes true and the component renders normally.
