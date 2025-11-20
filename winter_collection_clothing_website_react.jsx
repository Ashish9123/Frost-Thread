import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file React component for a Winter Collection e-commerce landing + catalog
// Tailwind CSS assumed to be available in the project.

const PRODUCTS = [
  {
    id: 1,
    title: "Arctic Puffer Jacket",
    price: 129,
    color: "Navy",
    material: "Down",
    size: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    tag: "Jacket",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Cozy Cable Knit Sweater",
    price: 69,
    color: "Cream",
    material: "Wool Blend",
    size: ["S", "M", "L"],
    img: "https://images.unsplash.com/photo-1541099649105-1a2f3d5f6a1c?auto=format&fit=crop&w=800&q=80",
    tag: "Sweater",
    rating: 4.4,
  },
  {
    id: 3,
    title: "Fleece-Lined Leggings",
    price: 39,
    color: "Black",
    material: "Polyester",
    size: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
    tag: "Bottoms",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Wool Blend Overcoat",
    price: 179,
    color: "Charcoal",
    material: "Wool Blend",
    size: ["M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    tag: "Coat",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Knit Beanie + Scarf Set",
    price: 29,
    color: "Burgundy",
    material: "Acrylic",
    size: ["One Size"],
    img: "https://images.unsplash.com/photo-1519741491600-2f6655d1b4f2?auto=format&fit=crop&w=800&q=80",
    tag: "Accessories",
    rating: 4.3,
  },
  {
    id: 6,
    title: "Thermal Base Layer",
    price: 24,
    color: "Grey",
    material: "Merino Blend",
    size: ["S", "M", "L"],
    img: "https://images.unsplash.com/photo-1520975916027-21c2d8c2f6d6?auto=format&fit=crop&w=800&q=80",
    tag: "Baselayer",
    rating: 4.2,
  },
];

export default function WinterCollectionSite() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  const tags = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.tag)))];

  function filteredProducts() {
    let list = PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) || p.color.toLowerCase().includes(query.toLowerCase())
    );
    if (activeTag !== "All") list = list.filter((p) => p.tag === activeTag);

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);

    return list;
  }

  function addToCart(product) {
    setCart((c) => {
      const exists = c.find((i) => i.id === product.id);
      if (exists) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  function changeQty(id, qty) {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold tracking-tight">Frost & Thread</div>
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <button className="hover:underline">New Arrivals</button>
              <button className="hover:underline">Men</button>
              <button className="hover:underline">Women</button>
              <button className="hover:underline">Accessories</button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <input
                className="w-64 px-3 py-2 border rounded-md text-sm"
                placeholder="Search jackets, sweaters..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="px-3 py-2 text-sm border rounded-md"
            >
              Contact
            </button>

            <button
              onClick={() => document.getElementById("cart-drawer").classList.toggle("translate-x-0")}
              aria-label="Open cart"
              className="relative px-3 py-2 text-sm border rounded-md"
            >
              Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Winter 2025</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Stay Warm. Look Effortless.</h1>
            <p className="text-gray-600 max-w-xl">
              Explore our handpicked winter collection — premium outerwear, cozy knits, and performance layers built for
              cold-weather comfort. Thoughtfully designed fabrics, sustainable choices, and timeless style.
            </p>
            <div className="flex gap-3">
              <a
                href="#products"
                className="px-5 py-3 bg-gray-900 text-white rounded-md shadow-sm hover:opacity-95 text-sm"
              >
                Shop Collection
              </a>
              <a
                href="#about"
                className="px-5 py-3 border rounded-md text-sm hover:bg-gray-100"
              >
                About the Collection
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
                alt="winter hero"
                className="w-full object-cover h-80 md:h-96"
              />
            </div>
          </motion.div>
        </section>

        {/* Filters + Catalog */}
        <section id="products" className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTag(t)}
                      className={`px-3 py-1 text-sm rounded-full border ${activeTag === t ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Price range</h4>
                <div className="text-sm text-gray-600">$20 — $200+</div>
                {/* Placeholder for range slider */}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Colors</h4>
                <div className="flex gap-2">
                  {['Black','Grey','Cream','Burgundy','Navy'].map((c) => (
                    <button key={c} className="px-2 py-1 text-xs border rounded">{c}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Winter Collection</h2>
                <p className="text-sm text-gray-600">Classic essentials and new-season arrivals curated for cold days.</p>
              </div>

              <div className="md:hidden">
                <input
                  className="w-48 px-3 py-2 border rounded-md text-sm"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts().map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="relative">
                      <img src={p.img} alt={p.title} className="w-full object-cover h-56" />
                      <div className="absolute top-3 left-3 bg-white/80 px-2 py-1 rounded text-xs">{p.tag}</div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{p.title}</h3>
                          <div className="text-sm text-gray-600">{p.color} &middot; {p.material}</div>
                        </div>
                        <div className="text-lg font-bold">${p.price}</div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-yellow-600">⭐ {p.rating}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelected(p)}
                            className="px-3 py-2 border rounded-md text-sm"
                          >
                            Quick view
                          </button>
                          <button
                            onClick={() => addToCart(p)}
                            className="px-3 py-2 bg-gray-900 text-white rounded-md text-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">About the Collection</h3>
          <p className="text-gray-600">
            Our Winter Collection blends timeless silhouettes with responsibly chosen materials. From insulated outerwear
            to soft knitwear and practical base layers, each piece is engineered for warmth, comfort, and durability.
            We prioritize clean design and thoughtful details so your winter wardrobe feels as good as it looks.
          </p>
        </section>
      </main>

      {/* Product quick-view modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-lg"
            >
              <div className="grid md:grid-cols-2">
                <img src={selected.img} alt={selected.title} className="w-full object-cover h-96" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
                  <div className="text-gray-600 mb-4">{selected.color} • {selected.material}</div>
                  <div className="text-lg font-bold mb-4">${selected.price}</div>

                  <div className="mb-4">
                    <label className="text-sm font-medium">Size</label>
                    <div className="flex gap-2 mt-2">
                      {selected.size.map((s) => (
                        <button key={s} className="px-3 py-1 border rounded-md text-sm">{s}</button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { addToCart(selected); setSelected(null); }}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md"
                    >
                      Add to Cart
                    </button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <div
        id="cart-drawer"
        className="fixed right-0 top-0 transform translate-x-full h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h4 className="font-semibold">Your Cart</h4>
          <button
            onClick={() => document.getElementById("cart-drawer").classList.toggle("translate-x-0")}
            className="px-3 py-1 border rounded"
          >
            Close
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-gray-600">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.img} alt={i.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{i.title}</div>
                    <div className="text-sm text-gray-600">${i.price} × {i.qty}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => changeQty(i.id, Math.max(1, i.qty - 1))} className="px-2 py-1 border rounded">-</button>
                      <div className="px-2">{i.qty}</div>
                      <button onClick={() => changeQty(i.id, i.qty + 1)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => removeFromCart(i.id)} className="ml-2 text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="font-semibold">${total.toFixed(2)}</div>
          </div>
          <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-md">Checkout</button>
        </div>
      </div>

      <footer className="mt-10 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-600 flex justify-between">
          <div>© {new Date().getFullYear()} Frost & Thread</div>
          <div>Designed with care • Free shipping over $100</div>
        </div>
      </footer>
    </div>
  );
}
