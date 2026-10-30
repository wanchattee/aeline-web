import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";
import { Category, Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Collections",
  description: "Shop AELINE C rings, necklaces and bracelets — handcrafted in Bangkok.",
};

const CATEGORIES: Category[] = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];
// Note: "Charms" excluded — they live on their own page at /charm-builder

const SORTS = [
  { key: "", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
] as const;

type Params = { category?: string; q?: string; collection?: string; sort?: string };

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const collection = params.collection?.trim() ?? "";
  const sort = params.sort ?? "";
  // While searching or viewing a named collection, no category tab is active
  const activeCategory: Category | null =
    query || collection ? null : ((params.category as Category) ?? "All");

  const allProducts = await getAllProducts();
  // Exclude Charms — they have their own dedicated page at /charm-builder
  const browsableProducts = allProducts.filter((p) => p.category !== "Charms");
  const filtered = query
    ? searchProducts(allProducts, query) // search covers Charms too
    : collection
      ? allProducts.filter((p) => p.collectionName === collection)
      : activeCategory === "All"
        ? browsableProducts
        : browsableProducts.filter((p) => p.category === activeCategory);
  const sorted = sortProducts(filtered, sort);

  // Hide tabs for categories with nothing in them yet (unless the visitor is already on it)
  const tabs = CATEGORIES.filter(
    (cat) => cat === "All" || cat === activeCategory || browsableProducts.some((p) => p.category === cat)
  );

  const title = query ? `Search — “${query}”` : collection || "All Collections";

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "61px" }}>
        {/* Page title */}
        <div
          style={{ borderBottom: "1px solid #E8E4DC", padding: "3rem clamp(1.5rem, 5vw, 4rem) 1.5rem" }}
        >
          <h1
            style={{ fontSize: "0.75rem", letterSpacing: "0.25em" }}
            className="uppercase font-medium mb-6"
          >
            {title}
          </h1>

          {/* Category filter tabs */}
          <div className="flex gap-6 overflow-x-auto pb-1">
            {tabs.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/collections" : `/collections?category=${cat}`}
                style={{
                  fontSize: "0.688rem",
                  letterSpacing: "0.12em",
                  paddingBottom: "4px",
                  borderBottom: activeCategory === cat ? "1px solid #0A0A0A" : "1px solid transparent",
                  color: activeCategory === cat ? "#0A0A0A" : "#6B6B6B",
                  whiteSpace: "nowrap",
                }}
                className="uppercase font-medium hover:text-black transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Results count + sort */}
        <div
          style={{ padding: "1rem clamp(1.5rem, 5vw, 4rem)" }}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
        >
          <p style={{ fontSize: "0.688rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase">
            {sorted.length} {sorted.length === 1 ? "Item" : "Items"}
          </p>
          {sorted.length > 1 && (
            <nav aria-label="Sort products" className="flex flex-wrap gap-x-4 gap-y-1">
              {SORTS.map(({ key, label }) => (
                <Link
                  key={label}
                  href={hrefWith(params, { sort: key })}
                  aria-current={sort === key ? "true" : undefined}
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.1em",
                    color: sort === key ? "#0A0A0A" : "#8B8472",
                    textDecoration: sort === key ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                  className="uppercase hover:text-black transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Product grid */}
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) 4rem" }}>
          {sorted.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-gray-400 text-sm tracking-widest uppercase">
                {query
                  ? "No products match your search"
                  : activeCategory && activeCategory !== "All"
                    ? `${activeCategory} — coming soon`
                    : "No products in this collection"}
              </p>
              <a
                href="https://line.me/ti/p/~@aelinec"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.688rem", letterSpacing: "0.12em" }}
                className="inline-block mt-4 uppercase underline underline-offset-4 hover:opacity-60"
              >
                Ask us on LINE
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// Current URL params with some keys replaced (empty value removes the key)
function hrefWith(params: Params, overrides: Partial<Params>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...params, ...overrides })) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `/collections?${qs}` : "/collections";
}

function sortProducts(products: Product[], sort: string): Product[] {
  if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...products].sort((a, b) => (b.priceTo ?? b.price) - (a.priceTo ?? a.price));
  return products;
}

function searchProducts(products: Product[], query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const haystack = [p.name, p.category, p.material, p.collectionName, p.description, ...(p.tags ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
