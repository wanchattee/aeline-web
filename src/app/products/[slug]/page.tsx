import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts, formatProductPrice } from "@/lib/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "61px" }}>
        <div className="mx-auto py-12" style={{ maxWidth: "1152px", padding: "3rem 4rem" }}>
          {/* Breadcrumb */}
          <nav className="flex gap-2 mb-8" style={{ fontSize: "0.625rem", letterSpacing: "0.12em" }}>
            <Link href="/" className="text-gray-400 hover:text-black uppercase transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/collections" className="text-gray-400 hover:text-black uppercase transition-colors">Collections</Link>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="relative" style={{ aspectRatio: "1/1", backgroundColor: "#FAF7F2" }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                style={{ padding: "1rem" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={product.imageUrl.startsWith("https://") || product.imageUrl.startsWith("/images/products/")}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.collectionName && (
                <p style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#1B4332" }} className="uppercase mb-3">
                  {product.collectionName}
                </p>
              )}
              <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", color: "#6B6B6B" }} className="uppercase mb-2">
                {product.category}
              </p>
              <h1 style={{ fontSize: "1.5rem", letterSpacing: "0.06em", fontWeight: 600, lineHeight: 1.3 }} className="mb-4">
                {product.name}
              </h1>
              <p style={{ fontSize: "1.25rem", color: "#1B4332", letterSpacing: "0.06em" }} className="font-semibold mb-6">
                {formatProductPrice(product)}
              </p>

              <div style={{ borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC" }} className="py-6 mb-8">
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#3A3A3A" }}>
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              {product.inStock ? (
                <div className="space-y-3">
                  <a
                    href="https://line.me/ti/p/~@aelinec"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      backgroundColor: "#1B4332",
                      color: "#F5F0E8",
                      fontSize: "0.688rem",
                      letterSpacing: "0.2em",
                      padding: "1rem",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                    className="uppercase font-medium hover:opacity-80 transition-opacity"
                  >
                    Order via LINE
                  </a>
                  <a
                    href={`https://line.me/ti/p/~@aelinec`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      border: "1px solid #0A0A0A",
                      color: "#0A0A0A",
                      fontSize: "0.688rem",
                      letterSpacing: "0.2em",
                      padding: "1rem",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                    className="uppercase font-medium hover:bg-black hover:text-white transition-all"
                  >
                    Ask a Question
                  </a>
                </div>
              ) : (
                <div style={{ backgroundColor: "#F5F0E8", padding: "1rem", textAlign: "center" }}>
                  <p style={{ fontSize: "0.688rem", letterSpacing: "0.15em", color: "#6B6B6B" }} className="uppercase">
                    Currently Sold Out — <a href="https://line.me/ti/p/~@aelinec" className="underline hover:text-black">Join Waitlist</a>
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="mt-8 space-y-3">
                {[
                  ["Material", "18k Gold-filled"],
                  ["Care", "Avoid water, perfume & heat"],
                  ["Shipping", "Thailand 2–3 business days"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-4" style={{ fontSize: "0.75rem" }}>
                    <span style={{ color: "#6B6B6B", letterSpacing: "0.1em", minWidth: "80px" }} className="uppercase">{label}</span>
                    <span style={{ color: "#3A3A3A" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
