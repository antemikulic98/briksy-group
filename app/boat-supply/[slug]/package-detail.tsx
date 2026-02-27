"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  type Package,
  type Product,
  products,
  getProduct,
  getAllCategories,
} from "../data";
import { submitBoatSupplyOrder } from "@/lib/actions/boat-supply";

type CartItem = { product: Product; qty: number };

export default function PackageDetail({ pkg }: { pkg: Package }) {
  const isCustom = pkg.slug === "custom";

  const [cart, setCart] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    pkg.items.forEach((item) => {
      initial[item.productId] = item.defaultQty;
    });
    return initial;
  });

  const [showCatalog, setShowCatalog] = useState(isCustom);
  const [catalogFilter, setCatalogFilter] = useState("All");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const cartItems: CartItem[] = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ product: getProduct(id)!, qty }))
        .filter((i) => i.product),
    [cart]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cartItems]
  );

  function setQty(productId: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }

  function addProduct(productId: string) {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  }

  const categories = getAllCategories();
  const catalogProducts = products.filter(
    (p) =>
      (catalogFilter === "All" || p.category === catalogFilter) &&
      !(p.id in cart)
  );

  async function handleOrder(formData: FormData) {
    setStatus("loading");
    formData.append("packageName", pkg.name);
    formData.append(
      "items",
      JSON.stringify(cartItems.map((i) => ({ name: i.product.name, qty: i.qty, price: i.product.price })))
    );
    const result = await submitBoatSupplyOrder(formData);
    if (result.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  const cartByCategory = useMemo(() => {
    const grouped: Record<string, CartItem[]> = {};
    cartItems.forEach((item) => {
      const cat = item.product.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-[env(safe-area-inset-bottom)]">
      {/* Header — compact on mobile */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/boat-supply"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground active:text-foreground"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">All Packages</span>
          </Link>
          <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold sm:hidden">{pkg.name}</h2>
          <div className="text-right">
            <p className="text-base font-bold text-accent sm:text-xl">{total.toFixed(2)} &euro;</p>
            <p className="hidden text-xs text-muted sm:block">{cartItems.length} products</p>
          </div>
        </div>
      </header>

      {/* Package info — hidden title on mobile (shown in header) */}
      <section className="px-4 pt-5 pb-4 sm:px-6 sm:pt-10 sm:pb-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="hidden text-3xl font-bold tracking-tight sm:block md:text-4xl">{pkg.name}</h1>
          <p className="text-sm text-muted sm:mt-2 sm:text-base">{pkg.description}</p>
        </div>
      </section>

      {/* Products by category */}
      <section className="px-4 pb-6 sm:px-6 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          {Object.keys(cartByCategory).length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {Object.entries(cartByCategory).map(([category, items]) => (
                <div key={category} className="overflow-hidden rounded-xl bg-white ring-1 ring-border sm:rounded-2xl">
                  {/* Category header */}
                  <div className="flex items-center gap-2.5 border-b border-border bg-slate-50 px-4 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent sm:h-7 sm:w-7 sm:rounded-lg">
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                      </svg>
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wide sm:text-sm sm:normal-case sm:tracking-normal">
                      {category}
                    </h3>
                    <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent sm:px-2.5 sm:text-xs">
                      {items.length}
                    </span>
                  </div>

                  {/* Product cards */}
                  <div className="divide-y divide-border sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:p-3 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map(({ product, qty }) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-3 sm:rounded-xl sm:p-3 sm:ring-1 sm:ring-border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold leading-tight">{product.name}</p>
                          <p className="mt-0.5 text-xs font-semibold text-accent">
                            {product.price.toFixed(2)} &euro;
                            <span className="font-normal text-muted"> /pc</span>
                          </p>

                          {/* Qty controls — larger touch targets on mobile */}
                          <div className="mt-2 flex items-center gap-1">
                            <button
                              onClick={() => setQty(product.id, qty - 1)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-sm font-medium transition-colors hover:bg-slate-50 active:bg-slate-100 sm:h-7 sm:w-7 sm:text-xs"
                            >
                              &minus;
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{qty}</span>
                            <button
                              onClick={() => setQty(product.id, qty + 1)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-sm font-medium transition-colors hover:bg-slate-50 active:bg-slate-100 sm:h-7 sm:w-7 sm:text-xs"
                            >
                              +
                            </button>
                            <span className="ml-auto text-sm font-bold sm:text-xs">
                              {(product.price * qty).toFixed(2)} &euro;
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border bg-white py-12 text-center sm:rounded-2xl sm:py-16">
              <svg className="mx-auto h-10 w-10 text-muted/40 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="mt-4 font-medium text-muted">Your box is empty</p>
              <p className="mt-1 text-sm text-muted">Add products from the catalog below</p>
            </div>
          )}
        </div>
      </section>

      {/* Catalog */}
      <section className="px-4 pb-28 sm:px-6 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-xl border border-border bg-white sm:rounded-2xl">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base font-bold sm:text-lg">
                {isCustom ? "Product Catalog" : "Add More Products"}
              </h2>
              {!isCustom && (
                <button
                  onClick={() => setShowCatalog(!showCatalog)}
                  className="cursor-pointer rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm sm:hover:bg-transparent sm:hover:text-accent-dark"
                >
                  {showCatalog ? "Hide" : "Browse"}
                </button>
              )}
            </div>

            {showCatalog && (
              <div className="border-t border-border">
                {/* Category filter — horizontal scroll on mobile */}
                <div className="-mb-px flex gap-0 overflow-x-auto sm:flex-wrap sm:gap-2 sm:px-6 sm:pt-4">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatalogFilter(cat)}
                      className={`cursor-pointer whitespace-nowrap px-4 py-3 text-xs font-medium transition-colors sm:rounded-full sm:px-3.5 sm:py-1.5 ${
                        catalogFilter === cat
                          ? "border-b-2 border-accent text-accent sm:border-0 sm:bg-accent sm:text-white"
                          : "text-muted hover:text-foreground sm:bg-slate-100 sm:hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Catalog list */}
                <div className="divide-y divide-border sm:grid sm:grid-cols-2 sm:gap-2 sm:divide-y-0 sm:p-4 lg:grid-cols-3">
                  {catalogProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addProduct(product.id)}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors active:bg-slate-50 sm:rounded-xl sm:px-3 sm:py-2.5 sm:hover:bg-slate-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="h-11 w-11 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10 sm:rounded-md" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-xs font-semibold text-accent">{product.price.toFixed(2)} &euro;</p>
                      </div>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-7 sm:w-7">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                  ))}
                  {catalogProducts.length === 0 && (
                    <p className="col-span-full py-8 text-center text-sm text-muted sm:py-6">
                      All products from this category are in your box.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky order bar — safe area aware */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
            <div>
              <p className="text-base font-bold sm:text-lg">
                {total.toFixed(2)} <span className="text-accent">&euro;</span>
              </p>
              <p className="text-[11px] text-muted sm:text-xs">
                {cartItems.reduce((s, i) => s + i.qty, 0)} items
              </p>
            </div>
            <button
              onClick={() => setShowOrderForm(true)}
              className="cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all active:scale-[0.97] hover:bg-accent-dark sm:px-8"
            >
              Order Now
            </button>
          </div>
        </div>
      )}

      {/* Order Modal — bottom sheet on mobile, centered on desktop */}
      {showOrderForm && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowOrderForm(false); if (status === "success") setStatus("idle"); } }}
        >
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-2xl">
            {/* Drag handle on mobile */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            <div className="p-5 sm:p-8">
              <button
                onClick={() => { setShowOrderForm(false); if (status === "success") setStatus("idle"); }}
                className="absolute right-3 top-3 cursor-pointer rounded-full p-2 text-muted transition-colors hover:bg-slate-100 active:bg-slate-200 sm:right-4 sm:top-4 sm:p-1"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {status === "success" ? (
                <div className="py-8 text-center sm:py-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
                    <svg className="h-7 w-7 text-green-600 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Order Sent!</h3>
                  <p className="mt-2 text-sm text-muted">
                    We&apos;ll confirm your order via email shortly.
                  </p>
                  <button
                    onClick={() => { setShowOrderForm(false); setStatus("idle"); }}
                    className="mt-6 cursor-pointer rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors active:scale-[0.97] hover:bg-accent-dark"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold sm:text-xl">Complete Your Order</h2>

                  {/* Summary — collapsible on mobile */}
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 sm:mt-4 sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted">{pkg.name}</span>
                      <span className="text-base font-bold text-accent sm:text-lg">{total.toFixed(2)} &euro;</span>
                    </div>
                    <div className="mt-2 max-h-24 overflow-y-auto sm:max-h-32">
                      {cartItems.map((i) => (
                        <div key={i.product.id} className="flex items-center justify-between py-0.5 text-[11px] text-muted sm:py-1 sm:text-xs">
                          <span className="truncate pr-3">{i.product.name}</span>
                          <span className="shrink-0">{i.qty} &times; {i.product.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form action={handleOrder} className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Name *</label>
                      <input name="name" required placeholder="John Doe"
                        className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Email *</label>
                      <input name="email" type="email" required placeholder="john@example.com"
                        className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium">Phone</label>
                        <input name="phone" placeholder="+385 ..."
                          className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Check-in</label>
                        <input name="checkInDate" type="date"
                          className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Marina</label>
                      <input name="marina" placeholder="e.g. ACI Marina Split"
                        className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Note</label>
                      <textarea name="note" rows={2} placeholder="Any special requests..."
                        className="w-full rounded-xl border border-border px-4 py-3 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none sm:text-sm" />
                    </div>

                    {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full cursor-pointer rounded-xl bg-accent py-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all active:scale-[0.98] hover:bg-accent-dark disabled:opacity-50 sm:py-3.5"
                    >
                      {status === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        `Send Order — ${total.toFixed(2)} €`
                      )}
                    </button>
                  </form>

                  {/* Extra padding for iPhone home indicator */}
                  <div className="h-2 sm:hidden" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
