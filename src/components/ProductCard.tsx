import Image from "next/image";
import Link from "next/link";
import { formatProductPrice } from "@/lib/products";
import { Product } from "@/lib/types";

// Grid card used on /collections and in "You might also like"
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1/1", backgroundColor: "#FFFFFF", marginBottom: "1rem" }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ padding: "0.5rem" }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized={product.imageUrl.startsWith("https://") || product.imageUrl.startsWith("/images/products/")}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#6B6B6B" }} className="uppercase font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#6B6B6B", marginBottom: "0.25rem" }} className="uppercase">
        {product.category}
      </p>
      <p style={{ fontSize: "0.813rem", marginBottom: "0.25rem" }} className="font-medium group-hover:opacity-60 transition-opacity">
        {product.name}
      </p>
      <p style={{ fontSize: "0.813rem", color: "#1B4332" }} className="font-medium">
        {formatProductPrice(product)}
      </p>
    </Link>
  );
}
