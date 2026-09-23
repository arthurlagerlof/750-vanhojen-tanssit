"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/components/shop/CartProvider";

export function Checkout() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const cartItems = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find(
          (product) => product.id === item.productId,
        );

        if (!product) return null;

        return {
          ...item,
          product,
        };
      })
      .filter(Boolean);
  }, [items]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item!.product.price * item!.quantity,
    0,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cartItems.length === 0) {
      setError("Ostoskori on tyhjä.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name,
            phone,
            email,
            message,
          },
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Tilauksen lähettäminen epäonnistui.",
        );
      }

      clearCart();

      window.location.href = `/tilaus/kiitos?order=${encodeURIComponent(
        data.orderId,
      )}`;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Tilauksen lähettäminen epäonnistui.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3ede1] px-6 py-16 text-[#241c18] sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-2 text-sm text-[#66574f] transition hover:text-[#542d2c]"
        >
          <ArrowLeft size={16} />
          Takaisin kakkutukkuun
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <section>
            <p className="text-xs uppercase tracking-[0.35em] text-[#a58a55]">
              Tilaus
            </p>

            <h1 className="font-display mt-3 text-6xl leading-none sm:text-7xl">
              Tilaa herkut.
            </h1>

            {cartItems.length === 0 ? (
              <div className="mt-12 rounded-2xl border border-[#d7c9b5] bg-[#faf7f0] p-8">
                <p className="text-[#66574f]">
                  Ostoskorisi on tyhjä.
                </p>

                <Link
                  href="/#shop"
                  className="mt-5 inline-flex rounded-full bg-[#071b35] px-6 py-3 text-sm text-[#f6f1e7]"
                >
                  Tutustu tuotteisiin
                </Link>
              </div>
            ) : (
              <div className="mt-10 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item!.product.id}
                    className="flex gap-4 rounded-2xl bg-[#faf7f0] p-4 ring-1 ring-[#d7c9b5]/70"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eee7da]">
                      <img
                        src={item!.product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl leading-tight">
                        {item!.product.name}
                      </h2>

                      <p className="mt-1 text-sm text-[#66574f]">
                        {item!.product.price.toFixed(2).replace(".", ",")} €
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item!.product.id,
                              item!.quantity - 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7c9b5]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-5 text-center text-sm">
                          {item!.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item!.product.id,
                              item!.quantity + 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7c9b5]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item!.product.id)
                      }
                      aria-label={`Poista ${item!.product.name}`}
                      className="self-start text-[#8c776b] transition hover:text-[#542d2c]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {cartItems.length > 0 && (
            <section>
              <div className="rounded-2xl bg-[#071b35] p-6 text-[#f6f1e7] sm:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#d6b66a]">
                  Yhteystiedot
                </p>

                <h2 className="font-display mt-3 text-4xl">
                  Viimeistele tilaus
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  <label className="block">
                    <span className="mb-2 block text-sm text-[#c7d0da]">
                      Nimi
                    </span>

                    <input
                      required
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f6f1e7] outline-none transition placeholder:text-[#8290a0] focus:border-[#d6b66a]"
                      placeholder="Etunimi Sukunimi"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-[#c7d0da]">
                      Puhelinnumero
                    </span>

                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f6f1e7] outline-none transition placeholder:text-[#8290a0] focus:border-[#d6b66a]"
                      placeholder="040 123 4567"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-[#c7d0da]">
                      Sähköposti
                    </span>

                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f6f1e7] outline-none transition placeholder:text-[#8290a0] focus:border-[#d6b66a]"
                      placeholder="sinä@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-[#c7d0da]">
                      Viesti{" "}
                      <span className="text-[#8290a0]">
                        (valinnainen)
                      </span>
                    </span>

                    <textarea
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      rows={3}
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f6f1e7] outline-none transition placeholder:text-[#8290a0] focus:border-[#d6b66a]"
                      placeholder="Esimerkiksi toimitukseen liittyvä lisätieto"
                    />
                  </label>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#c7d0da]">
                        Yhteensä
                      </span>

                      <span className="font-display text-3xl text-[#d6b66a]">
                        {total.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#d6b66a] px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#071b35] transition hover:bg-[#f6f1e7] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting
                      ? "Lähetetään..."
                      : "Lähetä tilaus"}
                  </button>

                  <p className="text-center text-xs leading-5 text-[#8290a0]">
                    Tilauksesi tallennetaan ja saat pian
                    sähköpostiisi vahvistuksen tilauksestasi.
                  </p>
                </form>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}