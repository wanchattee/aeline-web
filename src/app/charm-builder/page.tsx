import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getAllCharms,
  getCharmCategories,
  formatCharmPrice,
  charmLineOrderUrl,
  Charm,
  CharmCategory,
} from "@/lib/charms";

export default async function CharmBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = (params.category as CharmCategory) ?? "All";

  const [allCharms, categories] = await Promise.all([
    getAllCharms(),
    getCharmCategories(),
  ]);

  const filtered =
    activeCategory === "All"
      ? allCharms
      : allCharms.filter((c) => c.category === activeCategory);

  return (
    <>
      <Header />
      <main style={{ paddingTop: "61px", minHeight: "100vh", backgroundColor: "#FAFAF8" }}>

        {/* ── HERO ── */}
        <section style={{
          position: "relative",
          height: "55vh",
          minHeight: 420,
          overflow: "hidden",
          backgroundColor: "#F5F0E8",
        }}>
          <Image
            src="/images/hero_coffee.jpg"
            alt="Aeline C Charm Bar"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 2rem",
          }}>
            <p style={{
              color: "#F5F0E8", fontSize: "0.625rem",
              letterSpacing: "0.3em", marginBottom: "1rem",
            }} className="uppercase font-medium">
              Charm Bar
            </p>
            <h1 style={{
              color: "#F5F0E8", fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "0.25em", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.25rem",
            }} className="uppercase">
              CHOOSE YOUR CHARMS
            </h1>
            <p style={{
              color: "#F5F0E8", fontSize: "0.75rem", letterSpacing: "0.15em",
              maxWidth: 540, lineHeight: 1.8, opacity: 0.9,
            }} className="uppercase">
              Hand-crafted in Bangkok. Pair any charms you love with our signature Charm Bar Bracelet.
            </p>
          </div>
        </section>

        {/* ── BREADCRUMB ── */}
        <div style={{
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem) 1rem",
          borderBottom: "1px solid #E8E4DC",
          backgroundColor: "#fff",
        }}>
          <nav style={{ fontSize: "0.563rem", letterSpacing: "0.12em" }} className="flex gap-2 uppercase text-gray-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">Charm Bar</span>
          </nav>
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div style={{
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
          borderBottom: "1px solid #E8E4DC",
          backgroundColor: "#fff",
        }}>
          <div className="flex gap-6 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/charm-builder" : `/charm-builder?category=${cat}`}
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

        {/* ── RESULTS COUNT ── */}
        <div style={{ padding: "1rem clamp(1.5rem, 5vw, 4rem)" }}>
          <p style={{ fontSize: "0.688rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase">
            {filtered.length} {filtered.length === 1 ? "Charm" : "Charms"}
          </p>
        </div>

        {/* ── CHARMS GRID ── */}
        <section style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) 4rem" }}>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-32 text-sm tracking-widest uppercase">
              No charms in this category yet
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {filtered.map((charm) => (
                <CharmCard key={charm.id} charm={charm} />
              ))}
            </div>
          )}
        </section>

        {/* ── CUSTOM REQUEST ── */}
        <section style={{
          padding: "3rem clamp(1.5rem, 5vw, 4rem) 5rem",
          textAlign: "center",
          borderTop: "1px solid #E8E4DC",
          backgroundColor: "#fff",
        }}>
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.25em", color: "#6B6B6B", marginBottom: "0.5rem" }} className="uppercase font-medium">
            Can&apos;t find what you want?
          </p>
          <h3 style={{ fontSize: "1.125rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "1rem" }} className="uppercase">
            Custom Charm Request
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#6B6B6B", maxWidth: 480, margin: "0 auto 1.5rem", lineHeight: 1.8 }}>
            We craft custom charms on request. Message us on LINE with your idea and our designer will get back to you within 24 hours.
          </p>
          <a
            href={`https://line.me/ti/p/~@aelinec?msg=${encodeURIComponent("สวัสดีค่ะ/ครับ — สนใจ custom charm ค่ะ/ครับ")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid #0A0A0A",
              color: "#0A0A0A",
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              padding: "0.875rem 2.5rem",
              textDecoration: "none",
            }}
            className="uppercase font-medium hover:bg-black hover:text-white transition-colors"
          >
            Message Our Designer
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CharmCard({ charm }: { charm: Charm }) {
  return (
    <a
      href={charmLineOrderUrl(charm)}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: "1/1", backgroundColor: "#FFFFFF" }}
      >
        <Image
          src={charm.imageUrl}
          alt={charm.name}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ padding: "0.5rem" }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized={charm.imageUrl.startsWith("https://") || charm.imageUrl.startsWith("/images/charms/")}
        />
        {!charm.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "#6B6B6B" }} className="uppercase font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", color: "#6B6B6B" }} className="uppercase mb-1">
        {charm.material}
      </p>
      <p style={{ fontSize: "0.813rem" }} className="font-medium mb-1 group-hover:opacity-60 transition-opacity">
        {charm.name}
      </p>
      <p style={{ fontSize: "0.813rem", color: "#1B4332" }} className="font-medium">
        {formatCharmPrice(charm.price)}
      </p>
    </a>
  );
}
