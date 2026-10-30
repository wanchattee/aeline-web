import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Link from "next/link";
import {
  getProductBySlug,
  getAllProducts,
  getRelatedProducts,
  getProductImages,
  formatProductPrice,
  productLineOrderUrl,
} from "@/lib/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — AELINE C`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const isCharm = product.category === "Charms";
  const categoryHref = isCharm ? "/charm-builder" : `/collections?category=${product.category}`;

  const details: [string, React.ReactNode][] = [
    ...(product.material ? [["Material", product.material] as [string, React.ReactNode]] : []),
    ["Care", <Link key="care" href="/care" className="underline underline-offset-2 hover:opacity-60">Avoid water, perfume &amp; heat</Link>],
    ["Shipping", <Link key="ship" href="/shipping" className="underline underline-offset-2 hover:opacity-60">Thailand 2–3 business days</Link>],
  ];

  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: "61px" }}>
        <div className="mx-auto" style={{ maxWidth: "1152px", padding: "3rem clamp(1.5rem, 5vw, 4rem) 4rem" }}>
          {/* Breadcrumb */}
          <nav className="flex flex-wrap gap-2" style={{ fontSize: "0.625rem", letterSpacing: "0.12em", marginBottom: "2rem" }}>
            <Link href="/" className="text-gray-400 hover:text-black uppercase transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            {isCharm ? (
              <Link href="/charm-builder" className="text-gray-400 hover:text-black uppercase transition-colors">Charm Bar</Link>
            ) : (
              <>
                <Link href="/collections" className="text-gray-400 hover:text-black uppercase transition-colors">Collections</Link>
                <span className="text-gray-300">/</span>
                <Link href={categoryHref} className="text-gray-400 hover:text-black uppercase transition-colors">{product.category}</Link>
              </>
            )}
            <span className="text-gray-300">/</span>
            <span className="uppercase text-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <ProductGallery images={getProductImages(product)} alt={product.name} />

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.collectionName && (
                <p style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#1B4332", marginBottom: "0.75rem" }} className="uppercase">
                  {product.collectionName}
                </p>
              )}
              <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", color: "#6B6B6B", marginBottom: "0.5rem" }} className="uppercase">
                {product.category}
              </p>
              <h1 style={{ fontSize: "1.5rem", letterSpacing: "0.06em", fontWeight: 600, lineHeight: 1.3, marginBottom: "1rem" }}>
                {product.name}
              </h1>
              <p style={{ fontSize: "1.25rem", color: "#1B4332", letterSpacing: "0.06em", marginBottom: "1.5rem" }} className="font-semibold">
                {formatProductPrice(product)}
              </p>

              <div style={{ borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC", padding: "1.5rem 0", marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#3A3A3A" }}>
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              {product.inStock ? (
                <div className="flex flex-col gap-3">
                  <a
                    href={productLineOrderUrl(product)}
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
                    href="https://line.me/ti/p/~@aelinec"
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
              <div className="flex flex-col gap-3" style={{ marginTop: "2rem" }}>
                {details.map(([label, value]) => (
                  <div key={label} className="flex gap-4" style={{ fontSize: "0.75rem" }}>
                    <span style={{ color: "#6B6B6B", letterSpacing: "0.1em", minWidth: "80px" }} className="uppercase">{label}</span>
                    <span style={{ color: "#3A3A3A" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* You might also like */}
          {related.length > 0 && (
            <section style={{ marginTop: "5rem" }}>
              <div
                style={{ borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC", padding: "1rem 0", marginBottom: "2.5rem" }}
                className="flex items-center justify-between"
              >
                <h2 style={{ fontSize: "0.688rem", letterSpacing: "0.18em" }} className="uppercase font-medium">
                  You Might Also Like
                </h2>
                <Link
                  href={categoryHref}
                  style={{ fontSize: "0.688rem", letterSpacing: "0.12em" }}
                  className="uppercase font-medium underline underline-offset-4 hover:opacity-50 transition-opacity"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
