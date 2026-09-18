"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  pack: string;
  price: number;
};

type CartItem = {
  productId: number;
  titleSnapshot: string;
  packContentSnapshot: string;
  pricePaiseSnapshot: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Electric Sparklers",
    pack: "Pack of 10 Pieces",
    price: 120,
  },
  {
    id: 2,
    name: "Flower Pot",
    pack: "Pack of 5 Pieces",
    price: 180,
  },
  {
    id: 3,
    name: "Ground Chakkar",
    pack: "Pack of 10 Pieces",
    price: 150,
  },
  {
    id: 4,
    name: "Color Rocket",
    pack: "Pack of 5 Pieces",
    price: 250,
  },
  {
    id: 5,
    name: "Fancy Crackers",
    pack: "Pack of 1 Box",
    price: 350,
  },
  {
    id: 6,
    name: "Kids Gift Box",
    pack: "Pack of 1 Box",
    price: 500,
  },
];

// 51 categories from the Muniraj Crackers development plan
const categories = [
  "Sparklers",
  "Special Sparklers",
  "One Sound",
  "Flower Pots",
  "Flower Pot Special",
  "Ground Chakkar Varieties",
  "Colour Ground Chakkar",
  "Ground Chakkars Special",
  "Bomb Varieties",
  "Bijili Varieties",
  "Twinkling Star",
  "Rocket",
  "Paper Bomb",
  "Colour Crackling Candle",
  "Flash and Crackling Candle",
  "Whistling Varieties",
  "Mega Crackling Fountain",
  "Multi Function Fountain",
  "Colour Crackling Fountain",
  "Crackling Fountain",
  "Deluxe Colour Fountain",
  "Lovely Colour and Crackling Fountain",
  "Kids Fountain",
  "Colour Fountain",
  "Fancy Novelties",
  "Children's Fancy Novelties",
  "Digital Crackling",
  "Peacock Varieties",
  "Kids Varieties",
  "Sound Varieties",
  "HiFi Short",
  "HiFi Full Crackers",
  "Mini Aerial Fancy",
  "Special Aerial Fancy",
  "2 Inch Aerial Fancy",
  "Ayyan Special Series",
  "Special Pipe Series",
  "4 Inch Aerial Fancy",
  "4 Inch Special Colour Fancy",
  "4 Inch Unique Varieties",
  "4 Inch Double Ball",
  "Seven Step Aerial Varieties",
  "Mega Aerial Display",
  "5 Inch Mega Display",
  "6 Inch Mega Display",
  "Repeating Shots",
  "Multicolour Shot",
  "Multicolour Shot With Crackling",
  "Fancy Setout Crackers",
  "Mega Setout Crackers",
  "Match Box",
];

const CART_KEY = "muniraj-cart-v1";

export default function Catalogue() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);

    if (savedCart) {
      try {
        const cart: CartItem[] = JSON.parse(savedCart);

        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartCount(totalItems);
      } catch {
        setCartCount(0);
      }
    }
  }, []);

  function addToCart(product: Product) {
    const savedCart = localStorage.getItem(CART_KEY);

    let cart: CartItem[] = [];

    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch {
        cart = [];
      }
    }

    const existingProduct = cart.find(
      (item) => item.productId === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        titleSnapshot: product.name,
        packContentSnapshot: product.pack,
        pricePaiseSnapshot: product.price * 100,
        quantity: 1,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(totalItems);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-red-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              Muniraj Crackers
            </h1>

            <p className="text-sm text-red-200">
              Crackers Catalogue
            </p>
          </div>

          <a
            href="/cart"
            className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            🛒 Cart ({cartCount})
          </a>

        </div>
      </header>

      {/* PAGE TITLE */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <h2 className="text-4xl font-bold text-gray-900">
          Product Catalogue
        </h2>

        <p className="mt-3 text-gray-600">
          Explore our cracker categories and products.
          Prices shown are estimates for enquiry purposes.
        </p>

      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6">

        <div className="mb-5 flex items-center justify-between">

          <h3 className="text-2xl font-bold text-gray-900">
            Categories
          </h3>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-800">
            {categories.length} Categories
          </span>

        </div>

        <div className="flex flex-wrap gap-3">

          {categories.map((category, index) => (
            <button
              key={category}
              className="rounded-full border border-red-800 bg-white px-5 py-2 text-sm font-medium text-red-800 transition hover:bg-red-800 hover:text-white"
            >
              {index + 1}. {category}
            </button>
          ))}

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-6 flex items-center justify-between">

          <h3 className="text-2xl font-bold text-gray-900">
            Products
          </h3>

          <p className="text-sm text-gray-500">
            Sample products
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* PRODUCT IMAGE PLACEHOLDER */}
              <div className="flex h-48 items-center justify-center bg-red-50">

                <span className="text-6xl">
                  🎆
                </span>

              </div>

              {/* PRODUCT DETAILS */}
              <div className="p-6">

                <h4 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h4>

                <p className="mt-2 text-gray-500">
                  {product.pack}
                </p>

                <p className="mt-4 text-2xl font-bold text-red-800">
                  ₹{product.price}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Estimated price
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full rounded-lg bg-red-800 px-5 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
                >
                  Add to Enquiry
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ENQUIRY NOTICE */}
      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6">

          <h3 className="text-xl font-bold text-gray-900">
            Enquiry Only
          </h3>

          <p className="mt-2 text-gray-700">
            Product prices are estimates. Availability and final
            pricing require seller confirmation.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-red-950 px-6 py-8 text-center text-white">

        <h3 className="text-xl font-bold">
          Muniraj Crackers
        </h3>

        <p className="mt-2 text-sm text-red-200">
          Quality Crackers • Easy Enquiry • Seller Confirmation
        </p>

        <p className="mt-4 text-sm text-red-300">
          © 2026 Muniraj Crackers
        </p>

      </footer>

    </main>
  );
}