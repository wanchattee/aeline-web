import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, formatProductPrice } from "@/lib/products";
import { Product } from "@/lib/types";

export default async function CollectionGrid() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-20" style={{ padding: "5rem 4rem" }}>
      {/* Section header */}
      <div
        style={{ borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC" }}
        className="flex items-center justify-between py-4 mb-10"
      >
        <h2
          style={{ fontSize: "0.688rem", letterSpacing: "0.18em" }}
          className="uppercase font-medium"
        >
          New Arrivals
        </h2>
        <Link
          href="/collections"
          style={{ fontSize: "0.688rem", letterSpacing: "0.12em" }}
          className="uppercase font-medium underline underline-offset-4 hover:opacity-50 transition-opacity"
        >
          View All
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-400 py-20 text-sm tracking-widest uppercase">
          No products available
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: "3/4", backgroundColor: "#F5F0E8", padding: "1.5rem" }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ padding: "1rem" }}
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized={product.imageUrl.startsWith("https://drive.google.com") || product.imageUrl.startsWith("https://lh3") || product.imageUrl.startsWith("/images/products/")}
        />

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span
              style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#6B6B6B" }}
              className="uppercase font-medium"
            >
              Sold Out
            </span>
          </div>
        )}

        {/* Quick view — hover */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              style={{
                backgroundColor: "#1B4332",
                color: "#F5F0E8",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
              }}
              className="w-full py-3 uppercase font-medium"
            >
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p
          style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#6B6B6B" }}
          className="uppercase"
        >
          {product.category}
        </p>
        <p
          style={{ fontSize: "0.813rem", letterSpacing: "0.04em" }}
          className="font-medium text-black group-hover:opacity-60 transition-opacity leading-snug"
        >
          {product.name}
        </p>
        <p style={{ fontSize: "0.813rem", color: "#1B4332" }} className="font-medium">
          {formatProductPrice(product)}
        </p>
      </div>
    </Link>
  );
}
