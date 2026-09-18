"use client";

import { useEffect, useState } from "react";

type CartItem = {
  productId: number;
  titleSnapshot: string;
  packContentSnapshot: string;
  pricePaiseSnapshot: number;
  quantity: number;
};

const CART_KEY = "muniraj-cart-v1";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);

    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch {
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart, loaded]);

  function increaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId: number) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId)
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalEstimatePaise = cart.reduce(
    (total, item) =>
      total + item.pricePaiseSnapshot * item.quantity,
    0
  );

  const totalEstimate = totalEstimatePaise / 100;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-red-900 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              Muniraj Crackers
            </h1>

            <p className="text-sm text-red-200">
              Enquiry Cart
            </p>
          </div>

          <a
            href="/catalogue"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-red-900 hover:bg-gray-100"
          >
            ← Catalogue
          </a>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Your Enquiry Cart
          </h2>

          <p className="mt-3 text-gray-600">
            Review the products and quantities before sending
            your enquiry.
          </p>
        </div>

        {/* EMPTY CART */}
        {loaded && cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-md">
            <div className="text-6xl">🛒</div>

            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h3>

            <p className="mt-3 text-gray-600">
              Add products from the catalogue to prepare an enquiry.
            </p>

            <a
              href="/catalogue"
              className="mt-6 inline-block rounded-lg bg-red-800 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Browse Catalogue
            </a>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-5">
              {cart.map((item) => {
                const price = item.pricePaiseSnapshot / 100;
                const itemTotal =
                  price * item.quantity;

                return (
                  <div
                    key={item.productId}
                    className="rounded-2xl bg-white p-6 shadow-md"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      {/* PRODUCT INFO */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.titleSnapshot}
                        </h3>

                        <p className="mt-2 text-gray-500">
                          {item.packContentSnapshot}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          ₹{price.toFixed(2)} each
                        </p>
                      </div>

                      {/* CONTROLS */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.productId)
                          }
                          className="h-10 w-10 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.productId)
                          }
                          className="h-10 w-10 rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100"
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeItem(item.productId)
                          }
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="mt-5 border-t border-gray-100 pt-4 text-right">
                      <span className="text-sm text-gray-500">
                        Estimated Total:{" "}
                      </span>

                      <span className="text-lg font-bold text-red-800">
                        ₹{itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CLEAR CART */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearCart}
                className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-700 hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>

            {/* SUMMARY */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900">
                Estimate Summary
              </h3>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Items</span>

                  <span className="font-semibold">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-bold text-gray-900">
                    Estimated Total
                  </span>

                  <span className="text-2xl font-bold text-red-800">
                    ₹{totalEstimate.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="/catalogue"
                  className="rounded-lg border border-red-800 px-6 py-3 text-center font-semibold text-red-800 hover:bg-red-50"
                >
                  Add More Products
                </a>

                <a
                  href="/enquiry"
                  className="rounded-lg bg-red-800 px-6 py-3 text-center font-semibold text-white hover:bg-red-700"
                >
                  Continue to Enquiry
                </a>
              </div>

              <p className="mt-5 text-center text-xs text-gray-500">
                Prices are estimates only. Final pricing and
                availability require seller confirmation.
              </p>
            </div>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-red-950 px-6 py-8 text-center text-white">
        <h3 className="text-xl font-bold">
          Muniraj Crackers
        </h3>

        <p className="mt-2 text-sm text-red-200">
          Enquiry Only • Seller Confirmation Required
        </p>

        <p className="mt-4 text-sm text-red-300">
          © 2026 Muniraj Crackers
        </p>
      </footer>
    </main>
  );
}