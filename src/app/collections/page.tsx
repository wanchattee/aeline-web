import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, formatPrice } from "@/lib/products";
import { Category, Product } from "@/lib/types";

const CATEGORIES: Category[] = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = (params.category as Category) ?? "All";

  const allProducts = await getAllProducts();
  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "97px" }}>
        {/* Page title */}
        <div
          style={{ borderBottom: "1px solid #E8E4DC" }}
          className="px-6 pt-12 pb-6"
        >
          <h1
            style={{ fontSize: "0.75rem", letterSpacing: "0.25em" }}
            className="uppercase font-medium mb-6"
          >
            All Collections
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
        <div className="px-6 py-4">
          <p style={{ fontSize: "0.688rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase">
            {filtered.length} {filtered.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Product grid */}
        <div className="px-6 pb-20">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-32 text-sm tracking-widest uppercase">
              No products in this category
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {filtered.map((product) => (
                <CollectionProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function CollectionProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: "3/4", backgroundColor: "#F5F0E8" }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized={product.imageUrl.startsWith("https://")}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#6B6B6B" }} className="uppercase font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase mb-1">
        {product.category}
      </p>
      <p style={{ fontSize: "0.813rem" }} className="font-medium mb-1 group-hover:opacity-60 transition-opacity">
        {product.name}
      </p>
      <p style={{ fontSize: "0.813rem", color: "#1B4332" }} className="font-medium">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
