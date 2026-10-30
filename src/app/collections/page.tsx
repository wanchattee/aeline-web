import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";
import { Category, Product } from "@/lib/types";

const CATEGORIES: Category[] = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];
// Note: "Charms" excluded — they live on their own page at /charm-builder

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  // While searching, no category tab is active
  const activeCategory: Category | null = query ? null : ((params.category as Category) ?? "All");

  const allProducts = await getAllProducts();
  // Exclude Charms — they have their own dedicated page at /charm-builder
  const browsableProducts = allProducts.filter((p) => p.category !== "Charms");
  const filtered = query
    ? searchProducts(allProducts, query) // search covers Charms too
    : activeCategory === "All"
      ? browsableProducts
      : browsableProducts.filter((p) => p.category === activeCategory);

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
            {query ? `Search — “${query}”` : "All Collections"}
          </h1>

          {/* Category filter tabs */}
          <div className="flex gap-6 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
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

        {/* Results count */}
        <div style={{ padding: "1rem clamp(1.5rem, 5vw, 4rem)" }}>
          <p style={{ fontSize: "0.688rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase">
            {filtered.length} {filtered.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Product grid */}
        <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) 4rem" }}>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-32 text-sm tracking-widest uppercase">
              {query ? "No products match your search" : "No products in this category"}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {filtered.map((product) => (
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
